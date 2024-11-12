const mongoose = require('mongoose');
require('dotenv').config();


const connection = async() =>{

    let url = process.env.MONGO_URI

    try {
        
        await mongoose.connect(url,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            /* useCreateIndex: true, */
       
        });

        console.log("mongoose connected to DB");

    } catch (error) {
        console.log(error);
    }
};


module.exports = connection;