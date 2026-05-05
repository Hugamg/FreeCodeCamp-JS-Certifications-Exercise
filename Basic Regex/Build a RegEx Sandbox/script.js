const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn"); 
const testResult = document.getElementById("result"); 

const caseInsensitiveFlag = document.getElementById('i');
const globalFlag = document.getElementById('g');

function getFlags() {
    let flags = '';
    if (caseInsensitiveFlag.checked) flags += 'i';
    if (globalFlag.checked) flags += 'g';
    return flags;
}


testButton.addEventListener("click", () =>{
  const regex = new RegExp(regexPattern.value,getFlags());const matches = stringToTest.textContent.match(regex);

  if(matches){
    const highlighted = stringToTest.textContent.replace(regex, "<span class='highlight'>$&</span>");

    stringToTest.innerHTML = highlighted;
    testResult.innerHTML = matches.join(", ");
  } else {
    testResult.innerHTML = "no match";
  }
})


/*if (caseInsensitiveFlag.checked) {
  return `/${regexPattern.value}/i`
} else if (globalFlag.checked) { return `/${regexPattern.value}/g`
} else {

}*/


