const express = require('express');
const heliverseData = require('../model/heliverseData');

const router = express.Router();

router.post('/api/createuser', async (req, res) => {
    try {
        const { id, first_name, last_name, email, gender, avatar, domain, available } = req.body;
        const newUser = await heliverseData.create({ id, first_name, last_name, email, gender, avatar, domain, available });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
