var audio = document.getElementById('audio');
var audioCon = document.querySelector('.audioContainer');

var playPauseBtn = document.getElementById('playPauseBtn');
var count = 0;
trackCurrentTime = document.querySelector(".current-time")
trackDuration = document.querySelector(".duration-time")


audio.addEventListener("timeupdate", songTimeUpdate)
audio.addEventListener("loadedmetadata", songTimeUpdate);
audio.addEventListener("loadedmetadata", updateDurationOnly);



function playPause(){
    if(count == 0){
        count =1;
        audio.play();
        playPauseBtn.style.backgroundImage = "url('/assets/images/icons/pause.svg')";

        audioCon.classList.add('pulsing');
    }
    else{
        count=0;
        audio.pause();
        playPauseBtn.style.backgroundImage = "url('/assets/images/icons/play.svg')";
        audioCon.classList.remove('pulsing');
    }
}
function updateDurationOnly() {
    if (!isNaN(audio.duration)) {
        let durmins = Math.floor(audio.duration / 60);
        let dursecs = Math.floor(audio.duration % 60);
        if (dursecs < 10) dursecs = "0" + dursecs;
        trackDuration.innerHTML = durmins + ":" + dursecs;
    } else {
        trackDuration.innerHTML = "Loading...";
    }
}
function songTimeUpdate(){
    if (isNaN(audio.duration)) {
        // Metadata not ready yet
        trackDuration.innerHTML = "Loading...";
        return;
    }

    let curmins = Math.floor(audio.currentTime / 60);
    let cursecs = Math.floor(audio.currentTime % 60);
    
    let durmins = Math.floor(audio.duration / 60);
    let dursecs = Math.floor(audio.duration % 60);

    // Format to 2 digits
    if (cursecs < 10) cursecs = "0" + cursecs;
    if (dursecs < 10) dursecs = "0" + dursecs;

    trackCurrentTime.innerHTML = curmins + ":" + cursecs;
    trackDuration.innerHTML = durmins + ":" + dursecs;
}
    
