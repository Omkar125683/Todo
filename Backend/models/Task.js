const mongoose = require('mongoose')

const Taskschema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    status: { 
        type: String,
        require:true,
    },
    dueDate: { 
        type: Date, 
        require:true,
     }
})

module.exports = mongoose.model('Task ', Taskschema);