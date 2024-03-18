const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const category_schema = new Schema({

    category_name: {
        type:String,
        required:true
    }
})



module.exports = mongoose.model('categories', category_schema)