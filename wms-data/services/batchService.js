const dbContext = require('../storage/dbcontext');
mongoose = dbContext.getConnection();
const debug_controller = require('debug')('app:service.batch');

function BatchService() {
    this.getAll = async function () {
        debug_controller('Request getAll');
        return await dbContext.Batch
            .find();
    }
    this.createBatch = async function (body) {

        // check if already exist=?

        const _batch = new dbContext.Batch({
            code: body.code ,
            productionData : body.productionData ,
            expireData : body.expireData ,
            productCode: body.productCode,
            productDescription: body.productDescription,
            status: body.status,
            qtyPerBox: body.qtyPerBox,
            unitOfMeasurement: body.unitOfMeasurement
        });

        
        return await _batch.save();
    }

    this.getById = async function (id) {
        debug_controller('Request getById: ' + id );
        return await dbContext.Batch
            .findOne({_id: id });
    }
    this.getByCode = async function (code) {
        debug_controller('Request getById: ' + code );
        return await dbContext.Batch
            .find({code: code });
    }
    this.getByProductCode = async function (_productCode) {
        debug_controller('Request getByProduct: ' + _productCode );
        return await dbContext.Batch
            .find({productCode: _productCode });
    }
    this.unblock = async function (id) {
        debug_controller('Request unlock: ' + id );
        const _batch = await dbContext.Batch
            .findOne({_id: id });
        debug_controller('Find batch: ' + _batch );
        if(!_batch) return ;
        _batch.status = 'ready';            
        return await _batch.save();

    }
    this.block = async function (id) {
        debug_controller('Request Block: ' + id );
        const _batch = await dbContext.Batch
            .findOne({_id: id });
        debug_controller('Find batch: ' + _batch );
        if(!_batch) return ;
        _batch.status = 'block';            
        return await _batch.save();

    }


}
module.exports = new BatchService();

