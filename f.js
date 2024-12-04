// Inicializamos el carrito como un array vacío
let cart = [];
let totalPrice = 0;

// Seleccionamos los botones de "Add to Cart" y agregamos un evento a cada uno
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Seleccionamos los elementos donde vamos a mostrar los productos y el precio total
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Función para agregar producto al carrito
function addToCart(event) {
    const button = event.target;
    const productItem = button.closest('.product-item');

    // Obtenemos la información del producto del dataset del elemento HTML
    const productId = productItem.dataset.id;
    const productName = productItem.dataset.name;
    const productPrice = parseFloat(productItem.dataset.price);

    // Buscamos si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // Si ya está, solo aumentamos la cantidad
        existingProduct.quantity += 1;
    } else {
        // Si no está, lo agregamos al carrito
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    // Actualizamos el precio total
    totalPrice += productPrice;

    // Actualizamos la interfaz
    updateCartDisplay();
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    // Limpiamos el contenedor de productos del carrito
    cartItemsContainer.innerHTML = '';

    // Recorremos el carrito y mostramos cada producto
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsContainer.appendChild(li);
    });

    // Actualizamos el precio total en la interfaz
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Añadimos los event listeners a cada botón de agregar al carrito
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Seleccionar todas las tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtener la categoría seleccionada
            const category = button.getAttribute('data-category');

            // Eliminar la clase "active" de todos los botones y añadirla solo al seleccionado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Mostrar/Ocultar productos basados en la categoría seleccionada
            productCards.forEach(card => {
                // Si la categoría es "all", mostrar todos los productos
                if (category === 'all') {
                    card.style.display = 'block'; // Mostrar todas las tarjetas
                } else {
                    // Mostrar solo los productos de la categoría seleccionada, ocultar los demás
                    if (card.classList.contains(category)) {
                        card.style.display = 'block'; // Mostrar tarjeta de la categoría
                    } else {
                        card.style.display = 'none'; // Ocultar tarjeta de otras categorías
                    }
                }
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los productos
    const productCards = document.querySelectorAll('.product-card');

    // Obtener el modal y sus elementos
    const modal = document.getElementById("product-modal");
    const closeModal = document.querySelector(".close");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalPrice = document.getElementById("modal-price");
    const modalDescription = document.getElementById("modal-description");

    // Añadir evento click a cada producto
    productCards.forEach(card => {
        card.addEventListener("click", function () {
            // Obtener información del producto clicado
            const productImage = this.querySelector(".product-image").src;
            const productName = this.querySelector(".product-name").textContent;
            const productPrice = this.querySelector(".product-price").textContent;
            
            // Actualizar el contenido del modal con los datos del producto
            modalImage.src = productImage;
            modalName.textContent = productName;
            modalPrice.textContent = productPrice;
            modalDescription.textContent = "Descripción del producto: breve descripción aquí"; // Puedes personalizar esto.

            // Mostrar el modal
            modal.style.display = "block";
        });
    });

    // Cerrar el modal cuando se haga clic en la 'X'
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar el modal si el usuario hace clic fuera de la ventana del modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.page-section');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
    document.getElementById(seccionId).style.display = 'block';
}
// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} agregado al carrito`);
}

// Función para mostrar productos en el carrito
function mostrarCarrito() {
    console.log('Productos en el carrito:', carrito);
}

// Asignar eventos de click a los botones de agregar al carrito
document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.add-to-cart');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const producto = boton.closest('.product-card');
            const nombre = producto.querySelector('.product-name').textContent;
            const precio = producto.querySelector('.product-price').textContent;
            agregarAlCarrito(nombre, precio);
        });
    });

    mostrarCarrito(); // Mostrar el carrito al cargar la página
});
function cargarSeccion(seccionId) {
    document.querySelectorAll('.page-section').forEach(seccion => {
        seccion.style.display = 'none';
    });
    document.getElementById(seccionId).style.display = 'block';
}

// Enlazar eventos a los elementos de navegación
document.querySelectorAll('nav a').forEach(enlace => {
    enlace.addEventListener('click', (event) => {
        const href = enlace.getAttribute('href');
        if (href.startsWith('#')) { // Solo prevenir el comportamiento si el enlace es interno
            event.preventDefault();
            const seccionId = href.substring(1); // Quitar el # del id
            cargarSeccion(seccionId);
        }
    });
});

 // Esperar a que el documento esté completamente cargado
 document.addEventListener("DOMContentLoaded", function() {
    // Obtener todos los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Obtener todos los productos
    const products = document.querySelectorAll('.product-card');

    // Añadir evento a cada botón de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener la categoría del botón que fue clickeado
            const category = this.dataset.category;

            // Mostrar todos los productos si la categoría es 'all'
            products.forEach(product => {
                // Si la categoría es 'all', mostrar todos los productos
                if (category === 'all') {
                    product.style.display = 'block';
                } else {
                    // Si el producto pertenece a la categoría, mostrarlo
                    if (product.classList.contains(category.toLowerCase())) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none'; // Ocultar productos que no coinciden
                    }
                }
            });

            // Remover la clase activa de todos los botones y agregarla al botón clickeado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
// Obtener todos los elementos con la clase "product-image"
const productImages = document.querySelectorAll('.product-image');

// Función para abrir el modal y cambiar los datos
productImages.forEach((img) => {
img.addEventListener('click', function () {
// Obtener los datos del producto desde los atributos "data-"
const productName = img.getAttribute('data-name');
const productPrice = img.getAttribute('data-price');
const productDescription = img.getAttribute('data-description');
const productImage = img.src;

// Cambiar el contenido del modal
document.getElementById('modal-name').textContent = productName;
document.getElementById('modal-price').textContent = productPrice;
document.getElementById('modal-image').src = productImage;

// Mostrar el modal
document.getElementById('product-modal').style.display = 'block';
});
});

// Función para cerrar el modal
document.querySelector('.close').addEventListener('click', function () {
document.getElementById('product-modal').style.display = 'none';
});

const cartToggle = document.querySelector('.cart-toggle');
    const cartContainer = document.querySelector('.cart-container');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');

    let cart = [];

    function updateCart() {
      cartItemsContainer.innerHTML = '';
      let total = 0;

      cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <div class="item-details">
            <span class="item-name">${item.name}</span>
            <span class="item-price">$${item.price}</span>
          </div>
          <span>${item.quantity}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
      });

      cartTotalDisplay.textContent = `$${total.toFixed(2)}`;
    }

    cartToggle.addEventListener('click', () => {
      cartContainer.style.display = cartContainer.style.display === 'none' || cartContainer.style.display === '' ? 'block' : 'none';
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const product = e.target.closest('.product-item');
        const id = product.getAttribute('data-id');
        const name = product.getAttribute('data-name');
        const price = parseFloat(product.getAttribute('data-price'));

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ id, name, price, quantity: 1 });
        }

        updateCart();
      });
    });