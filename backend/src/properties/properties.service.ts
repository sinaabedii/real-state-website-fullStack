import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, PropertyStatus } from './entities/property.entity';
import { PropertyImage } from './entities/property-image.entity';
import { PropertyView } from './entities/property-view.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyFilterDto } from './dto/property-filter.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    @InjectRepository(PropertyImage)
    private propertyImagesRepository: Repository<PropertyImage>,
    @InjectRepository(PropertyView)
    private propertyViewsRepository: Repository<PropertyView>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, ownerId: string): Promise<Property> {
    const property = this.propertiesRepository.create({
      ...createPropertyDto,
      ownerId,
    });

    // Set PostGIS location if coordinates provided
    if (createPropertyDto.latitude && createPropertyDto.longitude) {
      property.location = `POINT(${createPropertyDto.longitude} ${createPropertyDto.latitude})`;
      property.latitude = createPropertyDto.latitude;
      property.longitude = createPropertyDto.longitude;
    }

    const savedProperty = await this.propertiesRepository.save(property);

    // Add images if provided
    if (createPropertyDto.images && createPropertyDto.images.length > 0) {
      const images = createPropertyDto.images.map((imageUrl, index) => 
        this.propertyImagesRepository.create({
          url: imageUrl,
          propertyId: savedProperty.id,
          order: index,
          isPrimary: index === 0,
        })
      );
      await this.propertyImagesRepository.save(images);
    }

    return this.findOne(savedProperty.id);
  }

  async findAll(filterDto: PropertyFilterDto = {}) {
    const {
      page = 1,
      limit = 20,
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
      isFeatured,
      status = PropertyStatus.ACTIVE,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = filterDto;

    const queryBuilder = this.propertiesRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.agent', 'agent')
      .leftJoinAndSelect('property.owner', 'owner', 'owner.id, owner.name, owner.email')
      .where('property.status = :status', { status });

    // Apply filters
    if (propertyType) {
      queryBuilder.andWhere('property.propertyType = :propertyType', { propertyType });
    }

    if (listingType) {
      queryBuilder.andWhere('property.listingType = :listingType', { listingType });
    }

    if (minPrice) {
      queryBuilder.andWhere('property.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      queryBuilder.andWhere('property.price <= :maxPrice', { maxPrice });
    }

    if (minArea) {
      queryBuilder.andWhere('property.area >= :minArea', { minArea });
    }

    if (maxArea) {
      queryBuilder.andWhere('property.area <= :maxArea', { maxArea });
    }

    if (bedrooms) {
      queryBuilder.andWhere('property.bedrooms >= :bedrooms', { bedrooms });
    }

    if (bathrooms) {
      queryBuilder.andWhere('property.bathrooms >= :bathrooms', { bathrooms });
    }

    if (city) {
      queryBuilder.andWhere('property.city ILIKE :city', { city: `%${city}%` });
    }

    if (district) {
      queryBuilder.andWhere('property.district ILIKE :district', { district: `%${district}%` });
    }

    if (isFeatured !== undefined) {
      queryBuilder.andWhere('property.isFeatured = :isFeatured', { isFeatured });
    }

    // Sorting
    queryBuilder.orderBy(`property.${sortBy}`, sortOrder);

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

  async findOne(id: string): Promise<Property> {
    const property = await this.propertiesRepository.findOne({
      where: { id },
      relations: ['images', 'agent', 'owner'],
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async findFeatured(limit: number = 6): Promise<Property[]> {
    return this.propertiesRepository.find({
      where: { 
        isFeatured: true,
        status: PropertyStatus.ACTIVE,
      },
      relations: ['images', 'agent'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findRecent(limit: number = 10): Promise<Property[]> {
    return this.propertiesRepository.find({
      where: { status: PropertyStatus.ACTIVE },
      relations: ['images', 'agent'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findSimilar(propertyId: string, limit: number = 6): Promise<Property[]> {
    const property = await this.findOne(propertyId);
    
    return this.propertiesRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.agent', 'agent')
      .where('property.id != :propertyId', { propertyId })
      .andWhere('property.status = :status', { status: PropertyStatus.ACTIVE })
      .andWhere('property.propertyType = :propertyType', { propertyType: property.propertyType })
      .andWhere('property.city = :city', { city: property.city })
      .andWhere('property.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: property.price * 0.7,
        maxPrice: property.price * 1.3,
      })
      .orderBy('ABS(property.price - :targetPrice)', 'ASC')
      .setParameter('targetPrice', property.price)
      .take(limit)
      .getMany();
  }

  async findNearby(latitude: number, longitude: number, radiusKm: number = 5, limit: number = 10): Promise<Property[]> {
    return this.propertiesRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.agent', 'agent')
      .where('property.status = :status', { status: PropertyStatus.ACTIVE })
      .andWhere('property.location IS NOT NULL')
      .andWhere(
        'ST_DWithin(property.location, ST_GeogFromText(:point), :radius)',
        {
          point: `POINT(${longitude} ${latitude})`,
          radius: radiusKm * 1000, // Convert to meters
        }
      )
      .orderBy('ST_Distance(property.location, ST_GeogFromText(:point))', 'ASC')
      .setParameter('point', `POINT(${longitude} ${latitude})`)
      .take(limit)
      .getMany();
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    const property = await this.findOne(id);
    
    // Update location if coordinates changed
    if (updatePropertyDto.latitude && updatePropertyDto.longitude) {
      updatePropertyDto.location = `POINT(${updatePropertyDto.longitude} ${updatePropertyDto.latitude})`;
    }

    Object.assign(property, updatePropertyDto);
    await this.propertiesRepository.save(property);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const property = await this.findOne(id);
    await this.propertiesRepository.softDelete(id);
  }

  async incrementViews(id: string, userId?: string, ipAddress?: string, userAgent?: string): Promise<void> {
    // Increment property views counter
    await this.propertiesRepository.increment({ id }, 'views', 1);

    // Log the view
    const view = this.propertyViewsRepository.create({
      propertyId: id,
      userId,
      ipAddress,
      userAgent,
    });

    await this.propertyViewsRepository.save(view);
  }
}
