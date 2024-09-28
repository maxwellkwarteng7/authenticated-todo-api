const express = require('express'); 

const router = express.Router(); 


router.get('/new', function (req, res) {
   
    res.status(200).json({msg : "Hello you hit this route"}); 
}); 



module.exports = router; 