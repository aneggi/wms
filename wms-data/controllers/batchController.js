
const batchService = require('../services/BatchService');

const debug_service = require('debug')('app:controller.batch');
const express = require('express');
const router = express.Router();



router.get('/', (req,res) => {
    debug_service('Request getAll');
    batchService.getAll()
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Server error: ' + err.message);
        });
});

router.post('/', (req,res) => {
    debug_service('Request POST, res.body : ' + req.body);
    
    batchService.createBatch(req.body)
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Create error: ' + err.message);
        });
});

module.exports = router;