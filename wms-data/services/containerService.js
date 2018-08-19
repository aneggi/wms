const dbContext = require('../storage/dbcontext');
mongoose = dbContext.getConnection();

const debug_controller = require('debug')('app:service.container');

function ContainerService() {



    this.getAll = async function () {
        debug_controller('Request getAll');
        return await dbContext.Container
            .find();
            

    }

}
module.exports = new ContainerService();

