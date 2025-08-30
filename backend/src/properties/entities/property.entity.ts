import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Agent } from '../../agents/entities/agent.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { PropertyImage } from './property-image.entity';
import { PropertyView } from './property-view.entity';

export enum PropertyType {
  APARTMENT = 'apartment',
  VILLA = 'villa',
  COMMERCIAL = 'commercial',
  LAND = 'land',
  OFFICE = 'office',
}

export enum ListingType {
  SALE = 'sale',
  RENT = 'rent',
}

export enum PropertyStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SOLD = 'sold',
  RENTED = 'rented',
  INACTIVE = 'inactive',
}

@Entity('properties')
@Index(['location'])
export class Property extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('bigint')
  price: number;

  @Column('int')
  area: number;

  @Column('int', { default: 0 })
  bedrooms: number;

  @Column('int', { default: 0 })
  bathrooms: number;

  @Column('int', { default: 0 })
  parkingSpaces: number;

  @Column({ default: false })
  hasElevator: boolean;

  @Column({ default: false })
  hasBalcony: boolean;

  @Column({ default: false })
  hasStorage: boolean;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  propertyType: PropertyType;

  @Column({
    type: 'enum',
    enum: ListingType,
  })
  listingType: ListingType;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.ACTIVE,
  })
  status: PropertyStatus;

  // Location fields
  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  address: string;

  // PostGIS point for location
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  @Index({ spatial: true })
  location: string;

  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column('int', { nullable: true })
  yearBuilt: number;

  @Column('int', { nullable: true })
  floorNumber: number;

  @Column('int', { nullable: true })
  totalFloors: number;

  @Column('int', { default: 0 })
  views: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ nullable: true })
  video: string;

  // Relations
  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column('uuid')
  ownerId: string;

  @ManyToOne(() => Agent, (agent) => agent.properties, { nullable: true })
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @Column('uuid', { nullable: true })
  agentId: string;

  @OneToMany(() => PropertyImage, (image) => image.property, { cascade: true })
  images: PropertyImage[];

  @OneToMany(() => Favorite, (favorite) => favorite.property)
  favorites: Favorite[];

  @OneToMany(() => PropertyView, (view) => view.property)
  propertyViews: PropertyView[];
}
