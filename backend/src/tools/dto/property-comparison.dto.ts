import { IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PropertyForComparison {
  id: string;
  title: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  yearBuilt?: number;
  hasElevator: boolean;
  hasBalcony: boolean;
  hasStorage: boolean;
  amenities?: string[];
  city: string;
  district: string;
  agent?: {
    name: string;
  };
}

export class PropertyComparisonDto {
  @ApiProperty({ 
    type: [PropertyForComparison],
    description: 'Array of 2-3 properties to compare',
    minItems: 2,
    maxItems: 3
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => PropertyForComparison)
  properties: PropertyForComparison[];
}
