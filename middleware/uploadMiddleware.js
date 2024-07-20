import multer from "multer";

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
