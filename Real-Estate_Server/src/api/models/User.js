const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema;

const user_schema = new Schema({


    user_name:{
        type:String,
        required: true,
        unique: true
    },

    user_email:{
        type:String,
        unique: true,
        lowercase: true,
        required: true
    },

    user_password:{
        type:String,
        required: true
    },
    user_password_confirm: {
        type: String,
        required: true
      },

    user_phone : {
        type:String,
        match:/^([0]\d{1,3}[-])?\d{7,10}$/
    },


    user_address : {

        city :{
            type: String,
            trim:true
        }
        ,
        street: {
            type: String,
            trim:true
        },

        building: {
            type: String,
            trim:true
        },

        apartment: {
            type: String,
            trim:true
        },


    },

    user_orders : [
        {
            order : {
                type:mongoose.Types.ObjectId,
                ref:'orders'
            }
        }
    ],

    tokens: [{ type: Object }],
    
    verify_token:{
        type: String,
    }

})


user_schema.pre('save', async function(next){

    const hash = await bcrypt.hash(this.user_password, 15);
    this.user_password = hash;
    next();
})


module.exports = mongoose.model('users', user_schema)