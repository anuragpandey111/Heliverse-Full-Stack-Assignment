const express = require('express');
const heliverseData =require('../model/heliverseData')

const router = express.Router();


router.delete('/api/deleteuser/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await heliverseData.findOneAndDelete({id:id})
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
