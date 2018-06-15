const path = require('path');
const express = require('express');

const publicpath = path.join(__dirname, '../public');
const por = processs.env.PORT || 3000;
var app = express();

app.use(express.static(publicpath));

app.listen(port,() =>{
    console.log(`Server is up on ${port}`);x
  });
