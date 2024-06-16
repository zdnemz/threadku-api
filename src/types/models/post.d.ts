import mongoose, { Document, Model } from "mongoose";

/**
 * Interface IPost - interface for post document in MongoDB
 * @property {string} content - post content
 * @property {string[]} medias - post medias
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
 * @function like - like post
 * @function unlike - unlike post
 * @function isLiked - check if post is liked
 * @function collect - collect post
 * @function uncollect - uncollect post
 * @function isCollected - check if post is collected
 **/

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  medias?: string[];
  hastags?: string[];
  comments_count: number;
  likes: mongoose.Types.ObjectId[];
  likes_count: number;
  collections: mongoose.Types.ObjectId[];
  collections_count: number;
  is_private: boolean;
  created_at: Date;
  updated_at: Date;

  // methods
  like(user_id: string): Promise<void>;
  unlike(user_id: string): Promise<void>;
  isLiked(user_id: string): Promise<boolean>;
  collect(user_id: string): Promise<void>;
  uncollect(user_id: string): Promise<void>;
  isCollected(user_id: string): Promise<boolean>;
}

export interface IPostModel extends Model<IPost> {}
