const express = require('express');
const heliverseData = require('../model/heliverseData');

const router = express.Router();

router.put('/api/updateuser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
            const updatedUser = await heliverseData.findOneAndUpdate({ id: id }, { first_name, last_name, email, gender, avatar, domain, available }, { new: true });
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid request' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
