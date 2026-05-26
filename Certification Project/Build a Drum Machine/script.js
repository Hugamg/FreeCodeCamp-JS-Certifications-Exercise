const drumPad = document.querySelectorAll(".drum-pad");
const drumValue = document.getElementById("display");

drumPad.forEach((btn) => {
  btn.addEventListener("click", () => {
    let audioSrc = btn.querySelector(".clip");
    audioSrc.play();
    drumValue.innerHTML = btn.textContent;
    })
})

document.addEventListener("keydown", (k) => {
  drumPad.forEach((btn) => {
    let btnValue = btn.textContent.trim();
    if(btnValue === k.key.toUpperCase()){
      console.log(btnValue === k.key.toUpperCase());
      let audioSrc = btn.querySelector(".clip");
      audioSrc.play();
      drumValue.innerHTML = btn.textContent;
    }
  })
})