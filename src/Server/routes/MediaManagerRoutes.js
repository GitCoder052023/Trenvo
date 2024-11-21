const express = require('express');
const router = express.Router();
const {
    uploadFiles,
    getFileDetails,
    updateFile,
    deleteFile,
    listFiles,
    uploadSingleFile
} = require('../controllers/MediaManagerController');

router.post('/upload/multiple', uploadFiles);
router.post('/upload/single', uploadSingleFile);
router.post('/file/details', getFileDetails);
router.put('/file/:publicId', updateFile);
router.delete('/file/:publicId', deleteFile);
router.get('/files', listFiles);

module.exports = router;
