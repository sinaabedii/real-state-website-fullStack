import { Injectable } from '@nestjs/common';
import { MortgageCalculationDto } from './dto/mortgage-calculation.dto';
import { PropertyComparisonDto } from './dto/property-comparison.dto';

@Injectable()
export class ToolsService {
  
  calculateMortgage(mortgageDto: MortgageCalculationDto) {
    const { propertyPrice, downPaymentPercent, interestRate, loanTermYears } = mortgageDto;
    
    const downPayment = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = propertyPrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    
    // Calculate monthly payment using formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    
    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - loanAmount;
    
    // Generate payment schedule for first 12 months
    const paymentSchedule = [];
    let remainingBalance = loanAmount;
    
    for (let month = 1; month <= Math.min(12, totalPayments); month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      paymentSchedule.push({
        month,
        monthlyPayment: Math.round(monthlyPayment),
        principalPayment: Math.round(principalPayment),
        interestPayment: Math.round(interestPayment),
        remainingBalance: Math.round(remainingBalance),
      });
    }
    
    return {
      propertyPrice,
      downPayment: Math.round(downPayment),
      loanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      paymentSchedule,
      summary: {
        loanTermYears,
        interestRate,
        downPaymentPercent,
        monthlyIncome: Math.round(monthlyPayment * 3.5), // Recommended minimum income
      }
    };
  }

  compareProperties(comparisonDto: PropertyComparisonDto) {
    const { properties } = comparisonDto;
    
    if (properties.length < 2 || properties.length > 3) {
      throw new Error('Can only compare 2-3 properties');
    }

    // Calculate comparison metrics
    const comparison = {
      properties: properties.map(property => ({
        id: property.id,
        title: property.title,
        price: property.price,
        area: property.area,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        pricePerSqm: Math.round(property.price / property.area),
        yearBuilt: property.yearBuilt,
        hasElevator: property.hasElevator,
        hasParking: property.parkingSpaces > 0,
        hasBalcony: property.hasBalcony,
        hasStorage: property.hasStorage,
        amenitiesCount: property.amenities?.length || 0,
        location: `${property.city}, ${property.district}`,
        agent: property.agent?.name,
      })),
      metrics: this.calculateComparisonMetrics(properties),
      recommendations: this.generateComparisonRecommendations(properties),
    };

    return comparison;
  }

  private calculateComparisonMetrics(properties: any[]) {
    const prices = properties.map(p => p.price);
    const areas = properties.map(p => p.area);
    const pricesPerSqm = properties.map(p => p.price / p.area);
    const yearBuilts = properties.map(p => p.yearBuilt).filter(Boolean);

    return {
      priceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices),
        avg: Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length),
      },
      areaRange: {
        min: Math.min(...areas),
        max: Math.max(...areas),
        avg: Math.round(areas.reduce((sum, a) => sum + a, 0) / areas.length),
      },
      pricePerSqmRange: {
        min: Math.round(Math.min(...pricesPerSqm)),
        max: Math.round(Math.max(...pricesPerSqm)),
        avg: Math.round(pricesPerSqm.reduce((sum, p) => sum + p, 0) / pricesPerSqm.length),
      },
      avgYearBuilt: yearBuilts.length > 0 ? 
        Math.round(yearBuilts.reduce((sum, y) => sum + y, 0) / yearBuilts.length) : null,
    };
  }

  private generateComparisonRecommendations(properties: any[]): string[] {
    const recommendations = [];
    
    // Find best value
    const pricesPerSqm = properties.map((p, index) => ({ index, value: p.price / p.area }));
    const bestValue = pricesPerSqm.reduce((min, current) => 
      current.value < min.value ? current : min
    );
    recommendations.push(`بهترین ارزش: ${properties[bestValue.index].title}`);
    
    // Find newest
    const withYears = properties.filter(p => p.yearBuilt);
    if (withYears.length > 0) {
      const newest = withYears.reduce((max, current) => 
        current.yearBuilt > max.yearBuilt ? current : max
      );
      recommendations.push(`جدیدترین ساختمان: ${newest.title} (${newest.yearBuilt})`);
    }
    
    // Find largest
    const largest = properties.reduce((max, current) => 
      current.area > max.area ? current : max
    );
    recommendations.push(`بزرگ‌ترین متراژ: ${largest.title} (${largest.area} متر)`);
    
    // Find most amenities
    const mostAmenities = properties.reduce((max, current) => 
      (current.amenities?.length || 0) > (max.amenities?.length || 0) ? current : max
    );
    recommendations.push(`بیشترین امکانات: ${mostAmenities.title} (${mostAmenities.amenities?.length || 0} امکانات)`);

    return recommendations;
  }

  generatePropertyReport(propertyId: string) {
    // This would typically fetch data from database and generate comprehensive report
    // For now, return a structured report template
    return {
      propertyId,
      reportSections: [
        {
          title: 'خلاصه ملک',
          content: 'اطلاعات کلی و مشخصات فنی ملک',
          data: {},
        },
        {
          title: 'تحلیل تکنیکال',
          content: 'بررسی فنی ساختمان و امکانات',
          data: {},
        },
        {
          title: 'تحلیل بازار',
          content: 'وضعیت بازار و مقایسه با املاک مشابه',
          data: {},
        },
        {
          title: 'تحلیل سرمایه‌گذاری',
          content: 'پتانسیل سرمایه‌گذاری و بازده',
          data: {},
        },
      ],
      generatedAt: new Date().toISOString(),
      downloadUrl: `/reports/${propertyId}.pdf`,
    };
  }
}
