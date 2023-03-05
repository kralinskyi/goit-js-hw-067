import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

gallery.insertAdjacentHTML("beforeend", galleryMarkup);
gallery.addEventListener("click", onGalleryClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
      `;
    })
    .join("");
}

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") return;

  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: () => window.addEventListener("keydown", onEscClose),
      onClose: () => window.removeEventListener("keydown", onEscClose),
    }
  );
  instance.show();

  function onEscClose(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
