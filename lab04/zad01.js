/* jshint strict: global, esversion: 6, devel: true */
'use strict';

function multiply(p1, p2) {
    return p1 * p2;  
  }
function defFun(fun, types){
    fun.typeConstr = types;
    return fun;
}
function defFun(){}

    //console.log(defFun(multiply(2,3), ['number','number']));
  //const myfun = defFun((a, b) => a + b, ['number', 'number']);

  try {
    console.log(multiply(3, 4));
} catch (e) {
    console.log(e.typerr);
}

var appFun = function (f) {

    //let args = [];
    //for (let i = 1; i < arguments.length; i++) {}
}