const { getUserById, updateUserById, deleteUserById } = require('../models/User');
const ALLOWED_UPDATE_FIELDS = ['name', 'phone', 'locality', 'road', 'house', 'landmark'];

async function getUserProfile(req, res) {
    const { UserId } = req.body;
    try {
        const user = await getUserById(UserId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { _id, password, ...userWithoutSensitiveInfo } = user;
        
        res.status(200).json({ user: userWithoutSensitiveInfo });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
}

async function updateUserProfile(req, res) {
    const { UserId, updates } = req.body;
    try {
        const filteredUpdates = {};
        ALLOWED_UPDATE_FIELDS.forEach(field => {
            if (updates.hasOwnProperty(field)) {
                filteredUpdates[field] = updates[field];
            }
        });

        if (Object.keys(filteredUpdates).length === 0) {
            return res.status(400).json({ message: 'No valid fields to update' });
        }

        const result = await updateUserById(UserId, filteredUpdates);
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get updated user profile
        const updatedUser = await getUserById(UserId);
        const { _id, password, ...userWithoutSensitiveInfo } = updatedUser;

        res.status(200).json({ 
            message: 'Profile updated successfully',
            user: userWithoutSensitiveInfo 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
}

async function logoutUser(req, res) {
    const userId = req.headers.authorization;
    
    if (!userId) {
        return res.status(401).json({ message: 'Authorization header required' });
    }

    try {
        const user = await getUserById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await deleteUserById(userId);
        
        if (result.deletedCount === 1) {
            return res.status(200).json({ message: 'User logged out and deleted successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to delete user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during logout', error: error.message });
    }
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    logoutUser  
};