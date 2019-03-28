/* jshint strict: global, esversion: 6, devel: true, node:true */
'use strict';

const fun1 = (cb) => {
  //zeby setTimeout sie nie podkreslal set node:tue
  setTimeout(() =>{
    console.log('jestew w fun1');
    cb(123);
  }, Math.random()*1000);
};

const fun2 = (arg, cb) => {
  setTimeout(() =>{
    console.log('jestew w fun2');
    cb(74);
  }, Math.random()*1000);
};


const poKolei = (f1, f2, cb) =>{
  //wynik to wynik f1
  f1((wynik)=>{
    f2(wynik, (wynik2)=>{
      cb(wynik2);
    });
  });
};

poKolei(fun1, fun2, (wynik2)=>{
  console.log(wynik2);
});


//poKolei(fun1('napis'), fun2(4), (dane))

// poKolei(fun1('napis'), (dane) =>{
//   console.log('mam: ${dane}');
//   poKolei(fun2(7), (dane) =>{
//     console.log('dane drugie: ${dane}');
//   });
// });