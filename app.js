
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');



const app = express();
const PORT = process.env.PORT || 3000; // Usamos el puerto proporcionado por Render o 3000 por defecto





// Conexión a la base de datos MongoDB Atlas
const mongoURI = 'mongodb+srv://miUsuario:miContraseña@micluster.swcrigj.mongodb.net/?retryWrites=true&w=majority&appName=miCluster';// Lee la cadena de conexión de la variable de entorno


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

        
        // Redirigir al usuario a una página de éxito o mostrar un mensaje de éxito
        res.send('¡Formulario enviado correctamente!');
        

        // Redirigir al usuario a una página de éxito
        
        res.redirect('/exito.html'); // Cambiar a la ruta de tu página de éxito
    } 
    catch (error) {
        console.error('Error al enviar el formulario:', error);
        res.status(500).send('Error al enviar el formulario');
    }
});


//Transacciones

app.use(express.json()); // Middleware para analizar JSON

const compraSchema = new mongoose.Schema({
    productos: [{
        nombre: String,
        precio: Number,
    }]
});

const Compra = mongoose.model('Compra', compraSchema);

app.post('/guardarCompra', async (req, res) => {
    try {
        const { productosEnCarrito } = req.body;

        // Guardar la compra en la colección Compra
        await Compra.create({ productos: productosEnCarrito });
        
        console.log('Compra registrada en la base de datos');
        res.json({ message: 'Compra registrada exitosamente' });
    } catch (error) {
        console.error('Error al guardar la compra:', error);
        res.status(500).json({ error: 'Error al procesar la compra' });
    }
});




// Servir los archivos estáticos desde la carpeta public
app.use(express.static('public'));



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});