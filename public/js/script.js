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
}

function carrito() {
    const productsElement = document.getElementById("carrito");
    
    productos.forEach(producto => {
        const listItem = document.createElement("li");
        listItem.textContent = `${producto.nombre}: ${producto.precio}`;
        productsElement.appendChild(listItem);
    });
}


