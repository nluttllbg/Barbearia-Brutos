/**
 * ============================================================================
 * BRUTUS BARBEARIA PREMIUM - SCRIPT PRINCIPAL (script.js)
 * Vanilla JavaScript (Zero Dependências, Zero Build, 100% Compatível com GitHub Pages)
 * ============================================================================
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. CONTROLE DO MENU MOBILE (DRAWER & HAMBÚRGUER)
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function openMobileMenu() {
    if (!menuToggle || !mobileNav || !mobileNavBackdrop) return;
    menuToggle.classList.add("is-active");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("is-open");
    mobileNavBackdrop.classList.add("is-visible");
    document.body.style.overflow = "hidden"; // Evita rolagem do fundo
  }

  function closeMobileMenu() {
    if (!menuToggle || !mobileNav || !mobileNavBackdrop) return;
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    mobileNavBackdrop.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav && mobileNav.classList.contains("is-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener("click", closeMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Fechar com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
      closeLightbox();
    }
  });

  // --------------------------------------------------------------------------
  // 2. EFEITO DE ROLAGEM NO CABEÇALHO (STICKY & BLUR EFFECT)
  // --------------------------------------------------------------------------
  const mainHeader = document.getElementById("mainHeader");

  function handleHeaderScroll() {
    if (!mainHeader) return;
    if (window.scrollY > 40) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // 3. ANIMAÇÕES AO ROLAR A PÁGINA (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.12,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target); // Anima uma única vez para fluidez
        }
      });
    }, observerOptions);

    revealElements.forEach((el, index) => {
      // Adiciona um pequeno atraso escalonado para cartões adjacentes
      const delay = (index % 4) * 0.1;
      el.style.transitionDelay = `${delay}s`;
      revealObserver.observe(el);
    });
  } else {
    // Fallback para navegadores legados: exibe direto
    revealElements.forEach((el) => el.classList.add("is-revealed"));
  }

  // --------------------------------------------------------------------------
  // 4. DESTAQUE AUTOMÁTICO DO LINK ATIVO NA NAVEGAÇÃO (SCROLLSPY)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-desktop .nav-link");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 5. ACORDEÃO INTERATIVO DE DÚVIDAS FREQUENTES (FAQ)
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");

    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("is-active");

        // Fecha todos os outros itens para manter o design limpo
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("is-active");
          const otherBtn = otherItem.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });

        // Alterna o item atual
        if (!isActive) {
          item.classList.add("is-active");
          questionBtn.setAttribute("aria-expanded", "true");
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 6. LIGHTBOX MODAL PARA GALERIA DE FOTOS
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function openLightbox(imgSrc, captionText) {
    if (!lightboxModal || !lightboxImage) return;
    lightboxImage.src = imgSrc;
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || "Brutus Barbearia Premium";
    }
    lightboxModal.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("is-active");
    document.body.style.overflow = "";
    if (lightboxImage) lightboxImage.src = "";
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector(".gallery-title");
      if (img) {
        openLightbox(img.src, title ? title.textContent : "");
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. TRATAMENTO ROBUSTO CONTRA TELA BRANCA OU IMAGENS QUEBRADAS
  // --------------------------------------------------------------------------
  // Se por ventura uma imagem local for movida ou renomeada de forma incorreta,
  // mantemos um fallback visual elegante sem quebrar o layout da página.
  const allImages = document.querySelectorAll("img");
  allImages.forEach((img) => {
    img.addEventListener("error", function () {
      // Se a imagem falhar ao carregar localmente, mantém um gradiente estilizado
      this.style.backgroundColor = "#17181f";
      this.style.minHeight = "200px";
      this.alt = `${this.alt} (Brutus Barbearia)`;
    });
  });
});
