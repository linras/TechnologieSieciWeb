/* jshint strict: global, esversion: 6, devel: true */
'use strict';

let m = new Map();
m.set(1, new Set([1]));
m.set(2, new Set([1,2]));

console.log(m);
console.log(m.get(1));
console.log(m.has(1));


function mastermind(kod, ruch){
  let czarne = 0;
  kod.forEach((element, index) => {
    //console.log(element);
    if(element===ruch[index]){
      czarne++;
    }

  });
  return czarne;
}

const toMap = (tab) => {
  //zwraca repr kodu/ruchu
  //inicjujemy odwzorowanie m: Map[Int, Set[indeks]]
  tab.array.forEach((element, index) => {
    if(!m.has(element)){
      m.set(index, new Set());
    }
    m.set(index, new Set(element));
  });
};

console.log(m.toMap);
console.log(mastermind([2,2, 4], [2,3, 4]));