/* jshint strict: global, esversion: 6, devel: true, node:true */
'use strict';

/* jshint strict: global, esversion: 6, devel: true, node:true */
'use strict';

const fun1 = (txt, cb1) => {
    setTimeout(() => {
        return cb1(txt + " fun1 ");
    }, Math.random() * 1000);
};

const fun2 = (txt, cb2) => {
    setTimeout(() => {
        return cb2(txt + " fun2 ");
    }, Math.random() * 1000);
};

const cb = (txt) => {
    console.log(txt);
}


const poKoleiTab = (tabFunkcji, cb) => {
    let pomoc = "main";
    const main = (index) => {
        tabFunkcji[index](pomoc, (e) => {
            pomoc = e;
            if (index === tabFunkcji.length - 1) {
                cb(e);
            } else {
                main(index + 1);
            }
        });
    };
    main(0);
};



poKoleiTab([fun1, fun2, fun1], cb);