import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Property } from './property.entity';

@Entity('property_images')
export class PropertyImage extends BaseEntity {
  @Column()
  url: string;

  @Column({ nullable: true })
  alt: string;

  @Column('int', { default: 0 })
  order: number;

  @Column({ default: false })
  isPrimary: boolean;

  // Relations
  @ManyToOne(() => Property, (property) => property.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column('uuid')
  propertyId: string;
}
