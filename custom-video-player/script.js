const video = document.getElementById("video");
const play = document.getElementById("play");
const stope = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// play and pause
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update play/pause icon
function UpdatePlayIcon() {
  if (video.paused) {
    play.innerHTML = "<i class='fas fa-play fa-2x'></i>";
  } else {
    play.innerHTML = "<i class='fas fa-pause fa-2x'></i>";
  }
}

//update progress and timestamp
function UpdateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  //   get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //   get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress
function setVideoProgress() {
  video.currentTime = (parseInt(progress.value) * video.duration) / 100;
}

// stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", UpdatePlayIcon);
video.addEventListener("play", UpdatePlayIcon);
video.addEventListener("timeupdate", UpdateProgress);

play.addEventListener("click", toggleVideoStatus);

stope.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
