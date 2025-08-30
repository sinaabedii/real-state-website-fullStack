import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOperation({ summary: 'Get market analytics' })
  @ApiResponse({ status: 200, description: 'Market analytics retrieved successfully' })
  @ApiQuery({ name: 'city', required: false, type: String })
  @ApiQuery({ name: 'district', required: false, type: String })
  @Get('market')
  getMarketAnalytics(@Query('city') city?: string, @Query('district') district?: string) {
    return this.analyticsService.getMarketAnalytics(city, district);
  }

  @ApiOperation({ summary: 'Get comprehensive property report' })
  @ApiResponse({ status: 200, description: 'Property report retrieved successfully' })
  @Get('property/:id')
  getPropertyReport(@Param('id') id: string) {
    return this.analyticsService.getPropertyReport(id);
  }

  @ApiOperation({ summary: 'Get investment analysis for property' })
  @ApiResponse({ status: 200, description: 'Investment analysis retrieved successfully' })
  @Get('investment/:id')
  getInvestmentAnalysis(@Param('id') id: string) {
    return this.analyticsService.getInvestmentAnalysis(id);
  }
}
