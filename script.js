// Основной файл script.js
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация всех компонентов
  initPopup();
  initScrollToTop();
  initForms();
  initDropdownMenu();
  initDropdownMenusWithArrows();
  initGalleryModal();
  initReviewsCarousel();
});

// ==================== ПОПАП ====================
function initPopup() {
  const popup = document.querySelector(".js-popup");
  const openButtons = document.querySelectorAll(".js-open-popup");
  const closeButtons = document.querySelectorAll(".js-popup-close");

  if (!popup) return;

  // Открытие попапа
  openButtons.forEach((button) => {
    button.addEventListener("click", function () {
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Закрытие попапа
  closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  // Закрытие по клику на оверлей
  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      closePopup();
    }
  });

  // Закрытие по ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popup.style.display === "flex") {
      closePopup();
    }
  });

  function closePopup() {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// ==================== ПРОКРУТКА К ВЕРХУ ====================
function initScrollToTop() {
  const scrollTopButton = document.querySelector(".js-scroll-top");

  if (!scrollTopButton) return;

  // Клик по кнопке
  scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Показ/скрытие кнопки при скролле
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.opacity = "1";
      scrollTopButton.style.visibility = "visible";
    } else {
      scrollTopButton.style.opacity = "0";
      scrollTopButton.style.visibility = "hidden";
    }
  });
}

// ==================== ФОРМЫ ====================
function initForms() {
  const forms = document.querySelectorAll(".js-form-popup, .js-form-promo");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Сбор данных формы
      const formData = new FormData(form);
      const name = formData.get("name");
      const phone = formData.get("phone");

      console.log("Форма отправлена:", { name, phone });

      // Показать сообщение об успехе
      showSuccessMessage();

      // Закрыть попап если он открыт
      const popup = document.querySelector(".js-popup");
      if (form.closest(".popup") && popup) {
        popup.style.display = "none";
        document.body.style.overflow = "auto";
      }

      // Очистить форму
      form.reset();
    });
  });

  function showSuccessMessage() {
    alert(
      "Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время."
    );
  }
}

// ==================== ВЫПАДАЮЩЕЕ МЕНЮ (ТРИ ТОЧКИ) ====================
// ==================== ВЫПАДАЮЩИЕ МЕНЮ В НАВИГАЦИИ ====================
function initNavigationDropdowns() {
  const dropdownItems = document.querySelectorAll(
    ".nav__item--dropdown, .nav__item-link"
  );

  dropdownItems.forEach((item) => {
    const link = item.querySelector(".nav__link, .nav__item-sp");
    const menu = item.querySelector(".dropdown-menu");
    const arrow = item.querySelector(".nav__arrow");

    if (!link || !menu) return;

    // Для десктопов - открытие при наведении
    if (window.innerWidth > 768) {
      item.addEventListener("mouseenter", () =>
        openDropdown(item, menu, arrow)
      );
      item.addEventListener("mouseleave", () =>
        closeDropdown(item, menu, arrow)
      );
    }
    // Для мобильных - открытие по клику
    else {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        toggleMobileDropdown(item, menu, arrow);
      });
    }
  });

  // Закрытие всех меню при клике вне навигации
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".nav__item--dropdown") &&
      !e.target.closest(".nav__item-link")
    ) {
      closeAllDropdowns();
    }
  });

  // Обработка изменения размера окна
  window.addEventListener("resize", function () {
    closeAllDropdowns();
  });
}

function openDropdown(item, menu, arrow) {
  // Закрываем все другие меню перед открытием нового
  closeAllDropdownsExcept(item);

  menu.style.opacity = "1";
  menu.style.visibility = "visible";
  menu.style.transform = "translateY(0)";

  if (arrow) {
    arrow.style.transform = "rotate(180deg)";
  }

  item.classList.add("dropdown-open");
}

