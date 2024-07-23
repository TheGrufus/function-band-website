const songs = [
  {
      title: 'Victory Road',
      author: 'Dan Campbell',
      src: './Audio/VictoryRoad.mp3',
      image: './Images/VictoryRoadSmall.jpg'
  },
  {
      title: 'Live Out Loud',
      author: 'Dan Campbell',
      src: './Audio/LiveOutLoud.mp3',
      image: './Images/LiveOutLoud.jpg'
  },
  {
      title: 'Twice In A Lifetime',
      author: 'Dan Campbell',
      src: './Audio/TwiceInALifetime.mp3',
      image: './Images/TwiceInALifetime.jpg'
  }
];

let currentSongIndex = 0;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const timeDisplay = document.getElementById('time-display');
const songImage = document.getElementById('song-image');
const songTitle = document.getElementById('song-title');
const songAuthor = document.getElementById('song-author');
const playlist = document.getElementById('playlist');

function loadSong(song) {
  audio.src = song.src;
  songImage.src = song.image;
  songTitle.textContent = song.title;
  songAuthor.textContent = song.author;
}

function playSong() {
  audio.play();
  playBtn.textContent = '❚❚';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '►';
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const totalMinutes = Math.floor(duration / 60);
  const totalSeconds = Math.floor(duration % 60);
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} / ${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex > songs.length - 1) {
      currentSongIndex = 0;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
}

function selectSong(index) {
  currentSongIndex = index;
  loadSong(songs[currentSongIndex]);
  playSong();
}

function populatePlaylist() {
  songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${song.image}" alt="Song Image"><div>${song.title} - ${song.author}</div>`;
      li.addEventListener('click', () => selectSong(index));
      playlist.appendChild(li);
  });
}

playBtn.addEventListener('click', () => {
  const isPlaying = audio.paused;
  if (isPlaying) {
      playSong();
  } else {
      pauseSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

audio.addEventListener('ended', nextSong);

// Load initial song and populate playlist
loadSong(songs[currentSongIndex]);
populatePlaylist();