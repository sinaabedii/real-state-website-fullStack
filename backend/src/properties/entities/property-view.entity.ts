import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Property } from './property.entity';
import { User } from '../../users/entities/user.entity';

@Entity('property_views')
@Index(['propertyId', 'createdAt'])
export class PropertyView extends BaseEntity {
  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  // Relations
  @ManyToOne(() => Property, (property) => property.propertyViews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column('uuid')
  propertyId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('uuid', { nullable: true })
  userId: string;
}
