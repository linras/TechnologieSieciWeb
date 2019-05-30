// jshint esversion: 6, node: true

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');  //do tworzenia id
const cookieParser = require('cookie-parser');

const morgan = require('morgan')
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// bodyParser parsuje formaty:
//   json, x-www-form-urlencoded i multipart/form-data
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//app.get('/test3', routes.move());

//Zapamietywanie Gier
const gamesMap = new Map();

class Game {

    constructor(gameId, size, colors, steps, solution) {
        this.gameId = gameId;
        this.size = size;
        this.colors = colors;
        this.steps = steps;
        this.solution = solution;
        this.kod = [];
    }

    generate() {
        for (let i = 0; i < this.size; i++) {
            this.kod.push(Math.floor(Math.random() * this.colors) + "");
        };
    }

    getMarks(W){
        let ret = {
            white: 0,
            black: 0
        };
        black=0;
        white=0;
        W.forEach((elW, indexW) => {
            if (W[indexW]===solution[indexW]) {
                black++;
            }
            else{
                for (let indexZ = 0; indexZ < solution.length; indexZ++) {
                    const element = solution[indexZ];
                    if (solution[indexZ]==elW && elW!=W[indexZ]) {
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



}

// const ind = require('./routes/index.js');
// app.use('/test2',ind);

app.get('/test', (_req, res) => {
    ret=getMarks([1,2,5,4,1],[6,3,5,2,1]);
    res.json({
        white: ret.white,
        black: ret.black
    });
  });


// app.post('/game/new', (req, res) => {
//     res.json({
//         game: uuid(), //generate id
//         size: req.body.size,
//         colors: req.body.colors,
//         steps: 10
//     });

// });

app.post('/game/move', (req, res) =>{
    let Game = gamesMap.get(req.body.Game);
    Game.steps--;

    if (Game.steps == 0) {
        Game.solution = 'over';
    }

    res.json({
        Game: req.body.Game,
        result: Game.getMarks(req.body.move),
        solution: Game.solution
    });
});


// STATUS OF THE GAME
app.post(('/game/status'), (req, res) => {
    let Game = gamesMap.get(req.body.Game);

    res.json({
        Game: req.body.Game,
        solution: Game.solution
    });
});


//app.post('/game/move', routes.move);


//NEW GAME
app.post(('/game/new'), (req, res) => {

    let Game = new Game(uuid(), req.body.size, req.body.colors, req.body.steps, false)
    Game.generate();
    gamesMap.set(Game.gameId, Game);

    res.json({
        Game: Game.gameId,
        size: Game.size,
        colors: Game.colors,
        steps: Game.steps
    });
});


//app.post('/s/', routes.test);

// INIT
app.get('/', function (req, res) {
    res.sendFile("index.html");
});

app.listen(3000, () =>{
    console.log("Serwer dziala na porcie 3000");
});
