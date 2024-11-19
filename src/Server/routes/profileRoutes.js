const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, logoutUser } = require('../controllers/profileController');

router.post('/get/user', getUserProfile);
router.put('/update/user', updateUserProfile);
router.delete('/logout', logoutUser);

module.exports = router;
