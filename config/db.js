const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => { 
    try {
        //se conecta ala url del archivo env
        await  mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true , 
            useUnifiedTopology:true , 
            useFindAndModify : false
        });
        console.log('conectado!!');
        
    } catch (error) {
      console.log(error);
      process.exit(1); // Detiene la app en caso de error
    }
};

module.exports = conectarDB ; 