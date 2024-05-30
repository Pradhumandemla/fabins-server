import Post from "../models/Post.js";
import File from "../models/File.js";
// import User from "../models/User.js";

/* CREATE */
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

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().populate({
      path: "userId",
      select: "firstName lastName profilePicture location -_id",
    })
    .populate({
      path:"images",
      select: "data -_id",
    })
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).populate({
      path: "userId",
      select: ["firstName", "lastName", "profilePicture", "location"],
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
