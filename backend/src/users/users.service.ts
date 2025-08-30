import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'name', 'email', 'phone', 'avatar', 'role', 'isVerified', 'createdAt'],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone', 'avatar', 'role', 'isVerified', 'preferences', 'createdAt'],
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.softDelete(id);
  }

  async updatePreferences(id: string, preferences: any): Promise<User> {
    const user = await this.findById(id);
    user.preferences = preferences;
    return this.usersRepository.save(user);
  }
}
