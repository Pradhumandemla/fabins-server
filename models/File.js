import mongoose from "mongoose";
const FileSchema = new mongoose.Schema(
  {
    filename: String,
    data: Buffer,
    size: Number,
    mimetype: String
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);

export default File;
