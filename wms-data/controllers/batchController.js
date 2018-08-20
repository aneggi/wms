
const batchService = require('../services/BatchService');

const debug_controller = require('debug')('app:controller.batch');
const express = require('express');
const router = express.Router();



router.get('/', (req,res) => {
    debug_controller('Request getAll');
    batchService.getAll()
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Server error: ' + err.message);
        });
});

router.get('/:id', (req,res) => {
    debug_controller('Request getById: '+ req.params.id);
    batchService.getById(req.params.id)
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Server error: ' + err.message);
        });
});

router.get('/unlock/:id', (req,res) => {
    debug_controller('Request unlock: '+ req.params.id);
    batchService.unblock(req.params.id)
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Server error: ' + err.message);
        });
});

router.get('/block/:id', (req,res) => {
    debug_controller('Request block: '+ req.params.id);
    batchService.block(req.params.id)
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Server error: ' + err.message);
        });
});

router.get('/byCode/:code', (req,res) => {
    debug_controller('Request getByCode: '+ req.params.code);
    batchService.getByCode(req.params.code)
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Server error: ' + err.message);
        });
});

router.get('/byProductCode/:productCode', (req,res) => {
    debug_controller('Request getByproductCode: '+ req.params.productCode);
    batchService.getByProductCode(req.params.productCode)
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Server error: ' + err.message);
        });
});

router.post('/', (req,res) => {
    debug_controller('Request POST, res.body : ' + req.body);
    
    batchService.createBatch(req.body)
        .then ((result) => {
            res.send(result);
        }).catch((err) => {
            return res.status(400).send('Create error: ' + err.message);
        });
});

module.exports = router;