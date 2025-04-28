const audioScript = document.createElement('script');
audioScript.src = '/scripts/audioPlayer.js';  
audioScript.type = 'text/javascript';
audioScript.defer = true; 

document.head.appendChild(audioScript);

const urlParams = new URLSearchParams(window.location.search);
const albumNum = urlParams.get('album');
document.body.dataset.albumNum = albumNum;

const albumId = "album" + albumNum + "_";
let listenBar = false;
let altCover = "";
let cover = "";

let mobile = false;
let MVbar = false;
let albumClicked = false;


fetch('/data/albumInfo.json')
.then(response => response.json())
.then(data => {
  const albumData = data["album" + albumNum];  // Get the correct album based on albumNum
  if (albumData.new == true){
    document.getElementById('corner-square').style.display = "block";
  }
  if (!albumData) {
    console.error("Album data not found for album number:", albumNum);
    return;
  }

  const albumName = albumData.name;
  document.title = albumName + " - an album by OLLIE LOKO";

  const albumYear = albumData.year;
  const albumSong = albumData.song;
  const info1 = albumData.info1;
  const info2 = albumData.info2;
  const tracklist = albumData.tracklist;
  const download = albumData.download;
  cover = albumData.cover;
  altCover = albumData.altCover;

  document.getElementById("container").style.backgroundImage = `url(${albumData.background})`;

 
  document.getElementById("name").style.fontSize = albumData.nameSize;

  document.getElementById("year").style.fontSize = albumData.yearSize;


  // Check if musicVideos exists and is an array before attempting to loop over it
  const musicVideos = albumData.musicVideos;
  if (Array.isArray(musicVideos)) {
    const mvContainer = document.getElementById('MV');  // Container for music video buttons
    
    musicVideos.forEach(video => {
      const anchor = document.createElement('a');
      anchor.href = video.link; // Set the link to the video URL
      anchor.target = '_blank';

      const button = document.createElement('button');  // Create a new button element
      button.textContent = video.name;  // Set the button's text to the music video name
      button.style.backgroundImage = `url(${video.image})`;  // Set the button background image
      button.style.backgroundSize = 'cover';  // Ensure the image covers the entire button
      button.style.backgroundPosition = 'center';  // Center the image

      // Optionally, add a class or any additional styles to the button
      button.classList.add('music-video-button');

      // Append the button to the MV container
      anchor.appendChild(button);

      // Append the anchor (with button) to the MV container
      mvContainer.appendChild(anchor);
    });
  } else {
    console.warn("No valid music videos found for this album.");
  }
  const streaming = albumData.streaming;

  if (Array.isArray(streaming) && streaming.length > 0) {
    const streamingContainer = document.getElementById('streaming');
    const streamingLinks = streaming[0];  // Grab the object inside the array
  
    Object.keys(streamingLinks).forEach(platform => {
      const anchor = document.createElement('a');
      anchor.href = streamingLinks[platform];  // Get the URL for the platform
      anchor.target = '_blank';
  
      const button = document.createElement('button');
      button.textContent = platform.toUpperCase();  // Capitalize platform name
  
      // Optional: add class for styling
      button.classList.add('streaming-button');
  
      anchor.appendChild(button);
      streamingContainer.appendChild(anchor);
    });
  }
  document.getElementById("name").innerText = albumName;
  document.getElementById("year").innerText = `(${albumYear})`;
  document.getElementById("song").src = albumSong;
  document.getElementById("cover").style.backgroundImage = `url(${cover})`;

  document.getElementById("audio").load();
  const fileName = albumSong.split('/').pop().replace(/\.[^/.]+$/, "");
  document.getElementById("songName").innerText = fileName;

  document.getElementById("infoLine1").innerText = `${info1}`;
  document.getElementById("infoLine2").innerText = `${info2}`;

  document.getElementById("download").href = download;

  if (Array.isArray(tracklist)) {
    const container = document.getElementById("tracklist");
    container.innerHTML = "";
    const half = Math.ceil(tracklist.length / 2);
    const col1 = tracklist.slice(0, half);
    const col2 = tracklist.slice(half);

    const col1Div = document.createElement("div");
    const col2Div = document.createElement("div");

    col1Div.classList.add("track-column");
    col2Div.classList.add("track-column");

    col1.forEach((track, i) => {
      const p = document.createElement("p");
      p.textContent = `${i + 1}. ${track}`;
      col1Div.appendChild(p);
    });

    col2.forEach((track, i) => {
      const p = document.createElement("p");
      p.textContent = `${i + 1 + col1.length}. ${track}`;
      col2Div.appendChild(p);
    });

    container.appendChild(col1Div);
    container.appendChild(col2Div);
  }
    // Loop through each <p> inside tracklist and apply the font size
    const tracklistContainer = document.getElementById("tracklist");
    const trackItems = tracklistContainer.querySelectorAll("p");
    trackItems.forEach(p => {
      p.style.fontSize = albumData.tracklistSize;
  })
});




