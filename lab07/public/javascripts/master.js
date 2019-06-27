//Dane gry
let graId;
let graRozmiar;
let graKolory;
let graKroki;
let krok = 0;
let wynik;

const menuRozmiar = document.getElementById('menu-rozmiar');
const menuKolory = document.getElementById('menu-kolory');
const menuKroki = document.getElementById('menu-kroki');
const uwagaRozmiar = document.getElementById('uwaga-rozmiar');
const uwagaKolory = document.getElementById('uwaga-kolory');
const uwagaKroki = document.getElementById('uwaga-kroki');
const uwaga = document.getElementById('uwaga');
const btnStart = document.getElementById('menu-start');
const btnGraj = document.getElementById('graj');
const kolory = document.getElementById('gra-kolory');
const gra = document.getElementById('gra');
const przebieg = document.getElementById('przebieg');







let init = () => {
    if (graKroki > 0) {
        document.getElementById('status').textContent = `Masz: ${graKroki} krokow`;
    } else {
        graKroki = -1;
        document.getElementById('status').textContent = `Kroki: Brak Limitu`;
    }

    const ruch = document.getElementById('gra-ruch');

    for (let i = 0; i < graRozmiar; i++) {
        let kwadrat = document.createElement('div');
        kwadrat.className = 'kwadrat';
        kwadrat.dataset.key = '-1';
        kwadrat.addEventListener('click', (e) => {
            if (e.target.dataset.key == graKolory - 1) {
                e.target.dataset.key = 0;
            } else {
                e.target.dataset.key++;
            }

            e.target.textContent = e.target.dataset.key;

        });
        ruch.appendChild(kwadrat);
    }

}





let dodaj = () => {

    if (menuRozmiar.value > 0 && menuKolory.value > 0) {
        fetch("game", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    kroki: menuKroki.value,
                    rozmiar: menuRozmiar.value,
                    kolory: menuKolory.value
                })
            })
            .then(res => res.json())
            .then(res => {
                graId = res.gra;
                graRozmiar = res.rozmiar;
                graKolory = res.kolory;
                graKroki = res.kroki;
                document.getElementById('menu').style.display = 'none';
                document.getElementById('gra').style.display = 'block';
                init();
            })



    } else {
        uwaga.textContent = "Niepoprawne dane";
    }
}
btnStart.addEventListener('click', dodaj);



let ocena = () => {
    const ruch = document.querySelectorAll('.kwadrat');
    let licznik = 0;
    const tablica = [];
    ruch.forEach((element) => {
        if (element.dataset.key == -1) {
            ++licznik;
        }
        tablica.push(element.textContent);
    });

    console.log(tablica);

    if (licznik === 0) {
        let div = document.createElement('div');
        div.innerHTML = `krok ${++krok} </br>`;
        ruch.forEach((element) => {
            element.className = 'kwadratP';
            div.appendChild(element);
        });

        let wynik;



        fetch("game/move", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    gra: graId,
                    ruch: tablica,
                })
            })
            .then(res => res.json())
            .then(res => {


                graId = res.gra;
                wynik = res.wynik;
                let rozwiazanie = res.rozwiazanie;

                console.log(wynik);
                if (wynik.czarne == graRozmiar) {
                    gra.style.display = "none";
                    document.getElementById('wygrana').style.display = 'block';
                } else {
                    if (rozwiazanie == 'przegrana') {
                        gra.style.display = "none";
                        document.getElementById('przegrana').style.display = 'block';
                    }
                }
                let wyn = document.createElement('div');
                wyn.textContent = `białe: ${wynik.białe}  czarne: ${wynik.czarne}`
                div.appendChild(wyn);
                init();
            })


        div.className = "krok";
        przebieg.appendChild(div);



    }
}


btnGraj.addEventListener('click', ocena);

document.getElementById('ponownie1').addEventListener('click', () => {
    document.getElementById('przegrana').style.display = 'none';
    document.getElementById('wygrana').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    graId = 0;
    graRozmiar = 0;
    graKolory = 0;
    graKroki = 0;
    krok = 0;

    przebieg.textContent = '';
    document.getElementById('status').textContent = '';
    document.getElementById('gra-ruch').textContent = '';




});

document.getElementById('ponownie2').addEventListener('click', () => {
    document.getElementById('przegrana').style.display = 'none';
    document.getElementById('wygrana').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    graId = 0;
    graRozmiar = 0;
    graKolory = 0;
    graKroki = 0;
    krok = 1;

    przebieg.textContent = '';
    document.getElementById('status').textContent = '';
    document.getElementById('gra-ruch').textContent = '';




});