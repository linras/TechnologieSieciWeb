/* jshint strict: global, esversion: 6, devel: true */
'use strict';

function multiply(p1, p2) {
    return p1 * p2;  
  }
  var defFun = function (fun, types) {
    fun.typeConstr = types;
    return fun;
  };
  
  var testFun = defFun(function (a, b) {
    return a + b;
  }, ['number', 'number']);
  
  // console.log(testFun);
  // console.log(testFun(2, 3));
  //console.log(testFun.typeConstr);
  //
  // console.log("\n////////////////////////\n");
  
  var appFun = function (f) {
    if (f.typeConstr === 'undefined') {
      throw({ typerr: "typeConstr niezdefiniowany" });
    }
    // rozwiazanie ze slice:
    // let args = Array.prototype.slice.call(arguments, 1);
    // for (let i = 0; i < args.length; i++) {
    //   if (typeof args[i] !== f.typeConstr[i]) {
    //     let errorMsg = "Type of arg" + i + " ('" + typeof args[i] + "')" +
    //       " does not match typeConstr[" + i + "] ('" + f.typeConstr[i] + "')";
    //     throw({ typerr: errorMsg });
    //   }
    // }
  
    // using basic Array operations
  
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
      if (typeof arguments[i] !== f.typeConstr[i-1]) {
        let errorMsg = "Type of arg" + (i-1) + " ('" + typeof arguments[i] + "')" +
          " does not match typeConstr[" + (i-1) + "] ('" + f.typeConstr[i-1] + "')";
        throw({ typerr: errorMsg });
      }
      args.push(arguments[i]);
    }
    return f.apply(this, args);
  };
  
  try {
    console.log(appFun(testFun, 2, "3"));
  } catch (e) {
    console.log(e.typerr);
  }

  try {
    console.log(multiply(3, 4));
    } catch (e) {
        console.log(e.typerr);
    }