function openListenBar(){
  document.getElementById('listen').style.display = 'block';
  document.getElementById('info2').style.display = 'none';
  document.getElementById('listenButton').classList.toggle('active'); // Toggle 'active' class

  listenBar = true;
}
function closeListenBar(){
  document.getElementById('listen').style.display = 'none';
  document.getElementById('info2').style.display = 'block';
  listenBar = false;
  document.getElementById('listenButton').classList.toggle('active'); // Toggle 'active' class

}
function openMVbar(){
  MVbar = true;
  document.getElementById('info2').style.display = 'none';
  document.getElementById('MVbutton').classList.toggle('active'); // Toggle 'active' class
  document.getElementById('MV').style.display = 'block';


}
function closeMVbar(){
  MVbar = false;
  document.getElementById('info2').style.display = 'block';
  document.getElementById('MVbutton').classList.toggle('active'); // Toggle 'active' class
  document.getElementById('MV').style.display = 'none';

}
document.getElementById('listenButton').addEventListener('click', function() {
    if (MVbar ==true){
      closeMVbar()
    }
    if (listenBar == false){
        openListenBar()
    }
    else{
        closeListenBar()
    }
})

document.getElementById('cover').addEventListener('mouseover', function() {

  if (listenBar ==true){
    closeListenBar()
  }
  if (MVbar ==true){
    closeMVbar()
  }

});

document.getElementById('container').addEventListener('mouseleave', function() {
    if (listenBar ==true){
      closeListenBar()
    }
    if (MVbar ==true){
      closeMVbar()
    }

})

document.getElementById('MVbutton').addEventListener('click', function() {
  if (listenBar == true){
      closeListenBar()
  }
  if (MVbar == false){
    openMVbar()
  }else{
    closeMVbar()
  }
})
document.getElementById('download').addEventListener('click', function() {
  document.getElementById('download').style.pointerEvents = "none";
  document.getElementById('dText').style.backgroundImage = "none";

  document.getElementById('dText').textContent ="downloading..."
  document.getElementById('dText').style.fontSize = "1.2rem";
  document.getElementById('dText').style.border = "none";



})
document.getElementById('cover').addEventListener('click', function() {
  if (altCover && albumClicked == false) {
    this.style.backgroundImage = `url(${altCover})`;  // Switch to alt cover
    albumClicked = true;  // Mark as clicked
    console.log('Switched to altCover');
  } 
  else if (cover && albumClicked == true) {
    this.style.backgroundImage = `url(${cover})`;  // Switch back to original cover
    albumClicked = false;  // Reset click state
    console.log('Switched back to cover');
  }
});


function updateSize() {
  if (window.innerWidth < 680) {
    mobile = true; 
  }
  if (window.innerWidth >680){
    mobile = false;

  }
}

window.addEventListener("resize", updateSize);
updateSize();



;

