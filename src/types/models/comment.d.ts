import mongoose, { Document, Model } from "mongoose";

/**
 * Interface IComment - interface for comment document in MongoDB\
 * @property {mongoose.Types.ObjectId} post_id - comment reference
 * @property {string} content - comment content
 * @property {mongoose.Types.ObjectId} author - comment author
 * @property {mongoose.Types.ObjectId} parent_id - comment parent
 * @property {mongoose.Types.ObjectId[]} likes - comment likes
 * @property {number} likes_count - comment likes count
 * @property {Date} created_at - date when comment was created
 * @property {Date} updated_at - date when comment was last updated
 * 
 * @function like - like comment
 * @function unlike - unlike comment
 * @function isLiked - check if comment is liked
 **/
export interface IComment extends Document {
  post_id: mongoose.Types.ObjectId;
  content: string;
  author: mongoose.Types.ObjectId;
  parent_id?: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  likes_count: number;
  created_at: Date;
  updated_at: Date;

  // methods
  like(user_id: string): Promise<void>;
  unlike(user_id: string): Promise<void>;
  isLiked(user_id: string): Promise<boolean>;
}

export interface ICommentModel extends Model<IComment> {}
