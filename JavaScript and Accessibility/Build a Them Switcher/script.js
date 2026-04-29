const themes = [{
  name: "light", 
  message: "The light is on your side"
},
{
  name: "dark", 
  message: "Take a moment in a dark with your mind"
},
{
  name: "japan", 
  message: "Explore the beauty of Japan"
}  
];

const themeSwitcher = document.getElementById("theme-switcher-button");
const themeDropdown = document.getElementById("theme-dropdown");
const theStatus = document.getElementById("status"); 

themeSwitcher.addEventListener("click", () => {
  const isOpen = !themeDropdown.hidden;
themeDropdown.hidden = isOpen;
themeSwitcher.setAttribute("aria-expanded", String(!isOpen));

})

themeDropdown.addEventListener("click", (e) => {
  const selectedTheme = themes.find((value) => value.name === e.target.textContent.toLowerCase());

  if(!selectedTheme) return;

  theStatus.textContent = selectedTheme.message;

  document.body.className ="theme-"+selectedTheme.name;

  themeDropdown.hidden = true;
  themeSwitcher.setAttribute("aria-expanded", "false");
    })
  