const express = require('express');
const app = express();


app.get('/donwloadFile', function (req, res) {
    res.download('./static_files/guido_geloso_profile_image.jpg')
});

app.listen(3000);
