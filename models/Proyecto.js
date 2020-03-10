const mongoose = require('mongoose') ; 

const proyectoSchema = mongoose.Schema({
    nombre : { 
        type: String , 
        require:true , 
        trim : true 
    }, 
    creador : { 
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Usuario'
    } , 
    creado : { 
        type : Date , 
        default : Date.now()
    } 
});

module.exports = mongoose.model('Proyecto' , proyectoSchema);