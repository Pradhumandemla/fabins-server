
export const upload = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    // Create a write stream
    const writeStream = gfs.createWriteStream({
      filename: req.file.filename,
    });
  
    // Read file from disk and pipe it to GridFS
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(writeStream);
  
    writeStream.on('close', (file) => {
      // File uploaded successfully
      res.status(200).json({ file_id: file._id });
    });
  }