function closeDropdown(item, menu, arrow) {
  menu.style.opacity = "0";
  menu.style.visibility = "hidden";
  menu.style.transform = "translateY(10px)";

  if (arrow) {
    arrow.style.transform = "rotate(0deg)";
  }

  item.classList.remove("dropdown-open");
}

function toggleMobileDropdown(item, menu, arrow) {
  const isVisible = menu.style.visibility === "visible";

  // Закрываем все другие меню
  closeAllDropdownsExcept(item);

  if (isVisible) {
    closeDropdown(item, menu, arrow);
  } else {
    openDropdown(item, menu, arrow);
  }
}

function closeAllDropdowns() {
  const dropdownItems = document.querySelectorAll(
    ".nav__item--dropdown, .nav__item-link"
  );

  dropdownItems.forEach((item) => {
    const menu = item.querySelector(".dropdown-menu");
    const arrow = item.querySelector(".nav__arrow");

    if (menu) {
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
      menu.style.transform = "translateY(10px)";
    }
    if (arrow) {
      arrow.style.transform = "rotate(0deg)";
    }

    item.classList.remove("dropdown-open");
  });
}

function closeAllDropdownsExcept(exceptItem) {
  const dropdownItems = document.querySelectorAll(
    ".nav__item--dropdown, .nav__item-link"
  );

  dropdownItems.forEach((item) => {
    if (item !== exceptItem) {
      const menu = item.querySelector(".dropdown-menu");
      const arrow = item.querySelector(".nav__arrow");

      if (menu) {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        menu.style.transform = "translateY(10px)";
      }
      if (arrow) {
        arrow.style.transform = "rotate(0deg)";
      }

      item.classList.remove("dropdown-open");
    }
  });
}

// Обновите функцию init чтобы использовать новую функцию
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация всех компонентов
  initPopup();
  initScrollToTop();
  initForms();
  initNavigationDropdowns(); // Заменяем старые функции
  initGalleryModal();
  initReviewsCarousel();
});

// ==================== ГАЛЕРЕЯ С МОДАЛЬНЫМ ОКНОМ ====================
function initGalleryModal() {
  const galleryItems = document.querySelectorAll(".gallery__item");
  const galleryModal = document.querySelector(".gallery-modal");
  const modalImage = document.querySelector(".gallery-modal__image");
  const modalClose = document.querySelector(".gallery-modal__close");
  const modalPrev = document.querySelector(".gallery-modal__prev");
  const modalNext = document.querySelector(".gallery-modal__next");
  const modalOverlay = document.querySelector(".gallery-modal__overlay");

  if (!galleryModal || !modalImage) return;

  let currentIndex = 0;
  const images = Array.from(galleryItems).map((item) => ({
    src: item.querySelector("img").src,
    alt: item.querySelector("img").alt,
  }));

  // Открытие модального окна
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      currentIndex = index;
      openModal();
    });
  });

  // Обработчики событий
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  modalNext.addEventListener("click", nextImage);
  modalPrev.addEventListener("click", prevImage);

  // Навигация с клавиатуры
  document.addEventListener("keydown", handleKeyboardNavigation);

  // Swipe для мобильных устройств
  let touchStartX = 0;
  let touchEndX = 0;

  galleryModal.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  galleryModal.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function openModal() {
    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].alt;
    galleryModal.classList.add("active");
    document.body.style.overflow = "hidden";
    updateNavigation();
  }

  function closeModal() {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function nextImage() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateModalImage();
    }
  }

  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      updateModalImage();
    }
  }

  function updateModalImage() {
    modalImage.style.opacity = "0";
    setTimeout(() => {
      modalImage.src = images[currentIndex].src;
      modalImage.alt = images[currentIndex].alt;
      modalImage.style.opacity = "1";
      updateNavigation();
    }, 200);
  }

  function updateNavigation() {
    if (modalPrev) modalPrev.disabled = currentIndex === 0;
    if (modalNext) modalNext.disabled = currentIndex === images.length - 1;
  }

  function handleKeyboardNavigation(e) {
    if (!galleryModal.classList.contains("active")) return;

    switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowLeft":
        prevImage();
        break;
      case "ArrowRight":
        nextImage();
        break;
    }
  }

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      nextImage();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      prevImage();
    }
  }
}

