import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, PropertyStatus } from '../properties/entities/property.entity';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async search(searchDto: SearchDto) {
    const {
      query,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      bedrooms,
      bathrooms,
      city,
      district,
      amenities,
      hasElevator,
      hasParking,
      hasBalcony,
      hasStorage,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = searchDto;

    const queryBuilder = this.propertiesRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.agent', 'agent')
      .where('property.status = :status', { status: PropertyStatus.ACTIVE });

    // Text search in title, description, and address
    if (query) {
      queryBuilder.andWhere(
        '(property.title ILIKE :query OR property.description ILIKE :query OR property.address ILIKE :query)',
        { query: `%${query}%` }
      );
    }

    // Property type filter
    if (propertyType && propertyType.length > 0) {
      queryBuilder.andWhere('property.propertyType IN (:...propertyType)', { propertyType });
    }

    // Listing type filter
    if (listingType) {
      queryBuilder.andWhere('property.listingType = :listingType', { listingType });
    }

    // Price range filter
    if (minPrice) {
      queryBuilder.andWhere('property.price >= :minPrice', { minPrice });
    }
    if (maxPrice) {
      queryBuilder.andWhere('property.price <= :maxPrice', { maxPrice });
    }

    // Area range filter
    if (minArea) {
      queryBuilder.andWhere('property.area >= :minArea', { minArea });
    }
    if (maxArea) {
      queryBuilder.andWhere('property.area <= :maxArea', { maxArea });
    }

    // Bedrooms filter
    if (bedrooms && bedrooms.length > 0) {
      queryBuilder.andWhere('property.bedrooms IN (:...bedrooms)', { bedrooms });
    }

    // Bathrooms filter
    if (bathrooms && bathrooms.length > 0) {
      queryBuilder.andWhere('property.bathrooms IN (:...bathrooms)', { bathrooms });
    }

    // Location filters
    if (city) {
      queryBuilder.andWhere('property.city ILIKE :city', { city: `%${city}%` });
    }
    if (district) {
      queryBuilder.andWhere('property.district ILIKE :district', { district: `%${district}%` });
    }

    // Amenities filter
    if (amenities && amenities.length > 0) {
      queryBuilder.andWhere('property.amenities && :amenities', { amenities });
    }

    // Boolean filters
    if (hasElevator) {
      queryBuilder.andWhere('property.hasElevator = :hasElevator', { hasElevator });
    }
    if (hasParking) {
      queryBuilder.andWhere('property.parkingSpaces > 0');
    }
    if (hasBalcony) {
      queryBuilder.andWhere('property.hasBalcony = :hasBalcony', { hasBalcony });
    }
    if (hasStorage) {
      queryBuilder.andWhere('property.hasStorage = :hasStorage', { hasStorage });
    }

    // Sorting
    const validSortFields = ['createdAt', 'price', 'area', 'views'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    queryBuilder.orderBy(`property.${sortField}`, sortOrder);

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [properties, total] = await queryBuilder.getManyAndCount();

    return {
      data: properties,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getSuggestions(query: string, limit: number = 10): Promise<string[]> {
    if (!query || query.length < 2) {
      return [];
    }

    const suggestions = await this.propertiesRepository
      .createQueryBuilder('property')
      .select('DISTINCT property.city', 'city')
      .addSelect('DISTINCT property.district', 'district')
      .where('property.status = :status', { status: PropertyStatus.ACTIVE })
      .andWhere('(property.city ILIKE :query OR property.district ILIKE :query)', 
        { query: `%${query}%` })
      .limit(limit)
      .getRawMany();

    const cities = suggestions.map(s => s.city).filter(Boolean);
    const districts = suggestions.map(s => s.district).filter(Boolean);
    
    return [...new Set([...cities, ...districts])].slice(0, limit);
  }

  async getLocations(): Promise<{ cities: string[], districts: string[] }> {
    const locations = await this.propertiesRepository
      .createQueryBuilder('property')
      .select('DISTINCT property.city', 'city')
      .addSelect('DISTINCT property.district', 'district')
      .where('property.status = :status', { status: PropertyStatus.ACTIVE })
      .getRawMany();

    const cities = [...new Set(locations.map(l => l.city).filter(Boolean))].sort();
    const districts = [...new Set(locations.map(l => l.district).filter(Boolean))].sort();

    return { cities, districts };
  }

  async getAmenities(): Promise<string[]> {
    const result = await this.propertiesRepository
      .createQueryBuilder('property')
      .select('UNNEST(property.amenities)', 'amenity')
      .where('property.status = :status', { status: PropertyStatus.ACTIVE })
      .andWhere('property.amenities IS NOT NULL')
      .groupBy('amenity')
      .orderBy('COUNT(*)', 'DESC')
      .getRawMany();

    return result.map(r => r.amenity).filter(Boolean);
  }
}
