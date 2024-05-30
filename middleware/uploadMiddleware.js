import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// import Grid from "gridfs-stream";
// import mongoose from "../helpers/mongoose.js";

// Initialize GridFS stream
// let gfs;
// mongoose.connection.once("open", () => {
//   gfs = Grid(mongoose.connection.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// Set up storage engine
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URL,
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: "uploads",
//     };
//   },
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads/') // Define the destination folder where files will be saved
//   },
//   filename: function (req, file, cb) {
//       cb(null, file.originalname) // Use the original filename
//   }
// });

const storage = multer.memoryStorage(); // Store file chunks in memory

const upload = multer({ storage });

// export { gfs };
export default upload;
