import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ToolsService } from './tools.service';
import { MortgageCalculationDto } from './dto/mortgage-calculation.dto';
import { PropertyComparisonDto } from './dto/property-comparison.dto';

@ApiTags('Tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @ApiOperation({ summary: 'Calculate mortgage/loan details' })
  @ApiResponse({ status: 200, description: 'Mortgage calculation completed successfully' })
  @Post('mortgage')
  calculateMortgage(@Body() mortgageDto: MortgageCalculationDto) {
    return this.toolsService.calculateMortgage(mortgageDto);
  }

  @ApiOperation({ summary: 'Compare multiple properties' })
  @ApiResponse({ status: 200, description: 'Property comparison completed successfully' })
  @Post('comparison')
  compareProperties(@Body() comparisonDto: PropertyComparisonDto) {
    return this.toolsService.compareProperties(comparisonDto);
  }

  @ApiOperation({ summary: 'Generate comprehensive property report' })
  @ApiResponse({ status: 200, description: 'Property report generated successfully' })
  @Get('report/:id')
  generatePropertyReport(@Param('id') id: string) {
    return this.toolsService.generatePropertyReport(id);
  }
}
