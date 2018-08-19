process.env.DEBUG='app:*'; //app:http ecc per vedere solo uno

//const mongoose = require('mongoose');
const debug_app = require('debug')('app:main');
const PORT = process.env.PORT | 3010;

const express = require('express');
const app = express();
const container = require('./controllers/containerController');
const batch = require('./controllers/batchController');

app.use(express.json());
app.use('/api/container', container);
app.use('/api/batch', batch);
//app.use(express.static('public'));

app.get('/', (req,res) => {
    debug_app('Request main page...');
    let result = 'WMS-Data v0.1 are listening on port : ' ;
    res.send(result);
});

app.listen(PORT, () => {
    console.log('WMS-Data v0.1 are listening on port : ' + PORT);
    debug_app('Listening on port: '+ PORT);
});