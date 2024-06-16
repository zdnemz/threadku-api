import mongoose, { Model, Document } from "mongoose";

export enum NotificationType {
  LIKE = "like",
  COMMENT = "comment",
  FOLLOW = "follow",
  MESSAGE = "message",
}

export enum NotificationEntityType {
  POST = "Post",
  COMMENT = "Comment",
}

/**
 * Interface INotification - interface for notification document in MongoDB
 * @property {mongoose.Types.ObjectId} user_id - user id
 * @property {mongoose.Types.ObjectId} sender_id - sender id
 * @property {NotificationType} type - notification type
 * @property {mongoose.Types.ObjectId} entity_id - entity id
 * @property {string} entity_type - entity type
 * @property {string} message - notification message
 * @property {boolean} read - notification read
 * @property {Date} created_at - date when notification was created
 * 
 * @function toJSON - convert notification to plain object
 * @function markAsRead - mark notification as read
 **/

export interface INotification extends Document {
  user_id: mongoose.Types.ObjectId;
  sender_id: mongoose.Types.ObjectId;
  type: NotificationType;
  entity_id?: mongoose.Types.ObjectId;
  entity_type?: NotificationEntityType;
  message: string;
  read: boolean;
  created_at: Date;

  // methods
  toJSON(): object;
  markAsRead(): Promise<INotification>;
}

export interface INotificationModel extends Model<INotification> {}