// ==================== КАРУСЕЛЬ ОТЗЫВОВ ====================
function initReviewsCarousel() {
  const slider = document.querySelector(".reviews-slider");
  const slides = document.querySelectorAll(".review-item");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!slider || slides.length === 0) return;

  let currentPosition = 0;
  const slidesPerView = getSlidesPerView();
  const totalSlides = slides.length;

  // Создаем точки для навигации
  createDots();

  // Обработчики событий
  if (prevBtn) prevBtn.addEventListener("click", prevPosition);
  if (nextBtn) nextBtn.addEventListener("click", nextPosition);

  // Обработка клавиатуры
  document.addEventListener("keydown", handleCarouselKeyboard);

  // Swipe для мобильных
  initSwipe();

  // Адаптация при изменении размера окна
  window.addEventListener("resize", handleResize);

  function getSlidesPerView() {
    return window.innerWidth <= 1200 ? 1 : 2;
  }

  function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("data-dot", i);
      dot.addEventListener("click", () => goToPosition(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll(".carousel-dot");
    const activeDotIndex = currentPosition;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDotIndex);
    });
  }

  function goToPosition(position) {
    currentPosition = position;
    updateSlider();
    updateDots();
  }

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 30;
    let translateX;

    if (slidesPerView === 2) {
      switch (currentPosition) {
        case 0:
          translateX = 0;
          break;
        case 1:
          translateX = -1 * slideWidth;
          break;
        case 2:
          translateX = -2 * slideWidth;
          break;
      }
    } else {
      switch (currentPosition) {
        case 0:
          translateX = 0;
          break;
        case 1:
          translateX = -1 * slideWidth;
          break;
        case 2:
          translateX = -2 * slideWidth;
          break;
      }
    }

    slider.style.transform = `translateX(${translateX}px)`;
  }

  function nextPosition() {
    currentPosition = (currentPosition + 1) % 3;
    updateSlider();
    updateDots();
  }

  function prevPosition() {
    currentPosition = (currentPosition - 1 + 3) % 3;
    updateSlider();
    updateDots();
  }

  function handleCarouselKeyboard(e) {
    if (e.key === "ArrowLeft") prevPosition();
    if (e.key === "ArrowRight") nextPosition();
  }

  function initSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;

      if (touchEndX < touchStartX - swipeThreshold) {
        nextPosition();
      }

      if (touchEndX > touchStartX + swipeThreshold) {
        prevPosition();
      }
    }
  }

  function handleResize() {
    const newSlidesPerView = getSlidesPerView();

    if (newSlidesPerView !== slidesPerView) {
      currentPosition = 0;
      updateSlider();
      updateDots();
    }
  }
}

// Анимации при прокрутке
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация анимаций
  initScrollAnimations();
});

