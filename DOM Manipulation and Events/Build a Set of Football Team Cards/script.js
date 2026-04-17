let footballTeam = {
  team : "Real De Madrid" ,
  year: 2026,
  headCoach: "Alvaro Arbeloa",
  players : [
    {
      name : "Dani Carvajal",
      position : "defender",
      isCaptain : true,
    },
    {
      name : "Eder Militao",
      position : "defender",
      isCaptain : false,
    },
    {
      name : "David Alabala",
      position : "defender",
      isCaptain : false,
    },
    {
      name : "Kilian Mbappé",
      position : "forward",
      isCaptain : false,
    },
    {
      name : "Vinicius Junior",
      position : "forward",
      isCaptain : false,
    },
    {
      name : "Jude Bellingham",
      position : "midfielder",
      isCaptain : false,
    },
    {
      name : "Eduardo Camavinga",
      position : "midfielder",
      isCaptain : false,
    },
    {
      name : "Federico Valverde",
      position : "midfielder",
      isCaptain : false,
    },
    {
      name : "Thibault Courtois",
      position : "goalkeeper",
      isCaptain : false
    }
  ]
}


let teamName = document.getElementById("team");
let teamYear = document.getElementById("year");
let teamCoach = document.getElementById("head-coach");

teamName.innerHTML = footballTeam["team"]; 
teamYear.innerHTML = footballTeam["year"]; 
teamCoach.innerHTML = footballTeam["headCoach"];

let playerCards= document.querySelector("#player-cards");
let selectPlayer = document.getElementById("players");

function filter(filterCategory) {
const differentPlayers =
    filterCategory === "all"
      ? footballTeam.players
      : footballTeam.players.filter(
          ({ position }) => position === filterCategory
        );

  return differentPlayers.map(({ name, position,isCaptain }) => {
    if(isCaptain == true){
      return `
          <div class="player-card">
            <h2>(Captain)${name}</h2>
            <p>Position: ${position}</p>
          </div>
        `;
    }
    return `
          <div class="player-card">
            <h2>${name}</h2>
            <p>Position: ${position}</p>
          </div>
        `;
    
    }).join("")
}

selectPlayer.addEventListener("change", () => {
  playerCards.innerHTML = filter(selectPlayer.value);
});

