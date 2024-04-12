const express = require('express');
const app = express();


app.get('/oldPath', function (req, res) {
    res.status(301).redirect('/newPath');
});

app.listen(3000);
