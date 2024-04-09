function agregarCarrito(nombre, precio) {
    var producto = { nombre: nombre, precio: precio };
    
    // Recuperar los productos del almacenamiento local o inicializar un array vacío si no hay ninguno
    var productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
    
    // Agregar el nuevo producto al array
    productosEnCarrito.push(producto);
    
    console.log('Productos en el carrito:', productosEnCarrito); // Agregar este registro de consola
    
    // Guardar el array actualizado en el almacenamiento local
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
    
    window.alert("Producto agregado al carrito!");
    // Redirigir al usuario a la página del carrito
    window.location.href = "carrito.html";

    console.log('Productos en el carrito:', productosEnCarrito); // Agregar este registro de consola
}





document.addEventListener("DOMContentLoaded", function() {
    // Recuperar los productos del almacenamiento local
    var productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
    var carritoElement = document.getElementById("carrito");
    var totalAmountElement = document.getElementById("totalAmount");
    var vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    
    // Mostrar los productos en el carrito
    mostrarProductosEnCarrito(productosEnCarrito);

    // Agregar event listener para el botón de vaciar carrito
    vaciarCarritoBtn.addEventListener("click", function() {
        // Vaciar el carrito (eliminar los productos del almacenamiento local)
        localStorage.removeItem("productosEnCarrito");
        
        // Limpiar la lista de productos en el carrito
        carritoElement.innerHTML = "";

        // Reiniciar el total a pagar a 0
        totalAmountElement.textContent = "0";
    });
});

function mostrarProductosEnCarrito(productosEnCarrito) {
    var carritoElement = document.getElementById("carrito");
    var totalAmountElement = document.getElementById("totalAmount");
    
    // Limpiar la lista de productos en el carrito antes de agregar los nuevos productos
    carritoElement.innerHTML = "";

    var totalAmount = 0;

    // Mostrar los productos en el carrito y calcular el total a pagar
    productosEnCarrito.forEach(function(producto) {
        var listItem = document.createElement("li");
        listItem.textContent = producto.nombre + ": $" + producto.precio;
        carritoElement.appendChild(listItem);
        
        totalAmount += producto.precio; // Sumar el precio del producto al total
    });

    // Mostrar el total a pagar
    totalAmountElement.textContent = totalAmount;
    console.log('Productos en el carrito:', productosEnCarrito); // Agregar este registro de consola
}


function comprarCarrito() {
    // Obtener productos en el carrito del almacenamiento local
    const productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
    
    
    
    // Enviar la información del carrito al servidor
    fetch('/guardarCompra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productosEnCarrito: productosEnCarrito })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al enviar la compra');
    })
    .then(data => {
        // Redirigir al usuario a la página de éxito
        window.location.href = 'pago-exitoso.html';
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    });
}
