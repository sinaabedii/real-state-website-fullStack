import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: 'Advanced property search' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @Post()
  search(@Body() searchDto: SearchDto) {
    return this.searchService.search(searchDto);
  }

  @ApiOperation({ summary: 'Get search suggestions' })
  @ApiResponse({ status: 200, description: 'Suggestions retrieved successfully' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get('suggestions')
  getSuggestions(@Query('q') query: string, @Query('limit') limit?: number) {
    return this.searchService.getSuggestions(query, limit);
  }

  @ApiOperation({ summary: 'Get all available locations' })
  @ApiResponse({ status: 200, description: 'Locations retrieved successfully' })
  @Get('locations')
  getLocations() {
    return this.searchService.getLocations();
  }

  @ApiOperation({ summary: 'Get all available amenities' })
  @ApiResponse({ status: 200, description: 'Amenities retrieved successfully' })
  @Get('amenities')
  getAmenities() {
    return this.searchService.getAmenities();
  }
}
