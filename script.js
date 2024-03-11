class Product {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}



const productos = [];


function agregarCarrito(name, price) {

    var producto = new Product(name, price);
    productos.push(producto);

    window.alert("Producto agregado al carrito!");
    console.log(productos);

    carrito();

}


function carrito() {
    const productsElement = document.getElementById("carrito");
    
    let total = 0; // Variable para almacenar el total del precio a pagar

    // Limpiar la lista antes de volver a mostrar
    productsElement.innerHTML = "";

    productos.forEach(producto => {
        const listItem = document.createElement("li");
        listItem.textContent = `${producto.nombre}: ${producto.precio}`;
        productsElement.appendChild(listItem);

         // Sumar el precio del producto al total
         total += parseFloat(producto.precio.slice(1)); // Elimina el signo $ y convierte el precio a número
    });

    // Mostrar el total en la página HTML
    const totalElement = document.getElementById("total");
    totalElement.textContent = total.toFixed(2); // Mostrar el total con 2 decimales
}

function vaciarCarrito(){

    productos.length = 0;
    const productsElement = document.getElementById("carrito");
    productsElement.innerHTML = "";

    // Actualizar el total a cero
    const totalElement = document.getElementById("total");
    totalElement.textContent = "0.00";
    

}






// Aquí se mantiene el código que maneja el carrito de compras y su funcionalidad

function mostrarMetodoPago() {
    const metodoPago = document.getElementById("metodo-pago");
    metodoPago.style.display = "block";
}

function continuarCompra() {
    const metodoPago = document.querySelector('input[name="metodo"]:checked');
    
    if (metodoPago) {
        const metodoSeleccionado = metodoPago.value;
        console.log(`Se ha seleccionado el método de pago: ${metodoSeleccionado}`);
        // Aquí puedes agregar cualquier lógica adicional, como redirigir al usuario a una página de confirmación.
    } else {
        window.alert("Por favor selecciona un método de pago antes de continuar.");
    }
}



function cancelarCompra() {
    const metodoPago = document.getElementById("metodo-pago");
    metodoPago.style.display = "none";
}