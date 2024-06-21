import mongoose, { Document, Model } from "mongoose";

/**
 * Interface IPost - interface for post document in MongoDB
 * @property {string} content - post content
 * @property {string[]} medias - post medias
 * @property {string[]} hashtags - post hashtags
 * @property {mongoose.Types.ObjectId} author - post author
 * @property {number} comments_count - post comments count
 * @property {mongoose.Types.ObjectId[]} likes - post likes count
 * @property {number} likes_count - post likes count
 * @property {mongoose.Types.ObjectId[]} collections - post collections
 * @property {number} collections_count - post collections
 * @property {boolean} is_private - post privacy
 * @property {Date} created_at - date when post was created
 * @property {Date} updated_at - date when post was last updated
 *
 * @function isLiked - check if post is liked
 * @function isCollected - check if post is collected
 **/

export interface IThread extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  medias?: string[];
  hashtags?: string[];
  comments_count: number;
  likes_count: number;
  is_private: boolean;
  created_at: Date;
  updated_at: Date;

  // methods
  isLiked(user_id: string): Promise<boolean>;
  isCollected(user_id: string): Promise<boolean>;
}

export interface IThreadModel extends Model<IThread> {}
