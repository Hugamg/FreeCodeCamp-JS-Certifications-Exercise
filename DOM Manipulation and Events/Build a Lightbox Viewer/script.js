let galleryItem = document.querySelectorAll(".gallery-item");
let lightBox = document.querySelector(".lightbox");
let lightBoxImage =  document.querySelector("#lightbox-image");
let buttonElement = document.getElementById("close-btn");

galleryItem.forEach((element) => element.addEventListener("click", () => { 
  lightBox.style.display = "flex"; 
  lightBoxImage.src = element.src.replace("-thumbnail", "");

}));

const closeLightBox = () => lightBox.style.display = "none";

buttonElement.addEventListener("click", closeLightBox);
lightBox.addEventListener("click", (e) => {
  if (e.target === lightBox) closeLightBox();
});
