import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, PropertyType, ListingType } from '../properties/entities/property.entity';
import { PropertyView } from '../properties/entities/property-view.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    @InjectRepository(PropertyView)
    private propertyViewsRepository: Repository<PropertyView>,
  ) {}

  async getMarketAnalytics(city?: string, district?: string) {
    const whereClause: any = { status: 'active' };
    if (city) whereClause.city = city;
    if (district) whereClause.district = district;

    // Average prices by property type
    const avgPricesByType = await this.propertiesRepository
      .createQueryBuilder('property')
      .select('property.propertyType', 'type')
      .addSelect('AVG(property.price)', 'avgPrice')
      .addSelect('COUNT(*)', 'count')
      .where(whereClause)
      .groupBy('property.propertyType')
      .getRawMany();

    // Price trends (last 6 months)
    const priceTrends = await this.propertiesRepository
      .createQueryBuilder('property')
      .select('DATE_TRUNC(\'month\', property.createdAt)', 'month')
      .addSelect('AVG(property.price)', 'avgPrice')
      .addSelect('COUNT(*)', 'count')
      .where(whereClause)
      .andWhere('property.createdAt >= NOW() - INTERVAL \'6 months\'')
      .groupBy('DATE_TRUNC(\'month\', property.createdAt)')
      .orderBy('month', 'ASC')
      .getRawMany();

    // Most popular areas
    const popularAreas = await this.propertiesRepository
      .createQueryBuilder('property')
      .select('property.district', 'district')
      .addSelect('COUNT(*)', 'count')
      .addSelect('AVG(property.price)', 'avgPrice')
      .where(whereClause)
      .groupBy('property.district')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    // Property type distribution
    const typeDistribution = await this.propertiesRepository
      .createQueryBuilder('property')
      .select('property.propertyType', 'type')
      .addSelect('COUNT(*)', 'count')
      .where(whereClause)
      .groupBy('property.propertyType')
      .getRawMany();

    return {
      avgPricesByType,
      priceTrends,
      popularAreas,
      typeDistribution,
    };
  }

  async getPropertyReport(propertyId: string) {
    const property = await this.propertiesRepository.findOne({
      where: { id: propertyId },
      relations: ['images', 'agent', 'owner'],
    });

    if (!property) {
      throw new Error('Property not found');
    }

    // Similar properties for comparison
    const similarProperties = await this.propertiesRepository
      .createQueryBuilder('property')
      .where('property.id != :propertyId', { propertyId })
      .andWhere('property.propertyType = :type', { type: property.propertyType })
      .andWhere('property.city = :city', { city: property.city })
      .andWhere('property.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: property.price * 0.8,
        maxPrice: property.price * 1.2,
      })
      .orderBy('ABS(property.price - :targetPrice)', 'ASC')
      .setParameter('targetPrice', property.price)
      .limit(5)
      .getMany();

    // View statistics
    const viewStats = await this.propertyViewsRepository
      .createQueryBuilder('view')
      .select('DATE(view.createdAt)', 'date')
      .addSelect('COUNT(*)', 'views')
      .where('view.propertyId = :propertyId', { propertyId })
      .andWhere('view.createdAt >= NOW() - INTERVAL \'30 days\'')
      .groupBy('DATE(view.createdAt)')
      .orderBy('date', 'ASC')
      .getRawMany();

    // Market position
    const marketPosition = await this.calculateMarketPosition(property);

    // Investment metrics
    const investmentMetrics = this.calculateInvestmentMetrics(property, similarProperties);

    return {
      property,
      similarProperties,
      viewStats,
      marketPosition,
      investmentMetrics,
      technicalAnalysis: this.getTechnicalAnalysis(property),
    };
  }

  async getInvestmentAnalysis(propertyId: string) {
    const property = await this.propertiesRepository.findOne({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    // Calculate rental yield (assuming 8% annual rental return)
    const estimatedMonthlyRent = property.price * 0.008 / 12;
    const annualRent = estimatedMonthlyRent * 12;
    const rentalYieldValue = (annualRent / property.price) * 100;

    // Price appreciation potential
    const areaAvgPrice = await this.propertiesRepository
      .createQueryBuilder('property')
      .select('AVG(property.price)', 'avgPrice')
      .where('property.city = :city', { city: property.city })
      .andWhere('property.district = :district', { district: property.district })
      .andWhere('property.propertyType = :type', { type: property.propertyType })
      .getRawOne();

    const priceVsMarket = ((property.price - areaAvgPrice.avgPrice) / areaAvgPrice.avgPrice) * 100;

    // Investment score (0-100)
    let investmentScore = 50; // Base score
    
    // Adjust based on price vs market
    if (priceVsMarket < -10) investmentScore += 20; // Below market
    else if (priceVsMarket > 10) investmentScore -= 10; // Above market

    // Adjust based on rental yield
    if (rentalYieldValue > 6) investmentScore += 15;
    else if (rentalYieldValue < 4) investmentScore -= 10;

    // Adjust based on property features
    if (property.hasElevator) investmentScore += 5;
    if (property.hasParking) investmentScore += 5;
    if (property.yearBuilt && property.yearBuilt > 2015) investmentScore += 10;

    return {
      estimatedMonthlyRent: Math.round(estimatedMonthlyRent),
      annualRent: Math.round(annualRent),
      rentalYield: Math.round(rentalYieldValue * 100) / 100,
      priceVsMarket: Math.round(priceVsMarket * 100) / 100,
      investmentScore: Math.min(100, Math.max(0, investmentScore)),
      recommendations: this.getInvestmentRecommendations(investmentScore, rentalYieldValue, priceVsMarket),
    };
  }

  private async calculateMarketPosition(property: Property) {
    const sameAreaProperties = await this.propertiesRepository.count({
      where: {
        city: property.city,
        district: property.district,
        propertyType: property.propertyType,
      },
    });

    const cheaperProperties = await this.propertiesRepository.count({
      where: {
        city: property.city,
        district: property.district,
        propertyType: property.propertyType,
        price: { $lt: property.price } as any,
      },
    });

    const percentile = Math.round((cheaperProperties / sameAreaProperties) * 100);

    return {
      totalInArea: sameAreaProperties,
      percentile,
      position: percentile < 25 ? 'budget' : percentile < 75 ? 'mid-range' : 'premium',
    };
  }

  private calculateInvestmentMetrics(property: Property, similarProperties: Property[]) {
    const avgSimilarPrice = similarProperties.reduce((sum, p) => sum + p.price, 0) / similarProperties.length;
    const pricePerSqm = property.price / property.area;
    const avgPricePerSqm = similarProperties.reduce((sum, p) => sum + (p.price / p.area), 0) / similarProperties.length;

    return {
      pricePerSqm: Math.round(pricePerSqm),
      avgPricePerSqm: Math.round(avgPricePerSqm),
      priceVsSimilar: Math.round(((property.price - avgSimilarPrice) / avgSimilarPrice) * 100),
      pricePerSqmVsSimilar: Math.round(((pricePerSqm - avgPricePerSqm) / avgPricePerSqm) * 100),
    };
  }

  private getTechnicalAnalysis(property: Property) {
    const buildingAge = property.yearBuilt ? new Date().getFullYear() - property.yearBuilt : null;
    
    return {
      buildingAge,
      condition: buildingAge ? (buildingAge < 5 ? 'new' : buildingAge < 15 ? 'good' : 'older') : 'unknown',
      features: {
        hasElevator: property.hasElevator,
        hasParking: property.parkingSpaces > 0,
        hasBalcony: property.hasBalcony,
        hasStorage: property.hasStorage,
      },
      amenitiesCount: property.amenities?.length || 0,
      floorInfo: property.floorNumber && property.totalFloors ? 
        `${property.floorNumber}/${property.totalFloors}` : null,
    };
  }

  private getInvestmentRecommendations(score: number, yieldValue: number, priceVsMarket: number): string[] {
    const recommendations = [];

    if (score >= 80) {
      recommendations.push('سرمایه‌گذاری عالی - پتانسیل بازگشت سرمایه بالا');
    } else if (score >= 60) {
      recommendations.push('سرمایه‌گذاری مناسب - ریسک متعادل');
    } else {
      recommendations.push('سرمایه‌گذاری پرریسک - بررسی دقیق‌تر نیاز است');
    }

    if (yieldValue > 6) {
      recommendations.push('بازده اجاره بالا - مناسب برای درآمد ماهانه');
    } else if (yieldValue < 4) {
      recommendations.push('بازده اجاره پایین - بیشتر برای رشد قیمت مناسب است');
    }

    if (priceVsMarket < -15) {
      recommendations.push('قیمت زیر بازار - فرصت خرید مناسب');
    } else if (priceVsMarket > 15) {
      recommendations.push('قیمت بالای بازار - احتمال کاهش قیمت');
    }

    return recommendations;
  }
}
