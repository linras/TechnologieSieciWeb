/* jshint strict: global, esversion: 6, devel: true, node:true */
'use strict';

const fun1 = (txt, cb1) => {
    setTimeout(() => {
        return cb1(txt + " fun1 ");
    }, Math.random * 1000);
};

const fun2 = (txt, cb2) => {
    setTimeout(() => {
        return cb2(txt + " fun2 ");
    }, Math.random * 1000);
};

const cb = (txt) => {
    console.log(txt);
};


const razem = (tabFun, cb) => {
    let tablica = [];
    tabFun.forEach((element, index) => {
        element(index, (x) => {
            tablica.push(x)
            if (tablica.length === tabFun.length) {
                cb(tablica);
            }
        });
    });

}


razem([fun1, fun2, fun1, fun2, fun2], cb);