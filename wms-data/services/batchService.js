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

}
module.exports = new BatchService();

