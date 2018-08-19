const containerService = require('../services/containerService');

const debug_service = require('debug')('app:controller.container');
const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    debug_service('Request getAll');
    containerService.getAll()
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Server error: ' + err.message);
        });
});

module.exports = router;