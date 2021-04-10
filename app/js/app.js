import {
  Swiper,
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  Controller,
  Parallax,
} from "swiper";
Swiper.use([
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  Controller,
  Parallax,
]);

import { gsap, Power2 } from "gsap";

import MicroModal from "micromodal";

document.addEventListener("DOMContentLoaded", () => {
  /* Menu header */
  const menuBtn = document.getElementById("menuBtn");
  const menuContent = document.getElementById("menu-content");
  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    menuContent.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });
  document.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target !== menuContent) {
      menuBtn.classList.remove("active");
      menuContent.classList.remove("active");
    }
  });

  /* Modal menu tabs */
  const modalTabs303M = document.getElementById("modal-tabs303M");
  const modalTabs305M = document.getElementById("modal-tabs305M");
  const modalTabs307M = document.getElementById("modal-tabs307M");
  const modalContent303M = document.getElementById("modal-content303M");
  const modalContent305M = document.getElementById("modal-content305M");
  const modalContent307M = document.getElementById("modal-content307M");

  const changeClass = (id, element) => {
    for (let i = 0; i < id.children.length; i++) {
      id.children[i].classList.remove("active");
      element.classList.add("active");
    }
  };

  const changeContent = (id, content) => {
    id.addEventListener("click", (event) => {
      const currentTab = event.target.dataset.tabs;
      changeClass(id, event.target);

      for (let i = 0; i < id.children.length; i++) {
        content.children[i].classList.remove("active");

        if (content.children[i].dataset.content === currentTab) {
          content.children[i].classList.add("active");
        }
      }
    });
  };

  changeContent(modalTabs303M, modalContent303M);
  changeContent(modalTabs305M, modalContent305M);
  changeContent(modalTabs307M, modalContent307M);

  MicroModal.init({
    openTrigger: "data-micromodal-close",
    closeTrigger: "data-micromodal-close",
    disableScroll: true,
    disableFocus: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  });

  const swiperText = new Swiper(".slider-text", {
    loop: false,
    effect: "slide",
    speed: 2400,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });

  const swiperIMG = new Swiper(".slider-img", {
    loop: false,
    speed: 2400,
    parallax: true,
    pagination: {
      el: ".slider-pagination-count .total",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return `0${total}`;
      },
    },
  });

  swiperIMG.controller.control = swiperText;
  swiperText.controller.control = swiperIMG;

  // slideChange

  let curnum = document.querySelector(".current"),
    pagcur = document.querySelector(".slider-pagination-current"),
    gear = document.querySelector(".slider-gear");

  swiperText.on("slideChange", function () {
    let ind = swiperText.realIndex + 1;
    gsap.to(curnum, 0.2, {
      force3D: true,
      y: -10,
      opacity: 0,
      ease: Power2.easeOut,
      onComplete: function () {
        gsap.to(curnum, 0.1, {
          force3D: true,
          y: 10,
        });
        curnum.innerHTML = `0${ind}`;
        pagcur.innerHTML = `0${ind}<span class="slider-pagination-current__dot">.</span>`;
      },
    });
    gsap.to(curnum, 0.2, {
      force3D: true,
      y: 0,
      delay: 0.3,
      opacity: 1,
      ease: Power2.easeOut,
    });
  });

  swiperText.on("slideNextTransitionStart", function () {
    gsap.to(gear, 2.8, {
      rotation: "+=45",
      ease: Power2.easeOut,
    });
  });

  swiperText.on("slidePrevTransitionStart", function () {
    gsap.to(gear, 2.8, {
      rotation: "-=45",
      ease: Power2.easeOut,
    });
  });
});
