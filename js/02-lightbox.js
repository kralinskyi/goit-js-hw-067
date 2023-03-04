import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryMarkup);

gallery.addEventListener("click", onGalleryClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href=${original}>
  <img class="gallery__image" src=${preview} alt=${description} />
</a>`;
    })
    .join("");
}

function onGalleryClick(event) {
  event.preventDefault();

  const linkEl = event.target.closest(".gallery__link");
  if (!linkEl) return;
}

new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  captionPosition: "bottom",
});
