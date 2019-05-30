//Dane gry
let gameId;
let gameSize;
let gameColors;
let gameSteps;
let step = 0;
let result;


const menuSize = document.getElementById('menu-size');
const menuColors = document.getElementById('menu-colors');
const menuStep = document.getElementById('menu-step');
const uwagaSize = document.getElementById('uwaga-size');
const uwagaColors = document.getElementById('uwaga-colors');
const uwagaStep = document.getElementById('uwaga-step');
const uwaga = document.getElementById('uwaga');
const btnStart = document.getElementById('menu-start');
const btnPlay = document.getElementById('play');
const colors = document.getElementById('game-colors');
const game = document.getElementById('game');
const przebieg = document.getElementById('przebieg');

//Walidacja 
/*
menuRozmiar.addEventListener('input', (e) => {
    if (e.target.value <= 0 || e.target.value === '') {
        uwagaRozmiar.textContent = 'Pole wymagane i wiekszę od 0';
    } else {
        uwagaRozmiar.textContent = '';
    }
    8
});

menuKolory.addEventListener('input', (e) => {
    if (e.target.value <= 0 || e.target.value === '') {
        uwagaKolory.textContent = 'Pole wymagane i wiekszę od 0';
    } else {
        uwagaKolory.textContent = '';
    }
});

menustepi.addEventListener('input', (e) => {
    if (e.target.value < 0) {
        uwagastepi.textContent = 'Pole nie wymagane ,ale wiekszę od 0';
    } else {
        uwagastepi.textContent = '';
    }
});

*/




let init = () => {
    console.log("init");
    if (gameSteps > 0) {
        document.getElementById('status').textContent = ` ${gameSteps} steps left`;
    } else {
        gameSteps = -1;
        document.getElementById('status').textContent = `steps: unlimited`;
    }

    const move = document.getElementById('game-move');

    for (let i = 0; i < gameSize; i++) {
        let kwadrat = document.createElement('div');
        kwadrat.className = 'kwadrat';
        kwadrat.dataset.key = '-1';
        kwadrat.addEventListener('click', (e) => {
            if (e.target.dataset.key == gameColors - 1) {
                e.target.dataset.key = 0;
            } else {
                e.target.dataset.key++;
            }

            e.target.textContent = e.target.dataset.key;

        });
        move.appendChild(kwadrat);
    }

}





let add = () => {
    console.log("add");
    if (menuSize.value > 0 && menuColors.value > 0) {
        fetch("game", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    steps: menuStep.value,
                    size: menuSize.value,
                    colors: menuColors.value
                })
            })
            .then(res => res.json())
            .then(res => {
                gameId = res.game;
                gameSize = res.size;
                gameColors = res.colors;
                gameSteps = res.steps;
                document.getElementById('menu').style.display = 'none';
                document.getElementById('game').style.display = 'block';
                init();
            })



    } else {
        uwaga.textContent = "Data not valid";
    }
}
btnStart.addEventListener('click', add);



let marks = () => {
    console.log("marks");
    const move = document.querySelectorAll('.kwadrat');
    let count = 0;
    const tab = [];
    move.forEach((element) => {
        if (element.dataset.key == -1) {
            ++count;
        }
        tab.push(element.textContent);
    });

    console.log(tab);

    if (count === 0) {
        let div = document.createElement('div');
        div.innerHTML = `step ${++step} </br>`;
        move.forEach((element) => {
            element.className = 'kwadratP';
            div.appendChild(element);
        });

        let result;



        fetch("game/move", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    game: gameId,
                    move: tab,
                })
            })
            .then(res => res.json())
            .then(res => {


                gameId = res.game;
                result = res.result;
                let solution = res.solution;

                console.log(result);
                if (result.black == gameSize) {
                    game.style.display = "none";
                    document.getElementById('won').style.display = 'block';
                } else {
                    if (solution == 'lost') {
                        game.style.display = "none";
                        document.getElementById('lost').style.display = 'block';
                    }
                }
                let wyn = document.createElement('div');
                wyn.textContent = `white: ${result.white}  black: ${result.black}`
                div.appendChild(wyn);
                init();
            })


        div.className = "step";
        przebieg.appendChild(div);



    }
}


btnPlay.addEventListener('click', marks);

document.getElementById('ponownie1').addEventListener('click', () => {
    document.getElementById('lost').style.display = 'none';
    document.getElementById('won').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    gameId = 0;
    gameSize = 0;
    gameColors = 0;
    gameSteps = 0;
    step = 0;

    przebieg.textContent = '';
    document.getElementById('status').textContent = '';
    document.getElementById('game-move').textContent = '';




});

document.getElementById('ponownie2').addEventListener('click', () => {
    document.getElementById('lost').style.display = 'none';
    document.getElementById('won').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    gameId = 0;
    gameSize = 0;
    gameColors = 0;
    gameSteps = 0;
    step = 1;

    przebieg.textContent = '';
    document.getElementById('status').textContent = '';
    document.getElementById('game-move').textContent = '';




});