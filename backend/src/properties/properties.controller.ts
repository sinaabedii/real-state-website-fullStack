import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseGuards, 
  Request,
  Ip,
  Headers
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyFilterDto } from './dto/property-filter.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @ApiOperation({ summary: 'Create new property' })
  @ApiResponse({ status: 201, description: 'Property created successfully' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto, @Request() req) {
    return this.propertiesService.create(createPropertyDto, req.user.id);
  }

  @ApiOperation({ summary: 'Get all properties with filters' })
  @ApiResponse({ status: 200, description: 'Properties retrieved successfully' })
  @Get()
  findAll(@Query() filterDto: PropertyFilterDto) {
    return this.propertiesService.findAll(filterDto);
  }

  @ApiOperation({ summary: 'Get featured properties' })
  @ApiResponse({ status: 200, description: 'Featured properties retrieved' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get('featured')
  findFeatured(@Query('limit') limit?: number) {
    return this.propertiesService.findFeatured(limit);
  }

  @ApiOperation({ summary: 'Get recent properties' })
  @ApiResponse({ status: 200, description: 'Recent properties retrieved' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get('recent')
  findRecent(@Query('limit') limit?: number) {
    return this.propertiesService.findRecent(limit);
  }

  @ApiOperation({ summary: 'Get nearby properties' })
  @ApiResponse({ status: 200, description: 'Nearby properties retrieved' })
  @ApiQuery({ name: 'lat', required: true, type: Number })
  @ApiQuery({ name: 'lng', required: true, type: Number })
  @ApiQuery({ name: 'radius', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get('nearby')
  findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
    @Query('limit') limit?: number,
  ) {
    return this.propertiesService.findNearby(lat, lng, radius, limit);
  }

  @ApiOperation({ summary: 'Get property by ID' })
  @ApiResponse({ status: 200, description: 'Property found' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Get similar properties' })
  @ApiResponse({ status: 200, description: 'Similar properties retrieved' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get(':id/similar')
  findSimilar(@Param('id') id: string, @Query('limit') limit?: number) {
    return this.propertiesService.findSimilar(id, limit);
  }

  @ApiOperation({ summary: 'Update property' })
  @ApiResponse({ status: 200, description: 'Property updated successfully' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @ApiOperation({ summary: 'Delete property' })
  @ApiResponse({ status: 200, description: 'Property deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }

  @ApiOperation({ summary: 'Increment property views' })
  @ApiResponse({ status: 200, description: 'View recorded successfully' })
  @Post(':id/views')
  incrementViews(
    @Param('id') id: string,
    @Request() req,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const userId = req.user?.id;
    return this.propertiesService.incrementViews(id, userId, ip, userAgent);
  }
}
