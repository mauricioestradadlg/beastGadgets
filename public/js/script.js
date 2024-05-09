function agregarCarrito(nombre, precio, productId) {
    var producto = { nombre: nombre, precio: precio, productId: productId};
    
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
    
     
     // Modificar el objeto que se envía al servidor para incluir el ID de producto
     const productosParaEnviar = productosEnCarrito.map(producto => ({
         nombre: producto.nombre,
         precio: producto.precio,
         id: producto.id // Agregar el ID de producto
     }));
    
    
    
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
         // Agregar event listener para el botón de vaciar carrito


        // Vaciar el carrito (eliminar los productos del almacenamiento local)
        localStorage.removeItem("productosEnCarrito");
        
        // Limpiar la lista de productos en el carrito
        carritoElement.innerHTML = "";

        // Reiniciar el total a pagar a 0
        totalAmountElement.textContent = "0";
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    });
}


document.addEventListener("DOMContentLoaded", function() {
    // Manejar clic en el botón de compra
    document.getElementById("comprarCarrito").addEventListener("click", async function() {
        const productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

        // Enviar los productos al servidor para procesar la compra en Stripe
        const response = await fetch('/comprar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productosEnCarrito })
        });

        const { id } = await response.json();

        // Redireccionar al checkout de Stripe
        const stripe = Stripe('pk_test_51OpYfERqLhXyfZHFeE0ReyNR2mNsAGQK0hfgiPiypxgp4nDk1BMCmvlXfn86OkbVV7dsBJjV3CYFTfJt3Jo3mbgJ00zQeHtM7Y');
        stripe.redirectToCheckout({ sessionId: id });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Mostrar la animación de carga al navegar
    const loader = document.getElementById("loader");
    loader.style.display = "block";
  
    // Ocultar la animación de carga después de un retraso
    window.addEventListener("load", function() {
      setTimeout(function() {
        loader.style.display = "none";
      }, 1000); // Retraso de 3 segundos (igual a la duración de la animación)
    });
  });
  
