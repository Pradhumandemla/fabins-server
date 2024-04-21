import mongoose from "mongoose";

// const postSchema = mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     location: String,
//     description: String,
//     picturePath: String,
//     userPicturePath: String,
//     likes: {
//       type: Map,
//       of: Boolean,
//     },
//     comments: {
//       type: Array,
//       default: [],
//     },
//   },
//   { timestamps: true }
// );
const PostSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    description: String,
    images: [{
      path:String,
      size:Number
    }], 
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    comments: [{
      userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      },
      comment: String
    }],
}, { timestamps: true })

const Post = mongoose.model("Post", PostSchema);

export default Post;
