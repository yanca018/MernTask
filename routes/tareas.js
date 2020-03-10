const express = require('express');
const router = express.Router();
const tareaController  = require('../controllers/tareaController');
const auth = require('../middleware/auth') ; 
const {check} = require('express-validator') ; 


// Crea tareas 
// api/tareas 
router.post('/' , 
   auth ,
   [
       check('nombre' , 'El nombre de la tarea es obligatorio').not().isEmpty() , 
       check('proyecto' , 'El Proyecto es obligatorio').not().isEmpty()
   ],
   tareaController.crearTarea
)

// obtener todos los proyectos de  un usuario
router.get('/' , 
   auth ,
   tareaController.obtenerTareas
)
// actualizar tarea via ID
router.put('/:id' , 
   auth ,
   tareaController.actualizarTarea
)
//Elimina una tarea  por su id
router.delete('/:id' , 
   auth ,
   tareaController.eliminarTarea 
)


module.exports = router ; 
