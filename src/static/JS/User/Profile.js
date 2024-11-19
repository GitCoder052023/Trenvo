document.addEventListener('DOMContentLoaded', async () => {
    const displayFields = {
        name: document.getElementById('displayName'),
        email: document.getElementById('displayEmail'),
        phone: document.getElementById('displayPhone'),
        locality: document.getElementById('displayLocality'),
        roadName: document.getElementById('displayRoadName'),
        houseNumber: document.getElementById('displayHouseNumber'),
        landmark: document.getElementById('displayLandmark'),
    };

    const editForm = document.getElementById('editForm');
    const displaySection = document.getElementById('displaySection');
    const editButton = document.getElementById('editButton');
    const cancelButton = document.getElementById('cancelButton');

    async function getUserProfile() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            window.location.href = '/Auth/Login';
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/profile/get/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "UserId": userId
                })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    }

    async function updateUserProfile(updates) {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch('http://localhost:8000/profile/update/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserId: userId,
                    updates
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    function updateDisplayFields(userData) {
        const fields = {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            locality: userData.locality,
            roadName: userData.road,
            houseNumber: userData.house,
            landmark: userData.landmark,
        };

        Object.keys(fields).forEach(field => {
            displayFields[field].textContent = fields[field] || '';
        });
    }

    function populateEditForm(userData) {
        document.getElementById('name').value = userData.name || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('phone').value = userData.phone || '';
        document.getElementById('locality').value = userData.locality || '';
        document.getElementById('roadName').value = userData.road || '';
        document.getElementById('houseNumber').value = userData.house || '';
        document.getElementById('landmark').value = userData.landmark || '';
    }

    // Edit button click handler
    editButton.addEventListener('click', async () => {
        const profileData = await getUserProfile();
        populateEditForm(profileData.user);
        displaySection.classList.add('hidden');
        editForm.classList.remove('hidden');
    });

    // Cancel button click handler
    cancelButton.addEventListener('click', () => {
        editForm.classList.add('hidden');
        displaySection.classList.remove('hidden');
    });

    // Form submission handler
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const updates = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            locality: document.getElementById('locality').value,
            road: document.getElementById('roadName').value,
            house: document.getElementById('houseNumber').value,
            landmark: document.getElementById('landmark').value
        };

        try {
            await updateUserProfile(updates);
            const updatedProfile = await getUserProfile();
            updateDisplayFields(updatedProfile.user);
            editForm.classList.add('hidden');
            displaySection.classList.remove('hidden');
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    });

    // Initial load
    try {
        const profileData = await getUserProfile();
        updateDisplayFields(profileData.user);
    } catch (error) {
        console.error('Failed to load user profile:', error);
    }
});
