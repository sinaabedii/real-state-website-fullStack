import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto, userId: string): Promise<Favorite> {
    // Check if already exists
    const existing = await this.favoritesRepository.findOne({
      where: {
        userId,
        propertyId: createFavoriteDto.propertyId,
      },
    });

    if (existing) {
      throw new ConflictException('Property already in favorites');
    }

    const favorite = this.favoritesRepository.create({
      ...createFavoriteDto,
      userId,
    });

    return this.favoritesRepository.save(favorite);
  }

  async findByUser(userId: string): Promise<Favorite[]> {
    return this.favoritesRepository.find({
      where: { userId },
      relations: ['property', 'property.images', 'property.agent'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(userId: string, propertyId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { userId, propertyId },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoritesRepository.remove(favorite);
  }

  async isFavorite(userId: string, propertyId: string): Promise<boolean> {
    const favorite = await this.favoritesRepository.findOne({
      where: { userId, propertyId },
    });

    return !!favorite;
  }

  async getUserFavoriteIds(userId: string): Promise<string[]> {
    const favorites = await this.favoritesRepository.find({
      where: { userId },
      select: ['propertyId'],
    });

    return favorites.map(f => f.propertyId);
  }
}
