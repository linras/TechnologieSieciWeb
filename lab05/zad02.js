/* jshint strict: global, esversion: 6, devel: true */
'use strict';


let tekst = 'Ala i As poszli w las';
//proto
String.nbsp = function() {

  return this;
}

console.log(tekst.nbsp());