const { UserAddress } = require('../models/UserAddress');

exports.createUserAddress = async (req, res) => {
    try {
        const { addressType, houseName, latitude, longitude, area, landMark, receiverContact , googleAddress } = req.body;

        const userId = req.userId

        const newUserAddress = await UserAddress.create({
            userId,
            addressType,
            houseName,
            latitude,
            longitude,
            area,
            landMark,
            receiverContact,
            googleAddress
        });

        res.status(201).json({ message: 'User address created successfully', userAddress: newUserAddress });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserAddressById = async (req, res) => {
    try {
        const userId = req.userId;

        const userAddress = await UserAddress.findByPk(userId);

        if (!userAddress) {
            return res.status(404).json({ error: 'User address not found' });
        }

        res.status(200).json({ userAddress });
    } catch (error) {
        console.error('Error fetching user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const { addressType, houseName, latitude, longitude, area, landMark, receiverContact } = req.body;

        const userAddress = await UserAddress.findByPk(addressId);

        if (!userAddress) {
            return res.status(404).json({ error: 'User address not found' });
        }

        await userAddress.update({
            addressType,
            houseName,
            latitude,
            longitude,
            area,
            landMark,
            receiverContact
        });

        res.status(200).json({ message: 'User address updated successfully', userAddress });
    } catch (error) {
        console.error('Error updating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUserAddress = async (req, res) => {
    try {
        const { addressId } = req.params;

        const userAddress = await UserAddress.findByPk(addressId);

        if (!userAddress) {
            return res.status(404).json({ error: 'User address not found' });
        }

        await userAddress.destroy();

        res.status(200).json({ message: 'User address deleted successfully' });
    } catch (error) {
        console.error('Error deleting user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
