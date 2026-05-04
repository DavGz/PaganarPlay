document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Logic
  const menuToggle = document.getElementById("mobile-menu");
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelectorAll(".nav-links a, .nav-cta");

  if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("is-active");
      navContainer.classList.toggle("is-active");
      document.body.style.overflow = navContainer.classList.contains(
        "is-active",
      )
        ? "hidden"
        : "";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("is-active");
        navContainer.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    });
  }

  // Intersection Observer para animaciones al hacer scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Asegurar que todos los elementos con animate-up sean observados
  document.querySelectorAll(".animate-up").forEach((el) => {
    observer.observe(el);
  });

  // Smooth scroll para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Cerrar otros items abiertos
      faqItems.forEach((i) => i.classList.remove("active"));

      // Abrir el actual si no estaba activo
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Manejo del Formulario de Registro
  const registroForm = document.getElementById("registro-form");
  if (registroForm) {
    registroForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(registroForm);
      const data = Object.fromEntries(formData.entries());

      // Simulación de envío
      const submitBtn = registroForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      // Mostramos un SweetAlert de carga
      Swal.fire({
        title: "Procesando solicitud...",
        text: "Estamos preparando tus datos para el envío.",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      // Simular delay de red
      setTimeout(() => {
        // En un caso real, aquí enviaríamos el objeto 'data' (JSON) a un servidor
        console.log("Datos enviados (JSON):", data);

        Swal.fire({
          icon: "success",
          title: "¡Solicitud Enviada!",
          text: `Gracias ${data.nombre}. Tus datos han sido recibidos correctamente y un asesor te contactará pronto para activar tu cuenta.`,
          confirmButtonColor: "#6366f1",
          confirmButtonText: "Entendido",
          background: "#0f172a",
          color: "#f8fafc"
        });

        registroForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 2000);
    });
  }

  // Game Slider Logic
  const slider = document.getElementById("gamesSlider");
  const nextBtn = document.getElementById("nextGame");
  const prevBtn = document.getElementById("prevGame");

  if (slider && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      slider.scrollLeft += 390; // Card width + gap
    });

    prevBtn.addEventListener("click", () => {
      slider.scrollLeft -= 390;
    });
  }

  // Steps Slider Logic
  const stepsSlider = document.getElementById("stepsSlider");
  const nextStepBtn = document.getElementById("nextStep");
  const prevStepBtn = document.getElementById("prevStep");

  if (stepsSlider && nextStepBtn && prevStepBtn) {
    nextStepBtn.addEventListener("click", () => {
      stepsSlider.scrollLeft += 390;
    });

    prevStepBtn.addEventListener("click", () => {
      stepsSlider.scrollLeft -= 390;
    });
  }

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(2, 6, 23, 0.95)";
      navbar.style.padding = "1rem 5%";
    } else {
      navbar.style.background = "rgba(2, 6, 23, 0.8)";
      navbar.style.padding = "1.5rem 5%";
    }
  });
});
