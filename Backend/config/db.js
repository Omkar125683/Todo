const mongoose = require('mongoose');
require('dotenv').config()
const dbconn = async()=>{
    try {
            await mongoose.connect(process.env.DATABASE_URL)
            console.log('database connect sucessfully');
    } catch (error) {
        console.log(error)
    }
}
module.exports = dbconn