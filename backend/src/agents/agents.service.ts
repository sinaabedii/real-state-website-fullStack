import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private agentsRepository: Repository<Agent>,
  ) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent = this.agentsRepository.create(createAgentDto);
    return this.agentsRepository.save(agent);
  }

  async findAll(): Promise<Agent[]> {
    return this.agentsRepository.find({
      relations: ['properties'],
      order: { rating: 'DESC' },
    });
  }

  async findById(id: string): Promise<Agent> {
    const agent = await this.agentsRepository.findOne({
      where: { id },
      relations: ['properties', 'user'],
    });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return agent;
  }

  async findByUserId(userId: string): Promise<Agent> {
    return this.agentsRepository.findOne({
      where: { userId },
      relations: ['properties'],
    });
  }

  async findVerified(): Promise<Agent[]> {
    return this.agentsRepository.find({
      where: { isVerified: true },
      relations: ['properties'],
      order: { rating: 'DESC' },
    });
  }

  async findTopRated(limit: number = 10): Promise<Agent[]> {
    return this.agentsRepository.find({
      where: { isVerified: true },
      order: { rating: 'DESC', reviewsCount: 'DESC' },
      take: limit,
    });
  }

  async update(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const agent = await this.findById(id);
    Object.assign(agent, updateAgentDto);
    return this.agentsRepository.save(agent);
  }

  async remove(id: string): Promise<void> {
    const agent = await this.findById(id);
    await this.agentsRepository.softDelete(id);
  }

  async updateRating(id: string, newRating: number): Promise<Agent> {
    const agent = await this.findById(id);
    
    // Calculate new average rating
    const totalRating = agent.rating * agent.reviewsCount + newRating;
    agent.reviewsCount += 1;
    agent.rating = Math.round((totalRating / agent.reviewsCount) * 10) / 10;

    return this.agentsRepository.save(agent);
  }
}
