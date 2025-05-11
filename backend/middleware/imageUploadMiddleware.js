const path = require("path");
const { put } = require('@vercel/blob'); // Vercel Blob SDK
const { IS_PRODUCTION } = require("../config/const");


const uploadImage = (imageType)=> async (req, res, next) => {
    console.log('hit updateAvatar middleware')
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    
    try {
      if (IS_PRODUCTION) {

        const PUBLIC_DIR_FROM_BACKEND_ROOT = `/public/images/uploads/${imageType}`;
        console.log('hit vercel blob')
        const file = req.file;
        console.log('file: ', file)
        const fileExtension = path.extname(file.originalname);
        const blobFilename = `${PUBLIC_DIR_FROM_BACKEND_ROOT}/${Date.now()}${fileExtension}`;
        
        const blob = await put(blobFilename, file.buffer, {
          access: 'public',
          contentType: file.mimetype,
        });
        console.log('blob: ', blob)
        req.fileUrlToStore = blob.url; // Store the full Vercel Blob URL
      }else{
        console.log('Using local disk storage.');
        const PUBLIC_STATIC_ROOT_DIR = path.join(__dirname, '../public');
        const file = req.file; // File path is in req.file.path
        console.log('file: ', file)
        if (file && file.path) {
          const relativePath = path.relative(PUBLIC_STATIC_ROOT_DIR, file.path);
          req.fileUrlToStore = `/${relativePath.replace(/\\/g, '/')}`; // Store this path/URL in DB
          console.log('req.fileUrlToStore: ', req.fileUrlToStore)
        } else {
          console.error('File path not found for local storage. Avatar URL will be null.');
        }
      }
      next();  
    } catch (error) {
      console.error('Error during file upload process:', error);
      if (error.name === 'BlobError') {
           return res.status(500).json({ message: `Vercel Blob Error: ${error.message}` });
      }
      return res.status(500).json({ message: 'Failed to upload file.' });
    }
  }

  module.exports = { uploadImage };