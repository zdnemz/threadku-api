import mongoose from "mongoose";
import { INotification } from "@/types/models";

// Define the notification schema
export const notificationSchema = new mongoose.Schema<INotification>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "comment", "follow", "message"],
    required: true,
  },
  entity_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "entity_type",
    required: true,
  },
  entity_type: {
    type: String,
    enum: ["Post", "Comment"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
