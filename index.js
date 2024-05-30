import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import './helpers/dotenv.js';
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import './helpers/mongoose.js';
import upload from "./middleware/uploadMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
// app.use(express.static(path.join(__dirname, "build")));
app.use(
  "/public/assets",
  express.static(process.cwd()+"/public/assets")
);

/* ROUTES WITH FILES */


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
// app.get('/download/:fileId', (req, res) => {
//   const fileId = req.params.fileId;
//   File.findById(fileId, (err, file) => {
//       if (err || !file) {
//           return res.status(404).send('File not found');
//       }
//       res.set('Content-Type', file.mimetype);
//       res.send(file.data);
//   });
// });

// app.get('/download/:filename', (req, res) => {
//   let files  =  gfs.files.findOne({ filename: req.params.filename });
//   res.send(files);
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ message: 'File not found' });
//     }
//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//   });
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
