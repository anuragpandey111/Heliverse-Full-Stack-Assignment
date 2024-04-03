const express = require('express')
const heliverseData=require('../model/heliverseData')

const router=express.Router()

router.get('/api/users', async (req, res) => {
    try {
        const allUsers = await heliverseData.find()
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports=router