const express = require('express');
const router = express.Router();


router.get('/home/*',
    (req, res) => {
        throw new Error('ok')
        res.send('Home')
    });

module.exports = router;

