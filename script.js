const albumArt = document.getElementById("album-art");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const currentTime = document.getElementById("current-time");
const songDuration = document.getElementById("duration");
const progressBar = document.getElementById("progress-bar");

const previousButton = document.getElementById("previous");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");

const audio = document.getElementById("audio");
const songsPlaylist = document.getElementById("playlist");
const playlistCount = document.getElementById("playlist-count");
const clearPlaylistButton = document.getElementById("clear-playlist");


const allSongs = [
    {
        id: 1,
        title: "Blue_Hour_Falling",
        artist: "Gemini",
        duration: "2:56",
        src: "./music/Blue_Hour_Falling.mp3",
    },
    {
        id: 2,
        title: "Coffee_and_Pale_Lights",
        artist: "Gemini",
        duration: "2:56",
        src: "./music/Coffee_and_Pale_Lights.mp3",
    },
    {
        id: 3,
        title: "Folded_in_the_Drawer",
        artist: "Gemini",
        duration: "2:40",
        src: "./music/Folded_in_the_Drawer.mp3",
    },
    {
        id: 4,
        title: "Harbor_in_Your_Arms",
        artist: "Gemini",
        duration: "2:47",
        src: "./music/Harbor_in_Your_Arms.mp3",
    },
    {
        id: 5,
        title: "The_Midnight_Cabinet",
        artist: "Gemini",
        duration: "2:42",
        src: "./music/The_Midnight_Cabinet.mp3",
    },
    {
        id: 6,
        title: "You_Feel_Like_Home",
        artist: "Gemini",
        duration: "2:45",
        src: "./music/You_Feel_Like_Home.mp3",
    }
];

const userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0
}


const playSong = (id) => {
    const currentSong = userData.songs.find(song => song.id === id);
    audio.src = currentSong.src;
    userData.currentSong = currentSong;
    songTitle.textContent = currentSong.title;
    songArtist.textContent = currentSong.artist;
    audio.play();

}

playButton.addEventListener("click", () => {
    if(userData.songs.length === 0) {
        return;
    }

    if(userData.currentSong === null) {
        playSong(userData.songs[0].id);
    } else {
        audio.play();
    }
});

const pauseSong = () => {
    if(userData.currentSong !== null) {
        audio.pause();
    }
}

pauseButton.addEventListener("click", () => {
    pauseSong();
});

const getCurrentSongIndex = () => {
    return userData.songs.indexOf(userData.currentSong);
}

const previousSong = () => {
    let songIndex = getCurrentSongIndex();
    if(songIndex > 0) {
        const prevSong = userData.songs[songIndex - 1];
        playSong(prevSong.id);
    } 
}

previousButton.addEventListener("click", () => {
    previousSong();
});

const nextSong = () => {
    let songIndex = getCurrentSongIndex();
    if(songIndex < userData.songs.length - 1) {
        const nextSongToPlay = userData.songs[songIndex + 1];
        playSong(nextSongToPlay.id);
    }
}

nextButton.addEventListener("click", () => {
    nextSong();
});

const sortSongs = () => {
    userData.songs.sort((a, b) => {
        if(a.title < b.title) {
            return -1;
        } else if(a.title > b.title) {
            return 1;
        } else {
            return 0;
        }
    });
}

sortSongs();

const shuffleSongs = () => {
    userData.songs.sort(() => Math.random() - 0.5);
}

shuffleButton.addEventListener("click", () => {
    shuffleSongs();
    renderSongs();
});

const deleteSong = (id) => {
    const deletingCurrentSong = userData.currentSong?.id === id;
    userData.songs = userData.songs.filter(song => song.id !== id);

    if(deletingCurrentSong) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();

        userData.currentSong = null;

        songTitle.textContent = "No song selected";
        songArtist.textContent = "Select a song from your playlist";
        currentTime.textContent = "0:00";
        songDuration.textContent = "0:00";

        progressBar.value = 0;
        progressBar.style.background = "var(--surface-light)";
    }

    renderSongs();
}


const renderSongs = () => {
    
    const htmlStrings = userData.songs.map(song => {
    return `<li class="playlist-song">
                <button class="song-button" data-song-id="${song.id}">
                    <span class="song-title">${song.title}</span>
                    <span class="song-artist">${song.artist}</span>
                    <span class="song-duration">${song.duration}</span>
                </button>
                
                <button class="delete-button" data-song-id=${song.id}>Delete</button>
            </li>`
    });

    const playlistString = htmlStrings.join("");


    songsPlaylist.innerHTML = playlistString;
    const playlistSongs = document.querySelectorAll(".playlist-song");

    playlistSongs.forEach(playlistSong => {
        const songButton = playlistSong.querySelector(".song-button");

        songButton.addEventListener("click", () => {
            const id = parseInt(songButton.dataset.songId, 10);
            playSong(id);
        });

        const deleteButton = playlistSong.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            const id = parseInt(deleteButton.dataset.songId, 10);
            deleteSong(id);
        })
    });
    
    playlistCount.textContent = userData.songs.length >= 1 ? `${userData.songs.length} songs` : "No songs in playlist";
    
}

renderSongs();



const updateProgressBar = () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }


    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);

    const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    currentTime.textContent = timeString;
    songDuration.textContent = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, "0")}`;

    progressBar.style.background = `linear-gradient(
    to right,
    var(--accent) ${progress}%,
    var(--surface-light) ${progress}%
    )`;
}

audio.addEventListener("timeupdate", updateProgressBar);

audio.addEventListener("ended", () => {
    const upNext = getCurrentSongIndex() + 1;
    if(upNext < userData.songs.length) {
        const nextToPlay = userData.songs[upNext];
        playSong(nextToPlay.id);
    }             
})

const clearPlaylist = () => {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();

    userData.songs = [];
    renderSongs();

    songTitle.textContent = "No song selected";
    songArtist.textContent = "Select a song from your playlist";
    currentTime.textContent = "0:00";
    songDuration.textContent = "0:00";

    progressBar.value = 0;
    progressBar.style.background = "var(--surface-light)";

}

clearPlaylistButton.addEventListener("click", () => {
    clearPlaylist();
})







 