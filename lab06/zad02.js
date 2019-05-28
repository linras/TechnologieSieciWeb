/* jshint strict: global, esversion: 6, devel: true, node:true */
'use strict';

const fun1 = (txt, cb1) => {
    setTimeout(() => {
        return cb1(txt);
    }, Math.random() * 1000);
};

const fun2 = (txt, cb2) => {
    setTimeout(() => {
        return cb2(txt);
    }, Math.random() * 1000);
};

const cb = (txt) => {
    console.log(txt);
}

const razem = (fun1, fun2, cb) => {

    let tab = [];

    fun1("fun1", (element) => {
        tab.push(element);
        if (tab.length === 2) {
            cb(tab);
        }
    });

    fun2("fun2", (element) => {
        tab.push(element);
        if (tab.length === 2) {
            cb(tab);
        }
    });
}

razem(fun1, fun2, cb);


//poKolei(fun1('napis'), fun2(4), (dane))

// poKolei(fun1('napis'), (dane) =>{
//   console.log('mam: ${dane}');
//   poKolei(fun2(7), (dane) =>{
//     console.log('dane drugie: ${dane}');
//   });
// });