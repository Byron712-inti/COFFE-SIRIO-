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
  // 4. MODAL DE PEDIDO + TOTALES (por pedido y general)
  // ------------------------------------------------------------------------
  const overlay = document.getElementById('modal-overlay');
  const form = document.getElementById('pedido-form');

  if (overlay && form) {
    const closeBtn = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-producto-img');
    const modalNombre = document.getElementById('modal-producto-nombre');
    const modalPrecio = document.getElementById('modal-producto-precio');
    const mensaje = document.getElementById('pedido-mensaje');

    const inputTelefono = document.getElementById('telefono');
    const inputCantidad = document.getElementById('cantidad');
    const selectEntrega = document.getElementById('entrega');
    const grupoDireccion = document.getElementById('grupo-direccion');
    const totalPedido = document.getElementById('pedido-total');
    const detalleTotal = document.getElementById('pedido-detalle-total');

    // Panel "Mis pedidos"
    const fab = document.getElementById('pedidos-fab');
    const fabTotal = document.getElementById('pedidos-fab-total');
    const fabCount = document.getElementById('pedidos-count');
    const panelOverlay = document.getElementById('pedidos-overlay');
    const panelClose = document.getElementById('pedidos-close');
    const lista = document.getElementById('pedidos-lista');
    const vacio = document.getElementById('pedidos-vacio');
    const totalGeneral = document.getElementById('pedidos-total-general');

    let productoActual = null;
    let pedidos = [];
    let siguienteId = 1;

    const valorPrecio = (p) => parseFloat(String(p.precio).replace('$', ''));
    const dinero = (n) => `$${n.toFixed(2)}`;

    const validadores = {
      nombre: (v) => v.trim().length >= 3 ? '' : 'Escribe tu nombre completo.',
      correo: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Escribe un correo válido.',
      telefono: (v) => /^[0-9]{8}$/.test(v.trim()) ? '' : 'Escribe un teléfono de 8 dígitos.',
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

    // --- Total del pedido en el formulario (precio x cantidad) ---
    function actualizarTotalPedido() {
      if (!productoActual) return;
      const cantidad = Math.max(parseInt(inputCantidad.value, 10) || 0, 0);
      const total = valorPrecio(productoActual) * cantidad;
      totalPedido.textContent = dinero(total);
      detalleTotal.textContent = `${cantidad} × ${productoActual.precio}`;
    }

    function actualizarDireccion() {
      const domicilio = selectEntrega.value === 'domicilio';
      grupoDireccion.hidden = !domicilio;
      if (!domicilio) mostrarError('direccion', '');
    }

    // --- Lista de pedidos y total general ---
    function renderPedidos() {
      lista.innerHTML = '';
      pedidos.forEach(p => {
        const li = document.createElement('li');
        li.className = 'pedido-item';

        const img = document.createElement('img');
        img.src = p.producto.img;
        img.alt = p.producto.nombre;

        const info = document.createElement('div');
        info.className = 'pedido-item-info';
        const nombre = document.createElement('strong');
        nombre.textContent = p.producto.nombre;
        const detalle = document.createElement('small');
        detalle.textContent = `${p.cantidad} × ${p.producto.precio} · ${p.entrega === 'domicilio' ? 'Domicilio' : 'Recoger en local'}`;
        info.append(nombre, detalle);

        const subtotal = document.createElement('span');
        subtotal.className = 'pedido-item-total';
        subtotal.textContent = dinero(p.total);

        const quitar = document.createElement('button');
        quitar.type = 'button';
        quitar.className = 'pedido-item-quitar';
        quitar.dataset.quitar = p.id;
        quitar.setAttribute('aria-label', `Quitar ${p.producto.nombre}`);
        quitar.innerHTML = '&times;';

        li.append(img, info, subtotal, quitar);
        lista.appendChild(li);
      });

      const suma = pedidos.reduce((acc, p) => acc + p.total, 0);
      const unidades = pedidos.reduce((acc, p) => acc + p.cantidad, 0);
      totalGeneral.textContent = dinero(suma);
      fabTotal.textContent = dinero(suma);
      fabCount.textContent = unidades;
      vacio.hidden = pedidos.length > 0;
      fab.hidden = pedidos.length === 0;
      if (pedidos.length === 0) cerrarPanel();
    }

    function abrirPanel() {
      panelOverlay.classList.add('activo');
      document.body.classList.add('modal-abierto');
    }
    function cerrarPanel() {
      panelOverlay.classList.remove('activo');
      if (!overlay.classList.contains('activo')) document.body.classList.remove('modal-abierto');
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
      actualizarDireccion();
      actualizarTotalPedido();

      overlay.classList.add('activo');
      document.body.classList.add('modal-abierto');
    }

    function cerrarModal() {
      overlay.classList.remove('activo');
      if (!panelOverlay.classList.contains('activo')) document.body.classList.remove('modal-abierto');
    }

    document.querySelectorAll('[data-buy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.buy, 10);
        const producto = PRODUCTOS.find(p => p.id === id);
        if (producto) abrirModal(producto);
      });
    });

    inputCantidad.addEventListener('input', actualizarTotalPedido);
    selectEntrega.addEventListener('change', actualizarDireccion);
    inputTelefono.addEventListener('input', () => {
      inputTelefono.value = inputTelefono.value.replace(/[^0-9]/g, '').slice(0, 8);
    });

    closeBtn.addEventListener('click', cerrarModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrarModal(); });

    fab.addEventListener('click', abrirPanel);
    panelClose.addEventListener('click', cerrarPanel);
    panelOverlay.addEventListener('click', (e) => { if (e.target === panelOverlay) cerrarPanel(); });
    lista.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-quitar]');
      if (!btn) return;
      pedidos = pedidos.filter(p => p.id !== Number(btn.dataset.quitar));
      renderPedidos();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (overlay.classList.contains('activo')) cerrarModal();
      else if (panelOverlay.classList.contains('activo')) cerrarPanel();
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

      const cantidad = parseInt(data.cantidad, 10);
      pedidos.push({
        id: siguienteId++,
        producto: productoActual,
        cantidad,
        entrega: data.entrega,
        total: valorPrecio(productoActual) * cantidad
      });

      renderPedidos();
      cerrarModal();
      abrirPanel();
    });

    renderPedidos();
  }

});
