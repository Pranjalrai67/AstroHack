require('dotenv').config()
const mongoose = require('mongoose')


const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to db")
    }
    catch(error){
        console.error("MondoDB connection failed: ", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;