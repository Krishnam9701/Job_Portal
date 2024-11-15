// Array of Songs
const songs = [
    {
        id: 1,
        name: "Shape Of You",
        artist: "Ed Sheeran",
        img: "assets/images/shape_of_you.jpg",
        genre: "Pop",
        source: "assets/songs/shape_of_you.mp3"
    },
    {
        id: 2,
        name: "All Of Me",
        artist: "John Legend",
        img: "assets/images/all_of_me.jpg",
        genre: "Pop",
        source: "assets/songs/all_of_me.mp3"
    },
    {
        id: 3,
        name: "Stars",
        artist: "Fun.",
        img: "assets/images/stars.jpg",
        genre: "Dance/Electronic",
        source: "assets/songs/stars.mp3"
    },
    {
        id: 4,
        name: "Crashing",
        artist: "Illenium",
        img: "assets/images/crashing.jpg",
        genre: "Dance/Electronic",
        source: "assets/songs/crashing.mp3"
    }
];

// Object to store playlists
const playlists = {};

// Current Song Index
let currentSongIndex = 0;

// Function to Render Songs
function renderSongs() {
    const genreFilter = document.getElementById("genre-filter").value;
    const songList = document.getElementById("song-list");
    songList.innerHTML = '';  // Clear current list

    const filteredSongs = songs.filter(song => genreFilter === "All" || song.genre === genreFilter);

    filteredSongs.forEach(song => {
        const songButton = document.createElement("button");
        songButton.textContent = `${song.name} - ${song.artist}`;
        songButton.onclick = () => playSong(song);
        songList.appendChild(songButton);
    });
}

// Function to Play Song
function playSong(song) {
    document.getElementById("current-song-img").src = song.img;
    document.getElementById("current-song-title").textContent = song.name;
    document.getElementById("current-song-artist").textContent = song.artist;
    document.getElementById("audio-player").src = song.source;
    document.getElementById("audio-player").play();
    currentSongIndex = songs.indexOf(song);
}

// Function for Next Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
}

// Function for Previous Song
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
}

// Function to Handle Adding Songs to Playlists
function handleAddToPlaylist(playlistName) {
    const currentSong = songs[currentSongIndex];
    playlists[playlistName].push(currentSong);
    alert(`"${currentSong.name}" added to "${playlistName}" playlist!`);
}

// Function to Add Song to Playlist
function addToPlaylist() {
    const playlistName = prompt("Enter the name of the playlist you want to add the song to (or type 'new' to create a new playlist):");
    
    if (!playlistName) return; // If no name is entered, exit

    if (playlistName.toLowerCase() === 'new') {
        createPlaylist();
    } else {
        if (playlists[playlistName]) {
            handleAddToPlaylist(playlistName);
        } else {
            const createNew = confirm(`Playlist "${playlistName}" does not exist. Would you like to create it?`);
            if (createNew) {
                playlists[playlistName] = [];
                handleAddToPlaylist(playlistName);
                renderPlaylists();  // Refresh playlist list
            } else {
                alert("Song not added to any playlist.");
            }
        }
    }
}

// Function to Create a Playlist
function createPlaylist() {
    const playlistName = prompt("Enter the new playlist name:");
    
    if (!playlistName) return; // If no name is entered, exit

    if (!playlists[playlistName]) {
        playlists[playlistName] = [];
        renderPlaylists();  // Render the playlist section with the new playlist
        handleAddToPlaylist(playlistName);
    } else {
        alert(`Playlist "${playlistName}" already exists.`);
    }
}

// Function to Display Songs in Playlist
function showPlaylistSongs(playlistName) {
    const playlistSongs = playlists[playlistName];
    
    if (!playlistSongs || playlistSongs.length === 0) {
        alert("No songs in this playlist.");
        return;
    }

    // Display the songs in the playlist
    const songList = document.getElementById("song-list");
    songList.innerHTML = '';  // Clear current list

    playlistSongs.forEach(song => {
        const songButton = document.createElement("button");
        songButton.textContent = `${song.name} - ${song.artist}`;
        songButton.onclick = () => playSong(song);
        songList.appendChild(songButton);
    });
}

// Function to Render Playlists
function renderPlaylists() {
    const playlistList = document.getElementById("playlist-list");
    playlistList.innerHTML = '';  // Clear current list

    for (const playlistName in playlists) {
        const playlistDiv = document.createElement("div");
        playlistDiv.textContent = playlistName;
        playlistDiv.classList.add("playlist-item");
        playlistDiv.onclick = () => showPlaylistSongs(playlistName);
        playlistList.appendChild(playlistDiv);
    }
}
// Function to Toggle Theme
function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    // Update button text based on current theme
    const toggleButton = document.querySelector(".toggle-theme");
    if (document.body.classList.contains("dark-theme")) {
        toggleButton.textContent = "Light";
    } else {
        toggleButton.textContent = "Dark";
    }
}

// Initial setup for theme toggle button text
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".toggle-theme");
    if (document.body.classList.contains("dark-theme")) {
        toggleButton.textContent = "Light";
    } else {
        toggleButton.textContent = "Dark";
    }
});


// Initial Render
renderSongs();
