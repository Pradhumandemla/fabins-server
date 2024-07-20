import Post from "../models/Post.js";
import File from "../models/File.js";
import Comment from "../models/Comment.js";

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find()
      .populate({
        path: "userId",
        select: "firstName lastName profilePicture location -_id",
      })
      .populate({
        path: "comments",
        select: "text createdAt replies _id",
      })
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { user } = req.params;
    const post = await Post.find({ user }).populate({
      path: "userId",
      select: ["firstName", "lastName", "profilePicture", "location"],
    })
    // .populate({
    //   path: "images",
    //   select: "data -_id",
    // })
    .populate({
      path: "comments",
      select: "text createdAt replies _id",
    })
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    // res.json(req.user);return;
    const { description } = req.body;
    const images = [];
    if (req.files) {
      req.files.forEach((file) => {
        images.push(
          new File({
            filename: file.originalname,
            data: file.buffer,
            mimetype: file.mimetype,
            size: file.size,
          })
        );
      });
      let result = await File.insertMany(images);
      if (!result) {
        throw new Error("Upload failed");
      }
      images.map((file) => (file = file._id));
    }
    const newPost = new Post({
      userId: req.user.id,
      description,
      images: images,
      likes: [],
      comments: [],
    });
    await newPost.save();
    res.status(200).json({ message: "Post Created Successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    // res.json(req.user);return;
    const { description } = req.body;
    const images = [];
    if (req.files) {
      req.files.forEach((file) => {
        images.push(
          new File({
            filename: file.originalname,
            data: file.buffer,
            mimetype: file.mimetype,
            size: file.size,
          })
        );
      });
      let result = await File.insertMany(images);
      if (!result) {
        throw new Error("Upload failed");
      }
      images.map((file) => (file = file._id));
    }
    const newPost = new Post({
      userId: req.user.id,
      description,
      images: images,
      likes: [],
      comments: [],
    });
    await newPost.save();
    res.status(200).json({ message: "Post Created Successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    let index = post.likes.indexOf(req.user.id);
    let message;
    if (index > -1) {
      post.likes.splice(index, 1);
      message = "unliked";
    } else {
      post.likes.push(req.user.id);
      message = "liked";
    }
    await post.save();
    res.status(200).json({ message });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, parentCommentId } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    let parentComment = null;
    if (parentCommentId) {
      parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        throw new Error("Parent comment not found");
      }
    }
    const newComment = new Comment({
      userId: req.user.id,
      text
    });
    await newComment.save();
    if (parentComment) {
      parentComment.replies.push(newComment._id);
      await parentComment.save();
    } else {
      post.comments.push(newComment._id);
      await post.save();
    }
    res.status(200).json({ message: " Comment added successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    console.log(req.user.id, post.userId);
    if (req.user.id != post.userId) {
      throw new Error("Unauthorised");
    }
    if (post.images) {
      post.images.map(async (file) => {
        await File.findByIdAndDelete(file);
      });
    }
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
