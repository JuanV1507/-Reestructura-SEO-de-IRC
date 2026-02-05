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

    heroTitle: "COBRANZA EXTRAJUDICIAL Y RECUPERACION DE CARTERA | IRC",
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

    servicesTitle: "Nuestros servicios de Cobranza en México y Extranjero.",

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
    valoresTitle: "Nuestros Valores",

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

  // Menú de navegación (header y footer)
  navInicio: "Home",
  navNosotros: "About Us",
  navServicios: "Services",
  navClientes: "Clients",
  navContacto: "Contact",

  // Hero section
  heroTitle: "Extrajudicial Collection and Portfolio Recovery | IRC",
  heroSubtitle: "No collection, no fees",
  heroHighlight: "Specialists in extrajudicial collection and overdue portfolio recovery",
  heroButton: "Contact Us",
  heroLearnMore: "Learn about services",

  // About section
  aboutTitle: "Our History",
  aboutDescription: "In 2005, Lic. Refugio Sandoval Santana founded a law firm in Mexico, offering commercial, tax, extrajudicial collection, overdue portfolio recovery and dispute resolution services across central and northern Mexico. In 2010, with the recent commercial participation and industrial relations of Eng. Thor Robledo, the same services were offered throughout the American continent with a large team of advisors, managers and collaborators across the continent. In 2015, our services began to be offered globally.",

  // Mission, Vision, Values
  misionTitle: "Mission",
  misionDescription: "To be a solid service company that consistently delivers exceptional service to all our clients, driving the growth and development of clients, employees and collaborators through the recovery of their overdue portfolio.",
  visionTitle: "Vision",
  visionDescription: "We are a first-class service company in continuous improvement, capable of establishing close relationships with clients, staff and society to contribute to global development.",
  valoresTitle: "Values",
  valoresHonestidad: "Honesty: Total transparency in our actions with prior client authorization.",
  valoresResponsabilidad: "Responsibility: We recognize the individual effort of our collaborators and meet the needs of each client.",
  valoresEnfoqueCliente: "Customer Focus: Our main goal is to satisfy all our clients by exceeding their expectations.",

  // Services section
  servicesTitle: "Our Collection Services in Mexico and Abroad",
  servicesNote: "Personalized strategies for extrajudicial collection and overdue portfolio recovery designed according to the debt profile and client objectives.",

  service1Title: "Extrajudicial Collection",
  service1Tag: "Companies and law firms",
  service1Desc: "Achieved through tracking, locating, sending correspondence and personalized visits to debtors' addresses to recover overdue portfolios while always preserving the commercial relationship.",
  service1Benefit1: "Effective recovery of overdue portfolio",
  service1Benefit2: "Preservation of commercial relationships",
  service1Benefit3: "Increased cash flow for your company",

  service2Title: "Portfolio Management Advisory",
  service2Tag: "Companies with overdue portfolios and individuals",
  service2Desc: "According to the characteristics of each portfolio, we have various strategies to define the most efficient and appropriate for your company, recover overdue portfolio, maintain commercial relationships and avoid future financial problems.",
  service2Benefit1: "Accurate diagnosis of your overdue portfolio",
  service2Benefit2: "Collection strategies tailored to your business",
  service2Benefit3: "Reduced recovery time and costs",

  service3Title: "Debt Negotiation",
  service3Tag: "Individuals and companies",
  service3Desc: "We manage, negotiate and resolve debts with banks, creditors and any financial institution, seeking viable and favorable solutions for your company.",
  service3Benefit1: "Clear and viable payment agreements",
  service3Benefit3: "Solutions that avoid legal processes",

  // Global Statistics
  globalStatsTitle: "Leading Trajectory in Asset Recovery",
  globalStatsYears: "Years of experience in collection",
  globalStatsEfficiency: "Success in portfolio recovery",
  globalStatsCountries: "International coverage and reach",
  globalStatsSubtitle: "Over two decades providing legal and extrajudicial collection solutions with global presence, ensuring legal security and liquidity for your company.",

  // CTA Section
  ctaTitle: "Ready to improve your portfolio recovery?",
  ctaText: "We are ready to help you increase your collection efficiency and maintain strong business relationships.",
  ctaButton: "Request your consultation",

  // Clients Section
  clientsTitle: "Companies That Trust Us",
  clientsSubtitle: "We collaborate with leading institutions and global companies in managing their assets and corporate collection.",

  // Global Map Section
  mapaTituloPrincipal: "Global Presence",
  subMapaSubtitle: "Over 15 countries where we have collaborated and left an international mark.",

  // Contact Section
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

  // Footer
  footerSubtitle: "Specialists in extrajudicial collection and portfolio recovery.",
  footerBlog: "Blog",
  footerGallery: "Gallery",
  footerNavigation: "Navigation",
  footerCopy: "© 2026 All rights reserved.",
  footerVisitStats: "Site Statistics",
  footerTotalVisits: "Total Visits",
  footerTodayVisits: "Visits Today",
  footerUniqueVisitors: "Unique Visitors",
  footerThisMonth: "This Month",
  footerUpdatedRealTime: "Updated in real time"

},
  chino: {
    companyName: "国际回收与催收公司",
    companyNameFooter: "国际回收与催收公司",
    rightsReserved: "版权所有。",
    
    navInicio: "首页",
    navNosotros: "关于我们",
    navServicios: "服务",
    navClientes: "客户",
    navMapa: "地图",
    navContacto: "联系方式",
    
    heroTitle: "国际回收与催收公司",
    heroSubtitle: "无回收，无费用",
    heroHighlight: "专门从事非司法催收和投资组合回收。",
    heroButton: "联系我们",
    heroLearnMore: "查看服务",
    
    aboutTitle: "我们的履历",
    aboutDescription: "2005年，Lic. Refugio Sandoval Santana 在墨西哥成立了一家律师事务所，提供商业、税务、非司法催收和投资组合回收等法律服务。2010年，随着 Eng. Thor Robledo 的参与，服务扩展到整个美洲大陆。2015年，开始在全球范围内提供服务。",
    
    misionTitle: "使命",
    misionDescription: "成为一家坚实的服务公司，始终如一地为所有客户提供卓越服务，通过投资组合回收推动增长。",
    
    visionTitle: "愿景",
    visionDescription: "我们是一家持续改进的一流服务公司，能够与客户、员工和社会建立紧密关系，为全球发展做出贡献。",
    
    valoresTitle: "价值观",
    valoresHonestidad: "诚实：在我们采取行动时完全透明，并事先获得客户授权。",
    valoresResponsabilidad: "责任：我们认可员工的个人努力，并满足每位客户的需求。",
    valoresEnfoqueCliente: "以客户为中心：我们的主要目标是满足所有客户并超越他们的期望。",
    
    servicesTitle: "我们的服务",
    
    service1Title: "非司法催收",
    service1Tag: "公司和律师事务所",
    service1Desc: "通过追踪、定位、发送信函和亲自拜访债务人地址来实现，以回收逾期账户，同时保护商业关系。",
    service1Benefit1: "有效回收逾期账户",
    service1Benefit2: "保护商业关系",
    service1Benefit3: "改善公司现金流",
    
    service2Title: "咨询",
    service2Tag: "有逾期账户的公司和个人",
    service2Desc: "根据每个投资组合的特点，我们设计高效的策略来回收逾期账户，维护业务关系并预防未来的财务问题。",
    service2Benefit1: "准确诊断逾期账户",
    service2Benefit2: "量身定制的催收策略",
    service2Benefit3: "减少回收时间和成本",
    
    service3Title: "债务谈判",
    service3Tag: "个人和公司",
    service3Desc: "我们管理、谈判和解决与银行、债权人和金融机构的债务，寻求可行且有利的解决方案。",
    service3Benefit1: "清晰可行的付款协议",
    service3Benefit2: "减少各方之间的冲突",
    service3Benefit3: "避免法律程序的解决方案",
    
    servicesNote: "每种策略都根据债务概况和客户目标进行设计。",
    
    globalStatsYears: "全球经验年数",
    globalStatsEfficiency: "结果效率 (%)",
    globalStatsCountries: "我们工作过的国家",
    globalStatsSubtitle: "支持我们的经验、效率和国际覆盖范围",
    
    ctaTitle: "准备好改善您的债务回收了吗？",
    ctaText: "我们准备好帮助您提高催收效率并维持稳固的商业关系。",
    ctaButton: "请求咨询",
    
    clientsTitle: "客户",
    clientsSubtitle: "我们的主要客户：",
    
    globalCoverageTitle: "国际存在",
    mapaTituloPrincipal: "全球存在",
    subMapaSubtitle: "我们在超过15个国家合作并留下国际足迹。",
    
    contactFormTitle: "填写表格",
    contactFormSubtitle: "我们将很快与您联系。",
    contactStep1: "您只需要填写表格。",
    contactStep2: "我们将很快给您打电话。",
    contactStep3: "现在开始回收属于您的东西。",
    
    formNamePlaceholder: "姓名",
    formEmailPlaceholder: "电子邮件",
    formSubjectPlaceholder: "主题",
    formMessagePlaceholder: "在这里写下您的信息...",
    newsletterPlaceholder: "您的电子邮件",
    formSendButton: "发送",
    
    footerNavigation: "导航",
    footerSubtitle: "专门从事非司法催收和投资组合回收。",
    footerBlog: "博客",
    footerGallery: "图库",
    footerCopy: "© 2026 版权所有。"
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