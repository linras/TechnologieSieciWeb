// jshint esversion: 6, node: true
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');  //do tworzenia id

app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('Dziala GET');
  });

app.post('/game/new', (req, res) => {
    res.json({
        game: uuidv1(), //generuje id
        size: req.body.size,
        colors: req.body.colors,
        steps: 10
    });

});



app.listen(3000, () =>{
    console.log("Serwer dziala na porcie 3000");
});