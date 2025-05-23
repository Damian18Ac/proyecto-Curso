document.addEventListener("DOMContentLoaded", () => {
  // Menú toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("active");
      menuToggle.textContent = isExpanded ? "☰" : "✕";
    });
  }

  // Slider automático
  const initSlider = () => {
    const slides = document.querySelectorAll(".slide");
    const sliderContainer = document.querySelector(".slider-container");

    if (!slides.length || !sliderContainer) return;

    const dotsContainer = document.createElement("div");
    dotsContainer.className = "slider-dots";
    sliderContainer.appendChild(dotsContainer);

    // Crear puntos indicadores
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    let currentIndex = 0;
    const dots = document.querySelectorAll(".dot");

    const goToSlide = (index) => {
      slides[currentIndex].classList.remove("active");
      dots[currentIndex].classList.remove("active");

      currentIndex = index;

      slides[currentIndex].classList.add("active");
      dots[currentIndex].classList.add("active");
    };

    const nextSlide = () => {
      const newIndex = (currentIndex + 1) % slides.length;
      goToSlide(newIndex);
    };

    // Cambiar slide cada 5 segundos
    setInterval(nextSlide, 5000);

    // Iniciar en la primera diapositiva
    goToSlide(0);
  };

  initSlider();

  // Animaciones al hacer scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.classList.add("animated");
      }
    });
  };

  // Añadir clases iniciales para animaciones
  const setupAnimations = () => {
    // Seleccionar elementos a animar
    const containerGridItems = document.querySelectorAll(
      ".container-grid-item"
    );
    const carouselCards = document.querySelectorAll(".carousel-card");

    // Añadir clases iniciales
    containerGridItems.forEach((item, index) => {
      item.classList.add("animate-on-scroll");
      item.classList.add(index % 2 === 0 ? "slide-left" : "slide-right");
    });

    carouselCards.forEach((card) => {
      card.classList.add("animate-on-scroll");
      card.classList.add("slide-up");
    });
  };

  // Configurar animaciones y añadir event listener para scroll
  setupAnimations();
  window.addEventListener("scroll", animateOnScroll);

  // Ejecutar una vez al cargar para elementos ya visibles
  animateOnScroll();
});
