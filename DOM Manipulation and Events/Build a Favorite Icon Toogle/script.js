function updateBtns(btn){
  let isFilled = btn.classList.toggle("filled");

  btn.innerHTML = isFilled ? "&#10084;" : "&#9825;";
}


const btns = document.querySelectorAll(".favorite-icon");

btns.forEach((btn) => {btn.addEventListener("click", () =>{ updateBtns(btn)})});