// Inicializa AOS
AOS.init({
  duration: 1000,
  easing: 'ease-out-cubic',
  once: true
});

// Función para animar números
const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const duration = 2000;
  let start = 0;
  const step = timestamp => {
    if (!counter.startTime) counter.startTime = timestamp;
    const progress = timestamp - counter.startTime;
    const value = Math.min(Math.round((progress / duration) * target), target);
    counter.textContent = value;
    if (value < target) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

// Ejecuta cuando entren al viewport
const counters = document.querySelectorAll(".stat-number");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

const translations = {
  es: {
    companyName: "IMPULSORA DE RECUPERACIÓN CREDITICIA",
    companyNameFooter: "Impulsora de Recuperación Crediticia",
    rightsReserved: "Todos los derechos reservados.",

    navInicio: "Inicio",
    navNosotros: "Nosotros",
    navServicios: "Servicios",
    navClientes: "Clientes",
    navMapa: "Mapa",
    navContacto: "Contacto",

    heroTitle: "IMPULSORA DE RECUPERACIÓN CREDITICIA",
    heroSubtitle: "Cobramos honorarios conforme a los pagos de deudores",
    heroHighlight: "Especialistas en cobranza extrajudicial y recuperación de cartera.",
    heroButton: "Contáctanos",
    heroLearnMore: "Conocer servicios",

    aboutTitle: "Nuestra trayectoria",
    aboutDescription:
      "En el año 2005 la Lic. Refugio Sandoval Santana fundó una firma de abogados en México, ofreciendo servicios legales de tipo mercantil, fiscal, cobranza extrajudicial, recuperación de cartera vencida y solución de disputas abarcando la zona centro y norte del país. En el año 2010 con la reciente participación comercial y relaciones industriales del Ing. Thor Robledo, se ofrecen los mismos servicios en todo el continente americano contando con un amplio equipo de asesores, gestores y colaboradores a lo largo del continente. En el año 2015 se comienzan a ofrecer nuestros servicios a nivel global.",

    misionTitle: "Misión",
    misionDescription:
      "Ser una compañía de servicios sólida que brinde consistentemente un servicio excepcional a todos nuestros clientes, impulsando el crecimiento y desarrollo de clientes, empleados y colaboradores a través de la recuperación de su cartera vencida.",

    visionTitle: "Visión",
    visionDescription:
      "Somos una empresa de servicios de primera clase en mejora continua, capaz de establecer una relación cercana con los clientes, personal y sociedad para contribuir al desarrollo global.",

    valoresTitle: "Valores",
    valoresHonestidad:
      "Honestidad: Total transparencia en el actuar y previa autorización de nuestros clientes.",
    valoresResponsabilidad:
      "Responsabilidad: Reconocemos el esfuerzo individual de nuestros colaboradores y cumplimos las necesidades de cada cliente.",
    valoresEnfoqueCliente:
      "Enfoque al Cliente: Nuestro principal objetivo es satisfacer a todos nuestros clientes excediendo sus expectativas.",

    servicesTitle: "Nuestros Servicios",

    service1Title: "Cobranza Extrajudicial",
    service1Tag: "Empresas y despachos",
    service1Desc:
      "Labor que se logra mediante el rastreo, ubicación, envío de correspondencia y visitas personalizadas en domicilios de los deudores para cumplir con la recuperación de cartera vencida, cuidando siempre la relación comercial.",
    service1Benefit1: "Recuperación efectiva de cartera vencida",
    service1Benefit2: "Cuidado de la relación comercial",
    service1Benefit3: "Mayor flujo de efectivo para su empresa",

    service2Title: "Asesoría",
    service2Tag: "Empresas con cartera vencida y personas independientes",
    service2Desc:
      "De acuerdo a las características de cada cartera, contamos con diversas estrategias para definir la más eficiente e indicada para su empresa, recuperar la cartera vencida, mantener la relación comercial y evitar futuros problemas financieros.",
    service2Benefit1: "Diagnóstico real de su cartera vencida",
    service2Benefit2: "Estrategias de cobranza adaptadas a su negocio",
    service2Benefit3: "Reducción de tiempos y costos de recuperación",

    service3Title: "Negociación de deuda",
    service3Tag: "Personas y empresas",
    service3Desc:
      "Gestionamos, negociamos y resolvemos deudas con bancos, acreedores y cualquier institución financiera, buscando soluciones viables y favorables para su empresa.",
    service3Benefit1: "Acuerdos de pago claros y viables",
    service3Benefit2: "Reducción de conflictos entre las partes",
    service3Benefit3: "Soluciones que evitan procesos legales",

    servicesNote:
      "Cada estrategia se diseña de acuerdo al perfil de la deuda y los objetivos del cliente.",

    globalStatsYears: "Años de experiencia global",
    globalStatsEfficiency: "Eficiencia en resultados (%)",
    globalStatsCountries: "Países en los que hemos trabajado",

    ctaTitle: "¿Listo para mejorar tu recuperación de cartera?",
    ctaText:
      "Estamos listos para ayudarte a aumentar tu eficiencia en la cobranza y mantener relaciones comerciales sólidas.",
    ctaButton: "Solicita tu asesoría",

    clientsTitle: "Clientes",
    clientsSubtitle: "Nuestros principales clientes:",

    globalCoverageTitle: "Presencia Internacional",

    contactFormTitle: "COMPLETA EL FORMULARIO",
    contactFormSubtitle: "Nos pondremos en contacto contigo en breve.",
    contactStep1: "Solo necesitas llenar el formulario.",
    contactStep2: "Te llamaremos en breve.",
    contactStep3: "Empieza a recuperar lo tuyo ahora.",

    formNamePlaceholder: "Nombre",
    formEmailPlaceholder: "Correo electrónico",
    formSubjectPlaceholder: "Asunto",
    formMessagePlaceholder: "Escribe tu mensaje aquí...",
    formSendButton: "Enviar",

    footerNavigation: "Navegación",
    footerSubtitle:
      "Especialistas en cobranza extrajudicial y recuperación de cartera.",
    footerBlog: "Blog",
    footerGallery: "Galería",
    footerCopy: "© 2026 Todos los derechos reservados."
  },

  en: {
    companyName: "International Recovery and Collection",
    companyNameFooter: "International Recovery and Collection",
    rightsReserved: "All rights reserved.",

    navInicio: "Home",
    navNosotros: "About Us",
    navServicios: "Services",
    navClientes: "Clients",
    navMapa: "Map",
    navContacto: "Contact",

    heroTitle: "International Recovery and Collection",
    heroSubtitle: "No collection, no fees",
    heroHighlight:
      "Specialists in extrajudicial collection and portfolio recovery.",
    heroButton: "Contact Us",
    heroLearnMore: "View services",

    aboutTitle: "Our Track Record",
    aboutDescription:
      "In 2005, Lic. Refugio Sandoval Santana founded a law firm in Mexico, offering legal services in commercial, tax, extrajudicial collection and portfolio recovery. In 2010, with Eng. Thor Robledo’s participation, services expanded across the American continent. In 2015, services began to be offered globally.",

    misionTitle: "Mission",
    misionDescription:
      "To be a solid service company that consistently delivers exceptional service to all our clients, driving growth through portfolio recovery.",

    visionTitle: "Vision",
    visionDescription:
      "We are a first-class service company in continuous improvement, capable of building close relationships with clients, staff and society to contribute globally.",

    valoresTitle: "Values",
    valoresHonestidad:
      "Honesty: Total transparency in our actions with prior client authorization.",
    valoresResponsabilidad:
      "Responsibility: We recognize individual effort and meet each client’s needs.",
    valoresEnfoqueCliente:
      "Customer Focus: Our main goal is to exceed client expectations.",

    servicesTitle: "Our Services",

    service1Title: "Extrajudicial Collection",
    service1Tag: "Companies and law firms",
    service1Desc:
      "Achieved through tracking, locating, correspondence delivery and personalized visits to debtors’ addresses to recover overdue accounts while protecting commercial relationships.",
    service1Benefit1: "Effective recovery of overdue accounts",
    service1Benefit2: "Preservation of commercial relationships",
    service1Benefit3: "Improved cash flow for your company",

    service2Title: "Advisory",
    service2Tag: "Companies with overdue accounts and individuals",
    service2Desc:
      "Based on each portfolio’s characteristics, we design efficient strategies to recover overdue accounts, maintain business relationships and prevent future financial issues.",
    service2Benefit1: "Accurate diagnosis of overdue accounts",
    service2Benefit2: "Collection strategies tailored to your business",
    service2Benefit3: "Reduced recovery time and costs",

    service3Title: "Debt Negotiation",
    service3Tag: "Individuals and companies",
    service3Desc:
      "We manage, negotiate and resolve debts with banks, creditors and financial institutions, seeking viable and favorable solutions.",
    service3Benefit1: "Clear and viable payment agreements",
    service3Benefit2: "Reduced conflicts between parties",
    service3Benefit3: "Solutions that avoid legal processes",

    servicesNote:
      "Each strategy is designed according to the debt profile and the client’s objectives.",

    globalStatsYears: "Years of global experience",
    globalStatsEfficiency: "Efficiency in results (%)",
    globalStatsCountries: "Countries we have worked in",

    ctaTitle: "Ready to improve your debt recovery?",
    ctaText:
      "We are ready to help you increase your collection efficiency and maintain strong business relationships.",
    ctaButton: "Request your consultation",

    clientsTitle: "Clients",
    clientsSubtitle: "Our main clients:",

    globalCoverageTitle: "International Presence",

    contactFormTitle: "COMPLETE THE FORM",
    contactFormSubtitle: "We will contact you shortly.",
    contactStep1: "You only need to fill out the form.",
    contactStep2: "We will call you shortly.",
    contactStep3: "Start recovering what is yours now.",

    formNamePlaceholder: "Name",
    formEmailPlaceholder: "Email",
    formSubjectPlaceholder: "Subject",
    formMessagePlaceholder: "Write your message here...",
    formSendButton: "Send",

    footerNavigation: "Navigation",
    footerSubtitle:
      "Specialists in extrajudicial collection and portfolio recovery.",
    footerBlog: "Blog",
    footerGallery: "Gallery",
    footerCopy: "© 2026 All rights reserved."
  }
};

// Traducción dinámica
function switchLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-key");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  const inputPlaceholders = {
    formNamePlaceholder: "[data-key='formNamePlaceholder']",
    formEmailPlaceholder: "[data-key='formEmailPlaceholder']",
    formSubjectPlaceholder: "[data-key='formSubjectPlaceholder']",
    formMessagePlaceholder: "[data-key='formMessagePlaceholder']",
    newsletterPlaceholder: "[data-key='newsletterPlaceholder']"
  };

  Object.entries(inputPlaceholders).forEach(([key, selector]) => {
    const input = document.querySelector(selector);
    if (input) {
      input.placeholder = translations[lang][key];
    }
  });
}

