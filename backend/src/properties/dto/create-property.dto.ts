import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyType, ListingType } from '../entities/property.entity';

export class CreatePropertyDto {
  @ApiProperty({ example: 'آپارتمان لوکس در نیاوران' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'آپارتمان 120 متری با امکانات کامل' })
  @IsString()
  description: string;

  @ApiProperty({ example: 15000000000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 120 })
  @IsNumber()
  @Min(1)
  area: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(0)
  bedrooms: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(0)
  bathrooms: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  parkingSpaces: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasElevator: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasBalcony: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasStorage: boolean;

  @ApiProperty({ enum: PropertyType, example: PropertyType.APARTMENT })
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @ApiProperty({ enum: ListingType, example: ListingType.SALE })
  @IsEnum(ListingType)
  listingType: ListingType;

  @ApiProperty({ example: 'تهران' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'نیاوران' })
  @IsString()
  district: string;

  @ApiProperty({ example: 'خیابان شهید بهشتی، پلاک 10' })
  @IsString()
  address: string;

  @ApiProperty({ example: 35.7219, required: false })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiProperty({ example: 51.4677, required: false })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiProperty({ example: ['پارکینگ', 'انباری', 'آسانسور'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiProperty({ example: 2018, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 5)
  yearBuilt?: number;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  floorNumber?: number;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  totalFloors?: number;

  @ApiProperty({ example: ['image1.jpg', 'image2.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ example: 'video.mp4', required: false })
  @IsOptional()
  @IsString()
  video?: string;

  @ApiProperty({ example: 'agent-uuid', required: false })
  @IsOptional()
  @IsString()
  agentId?: string;
}
