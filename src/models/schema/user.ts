import mongoose from "mongoose";
import { IUser, Profile } from "@/types/models";

const profileSchema = new mongoose.Schema<Profile>(
  {
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown",
    },
    name: String,
    avatar: String,
    bio: String,
  },
  {
    _id: false,
  }
);

export const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  login_attempts: {
    type: Number,
    default: 0,
    select: false,
  },
  locked_until: {
    type: Date,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    select: false,
  },
  profile: {
    type: profileSchema,
    default: {},
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

