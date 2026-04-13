let textZone =  document.querySelector("#text-input");
let countArea = document.querySelector("#char-count");

function changeCounter(string){
  let  stringLength = string.length;

  if(stringLength >= 50){
    let trimmedString = string.slice(0, 50);
    textZone.value = trimmedString;
    countArea.textContent = `Character Count: 50/50`;
    textZone.value.slice(0,50);
    countArea.style.color = "red";

    return;
  }
   countArea.textContent = `Character Count: ${stringLength}/50`;
   countArea.style.color = "black";
   
}

textZone.addEventListener("click", () => {
textZone.value = "";
});
textZone.addEventListener("input", () => {
  changeCounter(textZone.value);
});