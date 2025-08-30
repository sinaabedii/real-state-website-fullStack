import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@ApiTags('Agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @ApiOperation({ summary: 'Create new agent profile' })
  @ApiResponse({ status: 201, description: 'Agent created successfully' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @ApiOperation({ summary: 'Get all agents' })
  @ApiResponse({ status: 200, description: 'Agents retrieved successfully' })
  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @ApiOperation({ summary: 'Get verified agents only' })
  @ApiResponse({ status: 200, description: 'Verified agents retrieved' })
  @Get('verified')
  findVerified() {
    return this.agentsService.findVerified();
  }

  @ApiOperation({ summary: 'Get top rated agents' })
  @ApiResponse({ status: 200, description: 'Top agents retrieved' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get('top-rated')
  findTopRated(@Query('limit') limit?: number) {
    return this.agentsService.findTopRated(limit);
  }

  @ApiOperation({ summary: 'Get agent by ID' })
  @ApiResponse({ status: 200, description: 'Agent found' })
  @ApiResponse({ status: 404, description: 'Agent not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findById(id);
  }

  @ApiOperation({ summary: 'Update agent profile' })
  @ApiResponse({ status: 200, description: 'Agent updated successfully' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(id, updateAgentDto);
  }

  @ApiOperation({ summary: 'Delete agent profile' })
  @ApiResponse({ status: 200, description: 'Agent deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(id);
  }
}
