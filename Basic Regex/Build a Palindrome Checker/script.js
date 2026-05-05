const btn = document.getElementById("check-btn");
const inputText = document.getElementById("text-input");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  const cleanedStr = inputText.value.toLowerCase().normalize('NFD') // Normaliser les caractères accentués
  .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
  .replace(/[^a-z0-9]/g, ''); // Garder seulement lettres et chiffres

  const len = cleanedStr.length;
  
  if(inputText.value === ""){
    return alert("Please input a value");
  }
    
  // Vérification de palindrome
  for (let i = 0; i < Math.floor(len / 2); i++) {
      if (cleanedStr[i] !== cleanedStr[len - 1 - i]) {
          let finalResult = `${inputText.value} is not a palindrome `;
          result.textContent = finalResult;
          return result.textContent  
      }
  }
  let finalResult = `${inputText.value} is a palindrome `;
  result.textContent = finalResult;
    return result.textContent;
});