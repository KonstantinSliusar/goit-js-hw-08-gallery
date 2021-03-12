import galleryItems from "./gallery-items.js";



function createListItems(itemsList) {
  return itemsList.reduce((acc, item, idx) => {
    acc += `<li class="gallery__item"><a
    class="gallery__link"
    href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
      data-index="${idx}"
    /></a></li>`;
    return acc;
  }, "");
}
const galleryListRef = document.querySelector(".js-gallery");
galleryListRef.insertAdjacentHTML("afterbegin", createListItems(galleryItems));

//

const imgModalRef = document.querySelector(".lightbox__image");
const lightboxRef = document.querySelector(".lightbox");
const closeBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const overlayRef = document.querySelector(".lightbox__overlay");
let imgIndex;

galleryListRef.addEventListener("click", onOpenModal);
closeBtnRef.addEventListener("click", onCloseModal);

function onOpenModal(event) {
  overlayRef.addEventListener("click", onOverlayClick);
  window.addEventListener("keydown", onPressKey);
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;
  imgModalRef.src = event.target.dataset.source;
  imgIndex = Number(event.target.dataset.index);
  lightboxRef.classList.add("is-open");
};

function onCloseModal() {
  overlayRef.removeEventListener("click", onOverlayClick);
  window.removeEventListener("keydown", onPressKey);
  lightboxRef.classList.remove("is-open");
  imgModalRef.src = "";
};


function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressKey(event) {
  event.preventDefault();
  if (event.code === "Escape") {
    onCloseModal();
  }
  if (event.code === "ArrowRight") {
    if (imgIndex >= galleryItems.length - 1) {
      return;
    } else {
      imgIndex += 1;
      imgModalRef.src = galleryItems[imgIndex].original;
    }
  }
  if (event.code === "ArrowLeft") {
    if (imgIndex === 0) {
      return;
    } else {
      imgIndex -= 1;
      imgModalRef.src = galleryItems[imgIndex].original;
    }
  }
}
