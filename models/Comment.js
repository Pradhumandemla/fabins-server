import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
