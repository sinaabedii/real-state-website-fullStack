import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';

@Entity('agents')
export class Agent extends BaseEntity {
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column('decimal', { precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column('int', { default: 0 })
  reviewsCount: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column('simple-array', { nullable: true })
  specialties: string[];

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  licenseNumber: string;

  @Column({ nullable: true })
  company: string;

  @Column('int', { default: 0 })
  experienceYears: number;

  @Column('int', { default: 0 })
  totalSales: number;

  // Relations
  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('uuid', { nullable: true })
  userId: string;

  @OneToMany(() => Property, (property) => property.agent)
  properties: Property[];
}
