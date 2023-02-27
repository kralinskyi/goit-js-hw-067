import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryMarkup);

gallery.addEventListener("click", onGalleryClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
        </div>
      `;
    })
    .join("");
}

function onGalleryClick(event) {
  event.preventDefault();

  const linkEl = event.target.closest(".gallery__link");
  if (!linkEl) return;

  const instance = basicLightbox.create(`
    <img src="${linkEl.href}" alt="${linkEl.querySelector("img").alt}" />
  `);

  instance.show();

  const imgEl = instance.element().querySelector("img");
  imgEl.addEventListener("click", onCloseClick);

  function onCloseClick(event) {
    event.preventDefault();
    instance.close();
    imgEl.removeEventListener("click", onCloseClick);
  }

  document.addEventListener("keydown", onEscPress);

  function onEscPress(event) {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onEscPress);
      imgEl.removeEventListener("click", onCloseClick);
    }
  }
}