// Funcionalidad principal
document.addEventListener("DOMContentLoaded", () => {
  switchLanguage("es");

  const heroImages = [
    'Imagenes/logo4.webp',
    'Imagenes/contrato.webp',
  ];
  let currentHero = 0;
  const heroSection = document.getElementById('inicio');
  setInterval(() => {
    currentHero = (currentHero + 1) % heroImages.length;
    heroSection.style.backgroundImage = `url('${heroImages[currentHero]}')`;
  }, 5000);

  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Contador de visitas (opcional)
  fetch('https://api.countapi.xyz/hit/ircdebtrecovery.com/visitas')
    .then(res => res.json())
    .then(data => {
      const visitDisplay = document.querySelector('#visit-counter .counter-digits');
      if (visitDisplay) visitDisplay.textContent = data.value;
    })
    .catch(err => console.error('Visitas:', err));

}
);

document.querySelectorAll('.map-marker').forEach(marker => {
  marker.addEventListener('mouseenter', e => {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerText = e.target.dataset.descripcion;
    tooltip.style.display = 'block';
  });
  marker.addEventListener('mousemove', e => {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.top = (e.clientY - 30) + 'px';
    tooltip.style.left = (e.clientX + 10) + 'px';
  });
  marker.addEventListener('mouseleave', () => {
    document.getElementById('tooltip').style.display = 'none';
  });
});

