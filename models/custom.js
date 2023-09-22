const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    firstName : { type : String, required:true },
    lastName : {type : String, required:true, },
    email : {type : String, required:true, unique:true },
    password : {type : String, required:true, unique:true },
    address : {type : String, required:true},
    contact : { type :String, required:true, unique:true},
    token : { type :String, required:true, unique:true},
    createdOn: {type: Date, default: Date.now}

})

const CustomerTable = mongoose.model('CustomerTable', schema)

module.exports = CustomerTable