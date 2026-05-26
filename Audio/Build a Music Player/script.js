// --- SELECTION DES ELEMENTS HTML ---
const audio = new Audio();
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const vinylWrapper = document.getElementById("vinyl-wrapper"); // NOUVEAU
const vinylRecord = document.getElementById("vinyl-record");
const albumArt = document.getElementById("album-art");
const equalizer = document.getElementById("equalizer");

const titleDisplay = document.getElementById("player-song-title");
const artistDisplay = document.getElementById("player-song-artist");
const timeDisplayCurrent = document.getElementById("current-time");
const timeDisplayTotal = document.getElementById("total-time");

// --- DONNEES DES MUSIQUES ---
const userData = {
  songs: [
    {
      id: 0,
      title: "You got it",
      artist: "Mk.gee",
      duration: "2:14",
      src: "./song/Mk.gee - You got it (Official Audio).mp3",
      cover: "./cover_album/Mk.gee.jpg"
    },
    {
      id: 1,
      title: "Do I Wanna Know?",
      artist: "Arctic Monkeys",
      duration: "4:25",
      src: "./song/Arctic Monkeys - Do I Wanna Know (Official Video).mp3",
      cover: "./cover_album/Do_I_Wanna_Know.jpg"
    },
    {
      id: 2,
      title: "Wonderwall",
      artist: "Oasis",
      duration: "4:39",
      src: "./song/Oasis - Wonderwall (Official Video).mp3",
      cover: "./cover_album/oasis.jpg"
    },
    {
      id: 3,
      title: "I Want",
      artist: "Mk.gee",
      duration: "3:38",
      src: "./song/Mk gee - I Want (Official Audio).mp3",
      cover: "./cover_album/Mk.gee.jpg"
    },
    {
      id: 4,
      title: "505",
      artist: "Arctic Monkeys",
      duration: "4:14",
      src: "./song/505 - Arctic Monkeys.mp3",
      cover: "./cover_album/505.jpg"
    },
    {
      id: 5,
      title: "K",
      artist: "Cigarettes After Sex",
      duration: "5:17",
      src: "./song/K. - Cigarettes After Sex.mp3",
      cover: "./cover_album/K.jpg"
    },
    {
      id: 6,
      title: "Creep",
      artist: "Radiohead",
      duration: "3:56",
      src: "./song/Radiohead - Creep.mp3",
      cover: "./cover_album/Creep.jpg"
    },
    {
      id: 7,
      title: "Stop Crying Your Heart Out",
      artist: "Oasis",
      duration: "4:54",
      src: "./song/Oasis - Stop Crying Your Heart Out (Official Video).mp3",
      cover: "./cover_album/oasis_2.jpg"
    },
    {
      id: 8,
      title: "No Surprises",
      artist: "Radiohead",
      duration: "3:47",
      src: "./song/Radiohead - No Surprises.mp3",
      cover: "./cover_album/Creep.jpg"
    },
    {
      id: 9,
      title: "Apocalypse",
      artist: "Cigarettes After Sex",
      duration: "4:50",
      src: "./song/Cigarettes After Sex - Apocalypse (Lyrics).mp3",
      cover: "./cover_album/Apocalypse.jpg"
    }
  ],
  currentSong: null,
  songCurrentTime: 0,
};

// --- FONCTIONS DU LECTEUR ---

const playSong = (id) => {
  const song = userData.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  // Mise à jour de l'image de la pochette
  if (albumArt) {
    albumArt.src = song.cover;
  }

  if (userData.currentSong === null || userData.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }

  userData.currentSong = song;

  // Met à jour les textes
  titleDisplay.textContent = song.title;
  artistDisplay.textContent = song.artist;
  timeDisplayTotal.textContent = song.duration;

  highlightCurrentSong();

  // Démarre l'audio et les animations
  audio.play().catch(e => console.log("Erreur de lecture : vérifie que tes fichiers mp3 sont bien dans le dossier", e));

  // Gère l'affichage des boutons Play/Pause
  if(playButton && pauseButton) {
    playButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
  }

  if (vinylRecord) vinylRecord.classList.add("playing");
  if (equalizer) equalizer.classList.add("playing");
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  audio.pause();

  // Gère l'affichage des boutons Play/Pause
  if(playButton && pauseButton) {
    pauseButton.classList.add("hidden");
    playButton.classList.remove("hidden");
  }

  // Stoppe les animations
  if (vinylRecord) vinylRecord.classList.remove("playing");
  if (equalizer) equalizer.classList.remove("playing");
};

const playNextSong = () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  } else {
    const currentSongIndex = userData.songs.findIndex((song) => song.id === userData.currentSong.id);
    const nextSong = userData.songs[currentSongIndex + 1];

    if (nextSong) {
      playSong(nextSong.id);
    } else {
      playSong(userData.songs[0].id); // Revient au début de la playlist
    }
  }
};

const playPreviousSong = () => {
  if (userData.currentSong === null) return;

  const currentSongIndex = userData.songs.findIndex((song) => song.id === userData.currentSong.id);
  const previousSong = userData.songs[currentSongIndex - 1];

  if (previousSong) {
    playSong(previousSong.id);
  } else {
    playSong(userData.songs[userData.songs.length - 1].id); // Va à la toute fin
  }
};

// --- MISE A JOUR DU TEMPS EN DIRECT ---

audio.addEventListener('timeupdate', () => {
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  // Empêcher l'affichage de "NaN:NaN"
  if(!isNaN(currentMinutes) && !isNaN(currentSeconds)) {
      timeDisplayCurrent.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
  }
});

audio.addEventListener("ended", () => {
  playNextSong();
});

// --- GESTION DE LA PLAYLIST ---
const renderSongs = (array) => {
  const songsHTML = array.map((song) => {
    return `
      <li id="song-${song.id}" class="playlist-song" onclick="playSong(${song.id})">
        <img class="playlist-song-cover" src="${song.cover}" alt="${song.title}">
        <div class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
        </div>
        <span class="playlist-song-duration">${song.duration}</span>
      </li>
    `;
  }).join("");

  playlistSongs.innerHTML = songsHTML;
};


const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};

// --- ECOUTEURS D'EVENEMENTS BOUTONS ET VINYLE ---

if(playButton) {
  playButton.addEventListener("click", () => {
    if (userData.currentSong === null) {
      playSong(userData.songs[0].id);
    } else {
      playSong(userData.currentSong.id);
    }
  });
}

if(pauseButton) pauseButton.addEventListener("click", pauseSong);
if(nextButton) nextButton.addEventListener("click", playNextSong);
if(previousButton) previousButton.addEventListener("click", playPreviousSong);

// NOUVEAU : Ouvre/Ferme le vinyle au clic
if(vinylWrapper) {
  vinylWrapper.addEventListener("click", () => {
    vinylWrapper.classList.toggle("is-open");
  });
}

// --- INITIALISATION AU CHARGEMENT ---
renderSongs(userData.songs);

// 1. On écoute quand la musique se termine
audio.addEventListener('ended', () => {
  // 2. On appelle la fonction qui passe à la musique suivante
  playNextSong();
});
