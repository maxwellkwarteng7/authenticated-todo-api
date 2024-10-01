const express = require('express');

const router = express.Router();


router.get('/dashboard', (req, res) => {
    const { userId } = req;
    

    res.status(200).json({ msg: "this user is authenticated" });
});



module.exports = router; 