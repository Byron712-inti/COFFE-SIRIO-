// ==========================================================================
// DATOS DE PRODUCTOS
// (usados tanto por la página de detalle como por el selector del formulario)
// ==========================================================================
const PRODUCTOS = [
  {
    id: 0,
    nombre: "Frappé Sirio",
    precio: "$3.50",
    img: "2.png",
    descripcionLarga: "Delicioso Frappé preparado con café, crema y un irresistible toque a chocolate, con sus caramelos y chocolates incluidos."
  },
  {
    id: 1,
    nombre: "Choco Fudge Cake",
    precio: "$3.50",
    img: "3.jpeg",
    descripcionLarga: "Porción de pastel de chocolate húmedo, horneado con cacao intenso y decorado con rulos de chocolate. El acompañamiento perfecto para un espresso cargado."
  },
  {
    id: 2,
    nombre: "KitKat Latte Cap",
    precio: "$3.95",
    img: "4.jpeg",
    descripcionLarga: "Cremoso cappuccino con arte latte hecho a mano, servido junto a un chocolate KitKat. Una combinación clásica de café y crujiente dulzura."
  },
  {
    id: 3,
    nombre: "Chocolate Donut",
    precio: "$1.75",
    img: "donaa5.jpeg",
    descripcionLarga: "Suave dona esponjosa cubierta con chocolate y trocitos de maní tostado. Ideal para acompañar cualquier bebida de nuestro menú."
  },
  {
    id: 4,
    nombre: "Frozen",
    precio: "$2.95",
    img: "frozen6.jpeg",
    descripcionLarga: "Bebida fría y cremosa a base de café, coronada con crema batida y un generoso toque de chocolate. Perfecta para los días calurosos."
  },
  {
    id: 5,
    nombre: "Croissant de Jamón y Queso",
    precio: "$1.25",
    img: "7.jpeg",
    descripcionLarga: "Croissant recién horneado, hojaldrado y relleno con jamón y queso derretido. Una opción salada para acompañar tu café de la mañana."
  },
  {
    id: 6,
    nombre: "Waffle Frutal",
    precio: "$1.50",
    img: "8.jpeg",
    descripcionLarga: "Waffle crujiente por fuera y suave por dentro, servido con fruta fresca de temporada, crema y un toque de chocolate."
  },
  {
    id: 7,
    nombre: "Tiramisú Clásico",
    precio: "$3.50",
    img: "9.jpeg",
    descripcionLarga: "Postre italiano tradicional elaborado con capas de bizcocho embebido en café, crema de mascarpone y cacao espolvoreado."
  },
  {
    id: 8,
    nombre: "Muffin Triple Chocolate",
    precio: "$2.50",
    img: "10.jpeg",
    descripcionLarga: "Muffin denso y húmedo de chocolate, cubierto con chispas de chocolate blanco, con leche y oscuro. Para los amantes del cacao."
  }
];

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------------------
  // 1. REVELADO AL BAJAR CON EL SCROLL (Intersection Observer)
  // ------------------------------------------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: "-40px 0px",
    threshold: 0.1
  };

  const premiumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");

        // Si entra la sección de la tienda, activa las tarjetas una por una
        if (entry.target.classList.contains('shop-container')) {
          const cards = entry.target.querySelectorAll('.product-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('card-active');
            }, index * 100);
          });
        }
        premiumObserver.unobserve(entry.target); // Solo se anima una vez para mejor rendimiento
      }
    });
  }, observerOptions);

  // Seleccionar y preparar elementos de tus secciones reales
  const containerHero = document.querySelector('.card-container');
  if (containerHero) containerHero.classList.add('reveal-fade-up');

  const containerPromo = document.querySelector('.promo-container');
  if (containerPromo) containerPromo.classList.add('reveal-scale-up');

  const containerShop = document.querySelector('.shop-container');
  if (containerShop) containerShop.classList.add('reveal-trigger');

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => item.classList.add('reveal-fade-left'));

  // Activar el observador en los contenedores existentes
  document.querySelectorAll('.reveal-fade-up, .reveal-scale-up, .reveal-trigger, .reveal-fade-left')
    .forEach(el => premiumObserver.observe(el));


  // ------------------------------------------------------------------------
  // 2. EFECTO DE SEGUIMIENTO DE MOUSE EN BOTONES (Glow Effect)
  // ------------------------------------------------------------------------
  const premiumButtons = document.querySelectorAll('.btn-buy, .btn-footer-cta');
  premiumButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--mouse-x', `${x}px`);
      btn.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  // ------------------------------------------------------------------------
  // 3. PÁGINA DE DETALLE DE PRODUCTO (producto.html)
  // ------------------------------------------------------------------------
  const detalle = document.getElementById('producto-detalle');
  if (detalle) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    const producto = PRODUCTOS.find(p => p.id === id);

    if (producto) {
      document.getElementById('page-title').textContent = `Coffee Sirio — ${producto.nombre}`;
      document.getElementById('producto-img').src = producto.img;
      document.getElementById('producto-img').alt = producto.nombre;
      document.getElementById('producto-nombre').textContent = producto.nombre;
      document.getElementById('producto-precio').textContent = producto.precio;
      document.getElementById('producto-desc-larga').textContent = producto.descripcionLarga;
      document.getElementById('producto-pedir-btn').href = `Proyecto_cafe.html#shop`;
    } else {
      document.getElementById('producto-nombre').textContent = 'Producto no encontrado';
      document.getElementById('producto-desc-larga').textContent = 'No pudimos encontrar este producto. Volvé al menú para elegir otro.';
    }
  }


  // ------------------------------------------------------------------------
  // 4. MODAL DE PEDIDO (Proyecto_cafe.html) — un formulario por producto,
  //    reutilizando la misma ventana interna para cada "comprar"
  // ------------------------------------------------------------------------
  const overlay = document.getElementById('modal-overlay');
  const form = document.getElementById('pedido-form');

  if (overlay && form) {
    const closeBtn = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-producto-img');
    const modalNombre = document.getElementById('modal-producto-nombre');
    const modalPrecio = document.getElementById('modal-producto-precio');
    const mensaje = document.getElementById('pedido-mensaje');

    let productoActual = null;

    const validadores = {
      nombre: (v) => v.trim().length >= 3 ? '' : 'Escribe tu nombre completo.',
      correo: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Escribe un correo válido.',
      telefono: (v) => /^[0-9\-\s()+]{7,}$/.test(v.trim()) ? '' : 'Escribe un teléfono válido.',
      cantidad: (v) => (v && Number(v) >= 1) ? '' : 'La cantidad debe ser al menos 1.',
      entrega: (v) => v ? '' : 'Selecciona el tipo de entrega.',
      direccion: (v, data) => (data.entrega === 'domicilio' && v.trim().length < 5)
        ? 'Escribe la dirección para el envío a domicilio.' : ''
    };

    function mostrarError(campo, texto) {
      const grupo = document.getElementById(campo).closest('.form-group');
      const errorSpan = form.querySelector(`[data-error-for="${campo}"]`);
      grupo.classList.toggle('invalid', Boolean(texto));
      errorSpan.textContent = texto;
    }

    function limpiarErrores() {
      Object.keys(validadores).forEach(campo => mostrarError(campo, ''));
    }

    function abrirModal(producto) {
      productoActual = producto;
      modalImg.src = producto.img;
      modalImg.alt = producto.nombre;
      modalNombre.textContent = producto.nombre;
      modalPrecio.textContent = producto.precio;

      form.reset();
      mensaje.textContent = '';
      mensaje.className = 'pedido-mensaje';
      limpiarErrores();

      overlay.classList.add('activo');
      document.body.classList.add('modal-abierto');
    }

    function cerrarModal() {
      overlay.classList.remove('activo');
      document.body.classList.remove('modal-abierto');
    }

    document.querySelectorAll('[data-buy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.buy, 10);
        const producto = PRODUCTOS.find(p => p.id === id);
        if (producto) abrirModal(producto);
      });
    });

    closeBtn.addEventListener('click', cerrarModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cerrarModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('activo')) cerrarModal();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      mensaje.textContent = '';
      mensaje.className = 'pedido-mensaje';

      const data = Object.fromEntries(new FormData(form).entries());
      let valido = true;

      Object.keys(validadores).forEach(campo => {
        const texto = validadores[campo](data[campo] || '', data);
        mostrarError(campo, texto);
        if (texto) valido = false;
      });

      if (!valido) {
        mensaje.textContent = 'Revisa los campos marcados antes de enviar tu pedido.';
        mensaje.classList.add('error');
        return;
      }

      // Pedido validado correctamente: se muestra la confirmación sin abrir el correo.
      mensaje.textContent = 'Pedido enviado correctamente.';
      mensaje.classList.add('exito');
      form.reset();
    });
  }

});
