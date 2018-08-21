const mongoose = require('mongoose');
const debug_db = require('debug')('app:db');

const connectionString = 'mongodb://localhost/wms-data';

// ----------------------- SCHEMA -------------------------------
const containerSchema = new mongoose.Schema({
    SSCC : { type: String, required: true},
    DataCreation : { type: Date, default: Date.now},
    isPartial: {type: Boolean, default : false},
    containerItems: [
        {   // denormalization -> performance
            boxCode : String,
            unityQty: Number,
            _productBatch : { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }  //String , //da verificare*********************GUID - normalization -> consisenty
        }
    ]
});
const batchSchema = new mongoose.Schema({
    code: String,
    productionData: Date,
    expireData : Date,
    productCode: String,
    productDescription: String,
    status: { type: String, default: 'locked', enum: ['locked','ready','waiting'] },
    qtyPerBox: Number,
    unitOfMeasurement: String
});
exports.Container = mongoose.model('container', containerSchema);
exports.Batch = mongoose.model('batch', batchSchema);


// --------------------- DB -------------------------
exports.getConnection = function() {
    if (mongoose.connection.readyState) return mongoose;

    mongoose.connect(connectionString)
        .then(() => {
                debug_db('Connected to MongoDB...');
                return mongoose;
        }).catch((err) => {
            debug_db(`Could not connect to MongoDB, error:[${err}]...`)
            console.log('Could not connect to Database...')
            throw new Error('Could not connect to MongoDB, error:[${err}]...')

        });
}

exports.close = function (){
    mongoose.connection.close();
}