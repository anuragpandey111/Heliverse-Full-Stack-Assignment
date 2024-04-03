const express = require('express');
const heliverseData = require('../model/heliverseData');

const router = express.Router();

router.get('/api/users/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const findUser = await heliverseData.findOne({ id: id });
        if (findUser) {
            res.status(200).json(findUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
