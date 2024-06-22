import { commentSchema } from "../schema/comment";

// commentSchema.methods.like = async function (this: IComment, user_id: string) {
//   const id = new mongoose.Types.ObjectId(user_id);

//   const liked = await Like.findOne({
//     user_id: id,
//     type: "comment",
//     entity_id: this._id,
//   });

//   !!liked;
// };

export default commentSchema;
