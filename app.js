require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir los archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Definir esquema y modelo de compra
const compraSchema = new mongoose.Schema({
    productos: [{
        nombre: String,
        precio: Number,
        idProducto: String // ID de producto en Stripe
    }]
});
const Compra = mongoose.model('Compra', compraSchema);

// Ruta para procesar la compra y realizar el pago en Stripe
app.post('/comprar', async (req, res) => {
    try {
        const { productosEnCarrito } = req.body;

        // Crear una compra en la base de datos
        const nuevaCompra = new Compra({ productos: productosEnCarrito });
        await nuevaCompra.save();

        // Crear una lista de ítems para el pago en Stripe
        const items = productosEnCarrito.map(producto => ({
            price_data: {
                currency: 'mxn',
                product_data: {
                    name: producto.nombre,
                },
                unit_amount: producto.precio * 100, // Precio en centavos
            },
            quantity: 1,
        }));

        // Crear una sesión de checkout en Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: 'payment',
            success_url: 'https://beastgadgets.onrender.com/pago-exitoso.html', // URL de éxito
            cancel_url:  'https://beastgadgets.onrender.com/carrito.html' // URL de cancelación
        });

        // Enviar el ID de sesión al frontend para redireccionar al checkout de Stripe
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).json({ error: 'Error al procesar la compra' });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});