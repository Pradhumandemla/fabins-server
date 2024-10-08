import express from "express";
import cors from "cors";
import helmet from "helmet";
import "./helpers/dotenv.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import logger from "./middleware/logger.js";
import "./helpers/mongoose.js";
import File from "./models/File.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
// app.use(logger);
// app.use(express.static(path.join(__dirname, "build")));
app.use("/public/assets", express.static(process.cwd() + "/public/assets"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.get("/download/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    console.log(fileId);
    let file = await File.findById(fileId);
    if (!file) {
      throw new Error("File not found");
    }
    res.set('Content-Type', file.mimetype);
    res.send(file.data);
  } catch (error) {
    res.send(error.message);
  }

  //   File.findById(fileId), (err, file) => {
  //       if (err || !file) {
  //           return res.status(404).send('File not found');
  //       }
  //       res.set('Content-Type', file.mimetype);
  //       res.send(file.data);
  //   });
});
app.get("/img/:id", async (req , res) => {
  if(req.params.id == '1'){
    return res.json({
      status : 200,
      message : 'Data exits',
      data :{
        picId:"1",
        picName:"abcd.jpg",
        picS3URl:"http://dummy.com/abcd.jpg",
      }
    });
  }
  return res.json({
    status : 200,
    message : 'Data does not exits',})


})
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
