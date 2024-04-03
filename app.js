
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000; // Usamos el puerto proporcionado por Render o 3000 por defecto

// Conexión a la base de datos MongoDB Atlas
const mongoURI = process.env.MONGODB_URI; // Lee la cadena de conexión de la variable de entorno


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});


// Definir el esquema del cliente
const userBeastGadgets = new mongoose.Schema({
    nombre: String,
    correo: String,
    mensaje: String
});


// Definir el modelo de Usuario
const Usuario = mongoose.model('Usuario', userBeastGadgets); // Agrega esta línea para definir el modelo Usuario



// Middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));


// Manejar la solicitud para registrar un nuevo usuario
app.post('/formulario-beastGadgets', async (req, res) => {
    try {
        const { nombre, correo, mensaje } = req.body;

        // Crear un nuevo usuario
        const newUser = new Usuario({
            nombre,
            correo,
            mensaje
        });

        // Guardar el usuario en la base de datos
        await newUser.save();
        console.log('Formulario enviado correctamente');

        /*
        // Redirigir al usuario a una página de éxito o mostrar un mensaje de éxito
        res.send('¡Formulario enviado correctamente!');
        */

        // Redirigir al usuario a una página de éxito
        res.redirect('/exito.html'); // Cambiar a la ruta de tu página de éxito
    } 
    catch (error) {
        console.error('Error al enviar el formulario:', error);
        res.status(500).send('Error al enviar el formulario');
    }
});


// Servir los archivos estáticos desde la carpeta public
app.use(express.static('public'));

app.use(express.json()); // Middleware para analizar JSON

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});