function initScrollAnimations() {
  // Создаем наблюдатель за элементами
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Добавляем класс для отслеживания анимированных элементов
        element.classList.add("animating");

        // Анимация для hero__title
        if (element.classList.contains("hero__title")) {
          setTimeout(() => animateHeroTitle(element), 200);
        }

        // Анимация для hero__btn
        if (element.classList.contains("hero__btn")) {
          setTimeout(() => animateHeroButton(element), 600);
        }

        // Анимация для about__img
        if (element.classList.contains("about__img")) {
          const index = parseInt(element.getAttribute("data-index") || "0");
          setTimeout(() => animateAboutImage(element, index), index * 400);
        }

        // Анимация для service-card__img
        if (element.classList.contains("service-card__img")) {
          const index = parseInt(element.getAttribute("data-index") || "0");
          setTimeout(
            () => animateServiceCardImage(element, index),
            index * 300
          );
        }

        // Анимация для promo__info
        if (element.classList.contains("promo__info")) {
          setTimeout(() => animatePromoInfo(element), 400);
        }

        // Анимация для promo__img
        if (element.classList.contains("promo__img")) {
          setTimeout(() => animatePromoImage(element), 800);
        }

        // Анимация для advantage__icon
        if (element.classList.contains("advantage__icon")) {
          const index = parseInt(element.getAttribute("data-index") || "0");
          setTimeout(() => animateAdvantageIcon(element, index), index * 400);
        }

        // Анимация для reviews-image
        if (element.classList.contains("reviews-image")) {
          setTimeout(() => animateReviewsImage(element), 600);
        }

        // Анимация для gallery__item
        if (element.classList.contains("gallery__item")) {
          const index = parseInt(element.getAttribute("data-index") || "0");
          setTimeout(() => animateGalleryItem(element, index), index * 200);
        }

        // Отключаем наблюдение после анимации
        setTimeout(() => {
          observer.unobserve(element);
          element.classList.add("animated");
          element.classList.remove("animating");
        }, 2000);
      }
    });
  }, observerOptions);

  // Начинаем наблюдение за элементами
  observeElements(observer);
}

function observeElements(observer) {
  // Hero элементы
  const heroTitle = document.querySelector(".hero__title");
  const heroButton = document.querySelector(".hero__btn");

  if (heroTitle) {
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateX(-100px)";
    observer.observe(heroTitle);
  }

  if (heroButton) {
    heroButton.style.opacity = "0";
    heroButton.style.transform = "translateY(-100px) rotate(-180deg)";
    observer.observe(heroButton);
  }

  // About изображения
  const aboutImages = document.querySelectorAll(".about__img");
  aboutImages.forEach((img, index) => {
    img.setAttribute("data-index", index);
    img.style.opacity = "0";

    if (index === 0) {
      img.style.transform = "translateY(100px) scale(0.8)";
    } else if (index === 1) {
      img.style.transform = "translateX(100px) scale(0.8)";
    } else {
      img.style.transform = "translateX(-100px) scale(0.8)";
    }

    observer.observe(img);
  });

  // Service card изображения
  const serviceCardImages = document.querySelectorAll(".service-card__img");
  serviceCardImages.forEach((img, index) => {
    img.setAttribute("data-index", index);
    img.style.opacity = "0";
    img.style.transform = "scale(0.3) rotate(10deg)";
    observer.observe(img);
  });

  // Promo элементы
  const promoInfo = document.querySelector(".promo__info");
  const promoImage = document.querySelector(".promo__img");

  if (promoInfo) {
    promoInfo.style.opacity = "0";
    promoInfo.style.transform = "translateX(-100px)";
    observer.observe(promoInfo);
  }

  if (promoImage) {
    promoImage.style.opacity = "0";
    promoImage.style.transform = "translateX(100px)";
    observer.observe(promoImage);
  }

  // Advantage иконки
  const advantageIcons = document.querySelectorAll(".advantage__icon");
  advantageIcons.forEach((icon, index) => {
    icon.setAttribute("data-index", index);
    icon.style.opacity = "0";
    icon.style.transform = "rotate(-720deg) scale(0.5)";
    observer.observe(icon);
  });

  // Reviews image
  const reviewsImage = document.querySelector(".reviews-image");
  if (reviewsImage) {
    reviewsImage.style.opacity = "0";
    reviewsImage.style.transform = "translateX(-100px) scale(0.9)";
    observer.observe(reviewsImage);
  }

  // Gallery items
  const galleryItems = document.querySelectorAll(".gallery__item");
  galleryItems.forEach((item, index) => {
    item.setAttribute("data-index", index);
    item.style.opacity = "0";
    item.style.transform = "scale(0.5) rotate(5deg)";
    observer.observe(item);
  });
}

// Анимация hero__title - выезд слева (медленнее)
function animateHeroTitle(element) {
  element.style.transition = "all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
  }, 50);
}

