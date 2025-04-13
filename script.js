// Productos de la tienda con imágenes de muñecos navideños artesanales
const productos = [
  {
    id: 1,
    nombre: "Muñeco de nieve tejido",
    precio: 28000,
    categoria: "muñecos",
    img: "https://i.pinimg.com/originals/9e/1d/77/9e1d77b8a3a8c3e8e3b0e7d8c3a3e3e7.jpg"
  },
  {
    id: 2,
    nombre: "Santa Claus de fieltro",
    precio: 32000,
    categoria: "muñecos",
    img: "https://i.pinimg.com/originals/5a/3d/5e/5a3d5e8b8e3b0e7d8c3a3e3e7d8c3a3e.jpg"
  },
  {
    id: 3,
    nombre: "Reno navideño de tela",
    precio: 30000,
    categoria: "muñecos",
    img: "https://i.pinimg.com/originals/7a/3d/5e/7a3d5e8b8e3b0e7d8c3a3e3e7d8c3a3e.jpg"
  },
  {
    id: 4,
    nombre: "Duende navideño artesanal",
    precio: 27000,
    categoria: "muñecos",
    img: "https://i.pinimg.com/originals/8a/3d/5e/8a3d5e8b8e3b0e7d8c3a3e3e7d8c3a3e.jpg"
  },
  {
    id: 5,
    nombre: "Ángel navideño de trapo",
    precio: 25000,
    categoria: "muñecos",
    img: "https://i.pinimg.com/originals/9a/3d/5e/9a3d5e8b8e3b0e7d8c3a3e3e7d8c3a3e.jpg"
  },
  {
    id: 6,
    nombre: "Familia de muñecos navideños",
    precio: 45000,
    categoria: "muñecos",
    img: "https://i.pinimg.com/originals/6a/3d/5e/6a3d5e8b8e3b0e7d8c3a3e3e7d8c3a3e.jpg"
  },
  {
    id: 7,
    nombre: "Muñeco de jengibre tejido",
    precio: 22000,
    categoria: "muñecos",
    img: "https://i.pinimg.com/originals/5b/3d/5e/5b3d5e8b8e3b0e7d8c3a3e3e7d8c3a3e.jpg"
  },
  {
    id: 8,
    nombre: "Muñecos navideños de ganchillo",
    precio: 38000,
    categoria: "muñecos",
    img: "https://i.pinimg.com/originals/4a/3d/5e/4a3d5e8b8e3b0e7d8c3a3e3e7d8c3a3e.jpg"
  }
];

// Variables globales
let carrito = new Map();
const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const contenedorPayPal = document.getElementById("paypal-button-container");

// Función para filtrar productos por categoría
function filtrarPorCategoria() {
  const seleccion = document.getElementById("categoria").value;
  const productosFiltrados = seleccion === "todos" 
    ? productos 
    : productos.filter(p => p.categoria === seleccion);

  contenedorProductos.innerHTML = "";

  productosFiltrados.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${prod.img}" alt="${prod.nombre}" loading="lazy">
      <h3>${prod.nombre}</h3>
      <p class="precio">$${prod.precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  if (carrito.has(id)) {
    carrito.get(id).cantidad++;
  } else {
    carrito.set(id, { ...producto, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();
  
  // Mostrar notificación
  Toastify({
    text: `${producto.nombre} agregado al carrito`,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "#016A70",
    className: "toast-navidad",
    avatar: producto.img
  }).showToast();
}

// [Resto de las funciones permanecen igual... actualizarCarrito(), eliminarDelCarrito(), etc.]

// Inicialización con evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // Configurar el event listener para el filtro
  document.getElementById('categoria').addEventListener('change', filtrarPorCategoria);
  
  // Inicializar la tienda
  filtrarPorCategoria();
  cargarCarrito();
});
