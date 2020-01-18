const express = require('express');
const router = express.Router();
const cloudinaryConfig = require('../../config/cloudinaryConfig');
const upload = require('../../middleware/multerUpload');
const fs = require('fs');


router.post('/', upload.array('image'), async (req, res) => {

    const uploader = async (path) => await cloudinaryConfig.uploads(path, 'Images');
  
    if (req.method === 'POST') {
      const urls = []
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
  
      res.status(200).json({
        message: 'images uploaded successfully',
        data: urls
      })
  
    } else {
      res.status(405).json({
        err: `${req.method} method not allowed`
      })
    }
  })

module.exports = router;