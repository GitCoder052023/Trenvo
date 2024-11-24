const cloudinary = require('cloudinary').v2;

class CloudinaryHelper {
  constructor(cloudName, apiKey, apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadFile(filePath, options = {}) {
    try {
      const result = await cloudinary.uploader.upload(filePath, options);
      return result;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async uploadMultipleFiles(files, options = {}) {
    try {
      const uploadPromises = files.map(({ id, name, url }) => {
        const displayName = name || id;
        return this.uploadFile(url, { 
          ...options, 
          public_id: id,
          display_name: displayName,
          context: { 
            alt: displayName, 
            caption: displayName,
            display_name: displayName  
          }
        });
      });
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      throw new Error(`Failed to upload multiple files: ${error.message}`);
    }
}


  async getFileDetails(publicId) {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result;
    } catch (error) {
      throw new Error(`Failed to retrieve file details: ${error.message}`);
    }
  }

  async updateFile(publicId, options = {}) {
    try {
      const result = await cloudinary.uploader.explicit(publicId, {
        type: 'upload',
        ...options,
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to update file: ${error.message}`);
    }
  }

  async deleteFile(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async listFiles(folder) {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder,
      });
      return result.resources;
    } catch (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }
}

module.exports = CloudinaryHelper;