const slides = document.querySelectorAll(".values-slide");

if (slides.length > 0) {
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 5000);
}

let startX = 0;
let endX = 0;

const slider = document.querySelector(".values-slides");

if (slider) {
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
}

function handleSwipe() {
  const threshold = 50; // distancia mínima del swipe
  const diff = startX - endX;

  if (Math.abs(diff) > threshold) {
    slides[current].classList.remove("active");

    if (diff > 0) {
      // Swipe izquierda → siguiente
      current = (current + 1) % slides.length;
    } else {
      // Swipe derecha → anterior
      current = (current - 1 + slides.length) % slides.length;
    }

    slides[current].classList.add("active");
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });

  // Cerrar menú al hacer click en un link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
    });
  });
});

// voltear las cards de servicios


document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const inner = card.querySelector('.card-inner');
    
    // Para móviles (touch)
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      card.addEventListener('click', function(e) {
        // Evitar que se active si se hizo clic en un botón dentro
        if (e.target.classList.contains('flip-back')) {
          inner.classList.remove('flipped');
          return;
        }
        
        // Toggle del giro
        if (inner.classList.contains('flipped')) {
          inner.classList.remove('flipped');
        } else {
          inner.classList.add('flipped');
        }
      });
      
      // Añadir botón para voltear atrás en la cara trasera
      const cardBack = card.querySelector('.card-back');
      if (cardBack && !cardBack.querySelector('.flip-back')) {
        const flipBackBtn = document.createElement('button');
        flipBackBtn.className = 'flip-back';
        flipBackBtn.textContent = 'Volver';
        flipBackBtn.setAttribute('aria-label', 'Volver a la vista anterior');
        cardBack.appendChild(flipBackBtn);
      }
    }
    
    // Para desktop mantener el hover
    if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
      card.addEventListener('mouseenter', function() {
        inner.classList.add('flipped');
      });
      
      card.addEventListener('mouseleave', function() {
        inner.classList.remove('flipped');
      });
    }
  });
});

// ajuste de movil en la barra
// Menú móvil toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  const body = document.body;

  if (menuToggle && mobileNav) {
    // Toggle del menú
    menuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      menuToggle.classList.toggle('open');
      
      // Prevenir scroll cuando el menú está abierto
      if (mobileNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Cerrar menú al hacer clic en un enlace
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('open');
        body.style.overflow = '';
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (!mobileNav.contains(event.target) && 
          !menuToggle.contains(event.target) && 
          mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('open');
        body.style.overflow = '';
      }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('open');
        body.style.overflow = '';
      }
    });
  }

  // Scroll suave para todos los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.mobile-header').offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
});