//jshint node: true, esversion: 6
'use strict';

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

exports.test = (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.json({
        "txt": "Witaj !"
    });
};

exports.move = (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    ret=getMarks([1, 2, 5, 4, 1],[6,3,5,2,1]);  //TESTOWE
    res.json({
        game: req.body.game,
        result:{
            black: ret.black,
            white: ret.white
        }
    });
};

exports.newGame = (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.json({
                 game: uuidv1(), //generate id
                 size: req.body.size,
                 colors: req.body.colors,
                 steps: 10
             });
};

exports.index = (par) => {
    return (_, res) => {
        res.render('index', {
            title: 'Express',
            txt: par
        });
    };
};
