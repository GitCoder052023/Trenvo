const CloudinaryHelper = require('../utils/CloudinaryHelper');
require('dotenv').config();

const cloudinaryHelper = new CloudinaryHelper(
    process.env.CLOUDINARY_CLOUD_NAME, 
    process.env.CLOUDINARY_API_KEY, 
    process.env.CLOUDNINARY_API_SECRET
);

const WARDROBE_FOLDER = 'Wardrobe';

async function uploadFiles(req, res) {
    try {
        const { files } = req.body;
        const uploadResults = await cloudinaryHelper.uploadMultipleFiles(files, { folder: WARDROBE_FOLDER });
        
        // Filter out sensitive information and include original name
        const sanitizedResults = uploadResults.map((file, index) => ({
            public_id: file.public_id,
            url: file.secure_url,
            width: file.width,
            height: file.height,
            format: file.format,
            resource_type: file.resource_type,
            created_at: file.created_at,
            tags: file.tags,
            context: file.context,
            display_name: files[index].name || files[index].id // Use the original name from request
        }));

        res.status(200).json({
            message: 'Files uploaded successfully',
            files: sanitizedResults
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading files', error: error.message });
    }
}



async function getFileDetails(req, res) {
    try {
        const { publicId } = req.body;
        const fileDetails = await cloudinaryHelper.getFileDetails(publicId);
        res.status(200).json({
            message: 'File details retrieved successfully',
            file: fileDetails
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving file details', error: error.message });
    }
}

async function updateFile(req, res) {
    try {
        const { publicId, options } = req.body;
        const updatedFile = await cloudinaryHelper.updateFile(publicId, options);
        res.status(200).json({
            message: 'File updated successfully',
            file: updatedFile
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating file', error: error.message });
    }
}

async function deleteFile(req, res) {
    try {
        const { publicId } = req.body;
        const result = await cloudinaryHelper.deleteFile(publicId);
        res.status(200).json({
            message: 'File deleted successfully',
            result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file', error: error.message });
    }
}

async function listFiles(req, res) {
    try {
        const files = await cloudinaryHelper.listFiles(WARDROBE_FOLDER);
        res.status(200).json({
            message: 'Files retrieved successfully',
            files
        });
    } catch (error) {
        res.status(500).json({ message: 'Error listing files', error: error.message });
    }
}

async function uploadSingleFile(req, res) {
    try {
        const { filePath } = req.body;
        const result = await cloudinaryHelper.uploadFile(filePath, { folder: WARDROBE_FOLDER });

        const sanitizedResults = {
            public_id: result.public_id,
            url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
            created_at: result.created_at,
            tags: result.tags,
            context: result.context,
            display_name: result.display_name
        };

        res.status(200).json({
            message: 'File uploaded successfully',
            file: sanitizedResults
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
}

module.exports = {
    uploadFiles,
    getFileDetails,
    updateFile,
    deleteFile,
    listFiles,
    uploadSingleFile
};
