import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'احمد رضایی' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ahmad@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'hashedPassword123' })
  @IsString()
  password: string;

  @ApiProperty({ example: '09123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
