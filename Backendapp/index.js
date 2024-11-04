const express = require('express');
const cors = require('cors'); // Importar cors
const Contacto = require('./Modelos/Contacto');
const { where } = require('sequelize');

const app = express();

// Configura CORS para permitir el acceso desde el frontend
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto a la URL del frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

app.use(express.json());

// Ruta para consultar todos los contactos
app.get('/contacto', async (req, res) => {
  try {
    const contacto = await Contacto.findAll();
    res.status(200).json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error' });
  }
});

// Ruta para agregar un contacto
app.post('/contacto', async (req, res) => {
  try {
    console.log(req.body);
    const contacto = await Contacto.create(req.body);
    res.status(200).json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error: ' + error });
  }
});

// Ruta para actualizar un contacto
app.put('/contacto/:id', async (req, res) => {
  try {
    const [updated] = await Contacto.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      res.status(200).json({ mensaje: 'Actualizado correctamente' });
    } else {
      res.status(400).json({ mensaje: 'No se actualizo' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error: ' + error });
  }
});

// Ruta para eliminar un contacto
app.delete('/contacto/:id', async (req, res) => {
  try {
    const deleted = await Contacto.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Contacto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar Contacto' });
  }
});

app.listen(5000, () => {
  console.log('Aplicación ejecutando en puerto 5000');
});
