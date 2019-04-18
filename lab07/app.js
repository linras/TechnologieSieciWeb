// jshint esversion: 6, node: true
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');  //do tworzenia id
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const router = express.Router();


// bodyParser parsuje formaty:
//   json, x-www-form-urlencoded i multipart/form-data
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//ejs sample
app.get('/test2', routes.index('wymiata'));
//app.get('/test3', routes.move());

function getMarks(W, Z){
    ret = {};
    black=0;
    white=0;
    W.forEach((elW, indexW) => {
        if (W[indexW]===Z[indexW]) {
            black++;
        }
        else{
            for (let indexZ = 0; indexZ < Z.length; indexZ++) {
                const element = Z[indexZ];
                if (Z[indexZ]==elW && elW!=W[indexZ]) {
                    white++;
                    break;  //in foreach break impossible
                }
            }
        }
    });
    ret.white=white;
    ret.black=black;
    return ret;
};

// const ind = require('./routes/index.js');
// app.use('/test2',ind);

app.get('/test', (_req, res) => {
    ret=getMarks([1,2,5,4,1],[6,3,5,2,1]);
    res.json({
        white: ret.white,
        black: ret.black
    });
  });

app.get('/', (_req, res) => {
    res.send('Dziala GET');
  });

// app.post('/game/new', (req, res) => {
//     res.json({
//         game: uuidv1(), //generate id
//         size: req.body.size,
//         colors: req.body.colors,
//         steps: 10
//     });

// });

app.post('/game/move', (req, res) =>{
    
    ret=getMarks([1, 2, 5, 4, 1],[6,3,5,2,1]);  //TESTOWE
    res.json({
        game: req.body.game,
        result:{
            black: ret.black,
            white: ret.white
        }
    });
});

app.post('/game/move', routes.move);
app.post('/game/new', routes.newGame);
app.post('/s/', routes.test);

app.listen(3000, () =>{
    console.log("Serwer dziala na porcie 3000");
});