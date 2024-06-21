import { Document, Model } from "mongoose";

/**
 * Interface Profile - contains user's profile data
 * @property {string} status - user's account status, either "active" or "inactive"
 * @property {string} gender - user's gender, either "male", "female" or "unknown"
 * @property {string | null} name - user's full name, optional
 * @property {string | null} avatar - user's avatar url, optional
 * @property {string | null} bio - user's bio, optional
 */
export interface Profile {
  status: "active" | "inactive";
  gender: "male" | "female" | "unknown";
  name?: string | null;
  avatar?: string | null;
  bio?: string | null;
}

/**
 * Interface IUser - interface for user document in MongoDB
 * @property {string} username - user's unique username
 * @property {string} email - user's unique email
 * @property {string} password - user's password hash
 * @property {number} login_attempts - user's login attempts
 * @property {Date} locked_until - date when user's account is locked
 * @property {string} role - user's role, either "user" or "admin"
 * @property {Profile} profile - user's profile data
 * @property {Date} created_at - date when user was created
 * @property {Date} updated_at - date when user was last updated
 *
 * @function comparePassword - compare user's password with hashed password
 * @function loginAttempts - increment user's login attempts
 */
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  login_attempts: number;
  locked_until: Date;
  is_locked: boolean;
  role: "user" | "admin";
  profile: Profile;
  created_at: Date;
  updated_at: Date;

  // methods
  comparePassword(password: string): Promise<boolean>;
  loginAttempts(): Promise<void>;
}

export interface IUserModel extends Model<IUser> {}
