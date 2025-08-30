import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'سلام، در مورد این ملک سوال داشتم' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'receiver-user-id' })
  @IsString()
  receiverId: string;

  @ApiProperty({ example: 'property-uuid', required: false })
  @IsOptional()
  @IsString()
  propertyId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  messageType?: string;
}
