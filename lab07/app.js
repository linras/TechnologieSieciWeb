//jshint esversion:6, node:true, devel: true

const express = require('express');
const parser = require('body-parser');
const uuid = require('uuid/v1');
const app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json());



//Zapamietywanie Gier
const gryMapa = new Map();


//Klasa Gry
class Gra {

    constructor(gameId, rozmiar, kolory, kroki, rozwiazanie) {
        this.gameId = gameId;
        this.rozmiar = rozmiar;
        this.kolory = kolory;
        this.kroki = kroki;
        this.rozwiazanie = rozwiazanie;
        this.kod = [];
    }

    generuj() {
        for (let i = 0; i < this.rozmiar; i++) {
            this.kod.push(Math.floor(Math.random() * this.kolory) + "");
        };
    }

    ocena(ruch) {

        console.log(ruch);
        console.log(this.kod);

        let wynik = {
            białe: 0,
            czarne: 0
        }

        let mapa1 = new Map();
        let mapa2 = new Map();

        this.kod.forEach((element, index) => {
            if (element === ruch[index]) {
                wynik.czarne++;
            } else {

                if (mapa1.get(element) === undefined) {
                    mapa1.set(element, 1);
                } else {
                    mapa1.set(element, mapa1.get(element) + 1);
                }

                if (mapa2.get(ruch[index]) === undefined) {
                    mapa2.set(ruch[index], 1);
                } else {
                    mapa2.set(ruch[index], mapa2.get(ruch[index]) + 1);
                }

            }

        });



        mapa1.forEach((value, key) => {
            let r = mapa2.get(key);
            if (r !== undefined) {
                r >= value ? wynik.białe += value : wynik.białe += r;
            }
        })

        console.log(wynik);

        return wynik;
    }


}




//NOWA GRA
app.post(('/game'), (req, res) => {

    let gra = new Gra(uuid(), req.body.rozmiar, req.body.kolory, req.body.kroki, false)
    gra.generuj();
    gryMapa.set(gra.gameId, gra);


    console.log(gra);


    res.json({
        gra: gra.gameId,
        rozmiar: gra.rozmiar,
        kolory: gra.kolory,
        kroki: gra.kroki
    });
});


// ZAPYTANIE (nowy ruch): POST /game/move
app.post(('/game/move'), (req, res) => {
    let gra = gryMapa.get(req.body.gra);
    gra.kroki--;

    if (gra.kroki == 0) {
        gra.rozwiazanie = 'przegrana';
    }

    res.json({
        gra: req.body.gra,
        wynik: gra.ocena(req.body.ruch),
        rozwiazanie: gra.rozwiazanie
    });
})



// STAN GRY
app.post(('/game/status'), (req, res) => {
    let gra = gryMapa.get(req.body.gra);

    res.json({
        gra: req.body.gra,
        rozwiazanie: gra.rozwiazanie
    });

});


// ODPALANIE
app.get('/', function (req, res) {
    res.sendFile("index.html");
});


app.listen(3000, function () {
    console.log('nasluchuje na porcie 3000!');
});