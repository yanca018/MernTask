const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
	// Revisar si hay errores
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errores: errors.array() });
	}

	try {
		// Extraer el proyecto y comprobar si existe
		const { proyecto } = req.body;
		const existeProyecto = await Proyecto.findById(proyecto);
		if (!existeProyecto) {
			return res.status(404).json({ msg: 'Proyecto no encontrado' });
		}
		// Revisar si el proyecto actual pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No Autorizado!!' });
		}
		// Creamos la tarea
		const tarea = new Tarea(req.body);
		await tarea.save();
		res.json({ tarea });
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

// obtiene todas las tareas  de un proyecto
exports.obtenerTareas = async (req, res) => {
	try {
		// Extraer el proyecto y comprobar si existe
		const { proyecto } = req.query;
		const existeProyecto = await Proyecto.findById(proyecto);
		if (!existeProyecto) {
			return res.status(404).json({ msg: 'Proyecto no encontrado' });
		}
		// Revisar si el proyecto actual pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No Autorizado!!' });
		}
		//obtener las tareas por proyecto
		const tareas = await Tarea.find({ proyecto }).sort({creado: -1});
		res.json({ tareas });
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

//actualiza una tarea  en especifico
exports.actualizarTarea = async (req, res) => {
	// Revisar si hay errores
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errores: errors.array() });
	}

	try {
		// Extraer el proyecto y comprobar si existe
		const { proyecto, nombre, estado } = req.body;

		//Si la tarea existe o no
		let tarea = await Tarea.findById(req.params.id);

		if(!tarea){
			return res.status(404).json({ msg: 'No existe esa tarea' });
		}

		//extraer proyecto
		const existeProyecto = await Proyecto.findById(proyecto);
		if (!existeProyecto) {
			return res.status(404).json({ msg: 'Proyecto no encontrado' });
		}
		// Revisar si el proyecto actual pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No Autorizado!!' });
		}
		//crear un objeto con la nueva información
		const nuevaTarea = {};
		nuevaTarea.nombre = nombre;
		nuevaTarea.estado = estado;
		// guardar la tarea 
		tarea = await Tarea.findOneAndUpdate({_id:req.params.id},nuevaTarea , {new:true});
		res.json({tarea});

	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error en el servidor');
	}
};

//Elimina una tarea por su id
exports.eliminarTarea = async (req, res) => {
	try {
		// Extraer el proyecto y comprobar si existe
		const { proyecto} = req.query;

		//Si la tarea existe o no
		let tarea = await Tarea.findById(req.params.id);

		if(!tarea){
			return res.status(404).json({ msg: 'No existe esa tarea' });
		}

		//extraer proyecto
		const existeProyecto = await Proyecto.findById(proyecto);
		console.log(existeProyecto);
		
		// Revisar si el proyecto actual pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No Autorizado!!' });
		}
		
		//eliminar tarea por id 
		await Tarea.findOneAndRemove({_id:req.params.id})
		res.json({msg:'Tarea Eliminada'}) ; 

	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error en el servidor');
	}
};
