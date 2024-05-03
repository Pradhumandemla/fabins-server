import mongoose from "mongoose";
// import Grid from "gridfs-stream";
// import User from "../../models/User.js";
// import Post from ".../../models/Post.js";
// import { users, posts } from "./data/index.js";

mongoose.set("strictQuery", true);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
if (!(mongoose.connection.readyState === 1)) {
  mongoose
  .connect(process.env.MONGO_URL, options)
  .then(() => {
    console.log("db connected successfully");
    // ADD DATA ONE TIME
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));
}

// Initialize GridFS
// let gfs;
// mongoose.connection.once('open', () => {
//   gfs = Grid(mongoose.connection.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// export const fileUploadDb = (uploadFile)=>{
//   try {
    
//     const writeStream = gfs.createWriteStream({
//       filename: uploadFile.filename,
      
//     });
    
//     // Read file from disk and pipe it to GridFS
//     const readStream = fs.createReadStream(uploadFile.path);
//     readStream.pipe(writeStream);
    
//     writeStream.on('close', (file) => {
//       // File uploaded successfully
//       return ({ file_id: file._id });
//     });
//   } catch (error) {
//     return ({ error });  
//   }
// };

export default mongoose;
