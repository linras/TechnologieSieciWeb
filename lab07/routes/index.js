//jshint node: true, esversion: 6
'use strict';

exports.index = (par) => {
    return (_, res) => {
        res.render('index', {
            title: 'Express',
            txt: par
        });
    };
};