// Анимация hero__btn - спуск сверху (медленнее)
function animateHeroButton(element) {
  element.style.transition = "all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0) rotate(0deg)";
  }, 50);
}

// Анимация about__img - разные направления для разных изображений (медленнее)
function animateAboutImage(element, index) {
  element.style.transition = "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0) translateY(0) scale(1)";
  }, 50);
}

// Анимация service-card__img - зум из маленького в исходный размер (медленнее)
function animateServiceCardImage(element, index) {
  element.style.transition = "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "scale(1) rotate(0deg)";
  }, 50);
}

// Анимация promo__info - выезд слева (медленнее)
function animatePromoInfo(element) {
  element.style.transition = "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
  }, 50);
}

// Анимация promo__img - выезд справа (медленнее)
function animatePromoImage(element) {
  element.style.transition = "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0)";
  }, 50);
}

// Анимация advantage__icon - вращение как манетки (медленнее)
function animateAdvantageIcon(element, index) {
  element.style.transition = "all 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "rotate(0deg) scale(1)";
  }, 50);
}

// Анимация reviews-image - выезд слева (медленнее)
function animateReviewsImage(element) {
  element.style.transition = "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateX(0) scale(1)";
  }, 50);
}

// Анимация gallery__item - зум из маленького в исходный размер (медленнее)
function animateGalleryItem(element, index) {
  element.style.transition = "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)";
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "scale(1) rotate(0deg)";
  }, 50);
}

