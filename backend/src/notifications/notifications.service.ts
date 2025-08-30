import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationsRepository.create(createNotificationDto);
    return this.notificationsRepository.save(notification);
  }

  async findByUser(userId: string, page: number = 1, limit: number = 20): Promise<any> {
    const skip = (page - 1) * limit;
    
    const [notifications, total] = await this.notificationsRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: notifications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findUnread(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { userId, isRead: false },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationsRepository.update(
      { userId, isRead: false },
      { isRead: true }
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationsRepository.count({
      where: { userId, isRead: false },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const notification = await this.notificationsRepository.findOne({
      where: { id, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    await this.notificationsRepository.remove(notification);
  }

  // Helper methods for creating specific notification types
  async createPropertyUpdateNotification(userId: string, propertyId: string, title: string): Promise<Notification> {
    return this.create({
      userId,
      type: NotificationType.PROPERTY_UPDATE,
      title,
      message: 'یکی از املاک مورد علاقه شما به‌روزرسانی شده است',
      actionUrl: `/properties/${propertyId}`,
      metadata: { propertyId },
    });
  }

  async createPriceChangeNotification(userId: string, propertyId: string, oldPrice: number, newPrice: number): Promise<Notification> {
    const change = newPrice > oldPrice ? 'افزایش' : 'کاهش';
    return this.create({
      userId,
      type: NotificationType.PRICE_CHANGE,
      title: `تغییر قیمت ملک`,
      message: `قیمت یکی از املاک مورد علاقه شما ${change} یافته است`,
      actionUrl: `/properties/${propertyId}`,
      metadata: { propertyId, oldPrice, newPrice },
    });
  }

  async createNewPropertyNotification(userId: string, propertyId: string): Promise<Notification> {
    return this.create({
      userId,
      type: NotificationType.NEW_PROPERTY,
      title: 'ملک جدید',
      message: 'ملک جدیدی مطابق با ترجیحات شما اضافه شده است',
      actionUrl: `/properties/${propertyId}`,
      metadata: { propertyId },
    });
  }

  async createMessageNotification(userId: string, senderId: string, senderName: string): Promise<Notification> {
    return this.create({
      userId,
      type: NotificationType.MESSAGE,
      title: 'پیام جدید',
      message: `پیام جدیدی از ${senderName} دریافت کردید`,
      actionUrl: `/messages`,
      metadata: { senderId },
    });
  }
}
