function myReplace(str, wordToBeReplaced, wordReplaced){
  
  if(/^[A-Z]/.test(wordToBeReplaced)){
  
    let premierLettre = wordReplaced[0].toUpperCase();
    let reste = wordReplaced.slice(1);
    let resultat = premierLettre + reste;

    return str.replace(wordToBeReplaced,resultat)
  } else {
    return str.replace(wordToBeReplaced,wordReplaced.toLowerCase())
  }
}