// Добавляем CSS стили для анимаций
function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        /* Сохраняем конечное состояние после анимации */
        .hero__title.animated,
        .hero__btn.animated,
        .about__img.animated,
        .service-card__img.animated,
        .promo__info.animated,
        .promo__img.animated,
        .advantage__icon.animated,
        .reviews-image.animated,
        .gallery__item.animated {
            opacity: 1 !important;
            transform: none !important;
        }
        
        /* Убираем transition после анимации */
        .hero__title.animated,
        .hero__btn.animated,
        .about__img.animated,
        .service-card__img.animated,
        .promo__info.animated,
        .promo__img.animated,
        .advantage__icon.animated,
        .reviews-image.animated,
        .gallery__item.animated {
            transition: none !important;
        }
        
        /* Показываем элементы до начала анимации */
        .hero__title,
        .hero__btn,
        .about__img,
        .service-card__img,
        .promo__info,
        .promo__img,
        .advantage__icon,
        .reviews-image,
        .gallery__item {
            visibility: visible;
        }
        
        /* Медленные easing функции для плавности */
        .hero__title.animating,
        .hero__btn.animating,
        .about__img.animating,
        .service-card__img.animating,
        .promo__info.animating,
        .promo__img.animating,
        .advantage__icon.animating,
        .reviews-image.animating,
        .gallery__item.animating {
            transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
    `;
  document.head.appendChild(style);
}

// Инициализация стилей при загрузке
document.addEventListener("DOMContentLoaded", addAnimationStyles);

// ==================== МОБИЛЬНОЕ МЕНЮ ====================
function initMobileMenu() {
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu__close");
  const mobileMenuOverlay = document.querySelector(".mobile-menu__overlay");
  const body = document.body;

  if (!burgerMenu || !mobileMenu) {
    console.log("Mobile menu elements not found");
    return;
  }

  console.log("Initializing mobile menu");

  // Функция открытия меню
  function openMenu() {
    console.log("Opening menu");
    burgerMenu.classList.add("active");
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    body.style.overflow = "hidden";
  }

  // Функция закрытия меню
  function closeMenu() {
    console.log("Closing menu");
    burgerMenu.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    body.style.overflow = "";

    // Закрываем все выпадающие меню
    closeAllMobileDropdowns();
  }

  // Открытие меню по клику на бургер
  burgerMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    openMenu();
  });

  // Закрытие меню по клику на крестик
  mobileMenuClose.addEventListener("click", function (e) {
    e.stopPropagation();
    closeMenu();
  });

  // Закрытие меню по клику на оверлей
  mobileMenuOverlay.addEventListener("click", function (e) {
    e.stopPropagation();
    closeMenu();
  });

  // Закрытие меню при нажатии на Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Предотвращаем закрытие при клике внутри меню
  mobileMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Адаптация для ресайза окна
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200 && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Инициализация выпадающих меню в мобильной версии
  initMobileDropdowns();
}

// ==================== ВЫПАДАЮЩИЕ МЕНЮ В МОБИЛЬНОЙ ВЕРСИИ ====================
function initMobileDropdowns() {
  const mobileNavItems = document.querySelectorAll(".mobile-nav__item");

  mobileNavItems.forEach((item) => {
    const link = item.querySelector(".mobile-nav__link");
    const dropdown = item.querySelector(".mobile-dropdown-menu");
    const arrow = item.querySelector(".mobile-nav__arrow");

    if (!link || !dropdown) return;

    // Добавляем класс для ссылок с выпадающим меню
    link.classList.add("has-dropdown");

    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileDropdown(item, dropdown, arrow);
    });

    // Обработка кликов по ссылкам в выпадающем меню
    const dropdownLinks = dropdown.querySelectorAll(".mobile-dropdown-link");
    dropdownLinks.forEach((dropdownLink) => {
      dropdownLink.addEventListener("click", function (e) {
        e.stopPropagation();
        // Закрываем меню после выбора пункта
        setTimeout(() => {
          closeMobileMenu();
        }, 300);
      });
    });
  });

  // Закрытие всех выпадающих меню при клике вне меню
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".mobile-nav__item")) {
      closeAllMobileDropdowns();
    }
  });
}

function toggleMobileDropdown(item, dropdown, arrow) {
  const isActive = item.classList.contains("active");

  // Закрываем все другие выпадающие меню
  closeAllMobileDropdownsExcept(item);

  if (isActive) {
    closeMobileDropdown(item, dropdown, arrow);
  } else {
    openMobileDropdown(item, dropdown, arrow);
  }
}

function openMobileDropdown(item, dropdown, arrow) {
  item.classList.add("active");
  dropdown.classList.add("active");

  if (arrow) {
    arrow.style.transform = "rotate(180deg)";
  }
}

function closeMobileDropdown(item, dropdown, arrow) {
  item.classList.remove("active");
  dropdown.classList.remove("active");

  if (arrow) {
    arrow.style.transform = "rotate(0deg)";
  }
}

function closeAllMobileDropdowns() {
  const mobileNavItems = document.querySelectorAll(".mobile-nav__item");

  mobileNavItems.forEach((item) => {
    const dropdown = item.querySelector(".mobile-dropdown-menu");
    const arrow = item.querySelector(".mobile-nav__arrow");

    closeMobileDropdown(item, dropdown, arrow);
  });
}

function closeAllMobileDropdownsExcept(exceptItem) {
  const mobileNavItems = document.querySelectorAll(".mobile-nav__item");

  mobileNavItems.forEach((item) => {
    if (item !== exceptItem) {
      const dropdown = item.querySelector(".mobile-dropdown-menu");
      const arrow = item.querySelector(".mobile-nav__arrow");

      closeMobileDropdown(item, dropdown, arrow);
    }
  });
}

function closeMobileMenu() {
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu__overlay");
  const body = document.body;

  if (burgerMenu) burgerMenu.classList.remove("active");
  if (mobileMenu) mobileMenu.classList.remove("active");
  if (mobileMenuOverlay) mobileMenuOverlay.classList.remove("active");
  body.style.overflow = "";

  closeAllMobileDropdowns();
}

// Обновите функцию init чтобы добавить мобильное меню
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация всех компонентов
  initPopup();
  initScrollToTop();
  initForms();
  initNavigationDropdowns();
  initGalleryModal();
  initReviewsCarousel();
  initMobileMenu(); // Добавляем инициализацию мобильного меню

  console.log("All components initialized");
});
