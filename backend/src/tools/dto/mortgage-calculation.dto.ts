import { IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MortgageCalculationDto {
  @ApiProperty({ example: 15000000000, description: 'Property price in Rials' })
  @IsNumber()
  @Min(1000000)
  propertyPrice: number;

  @ApiProperty({ example: 20, description: 'Down payment percentage' })
  @IsNumber()
  @Min(0)
  @Max(100)
  downPaymentPercent: number;

  @ApiProperty({ example: 18, description: 'Annual interest rate percentage' })
  @IsNumber()
  @Min(0)
  @Max(50)
  interestRate: number;

  @ApiProperty({ example: 15, description: 'Loan term in years' })
  @IsNumber()
  @Min(1)
  @Max(30)
  loanTermYears: number;
}
