imgLoaded= 0;

guy = document.getElementById("guy");
guys = document.getElementById("guys");

tD = document.getElementById("t");
tmD = document.getElementById("tm");
bmD = document.getElementById("bm");
bD = document.getElementById("b");

let buttons = document.getElementById("buttons");

const guyImg = new Image();
const t = new Image();
const tm = new Image();
const bm = new Image();
const b = new Image();


guyImg.onload = () => {
    loadImage();
  };
  guyImg.src = "/assets/images/guy/main.gif";

  t.onload = () => {
    loadImage();
  };
  t.src = "/assets/images/guy/t.gif";

  tm.onload = () => {
    loadImage();
  };
  tm.src = "/assets/images/guy/tm.gif";

  bm.onload = () => {
    loadImage();
  };
  bm.src = "/assets/images/guy/bm.gif";

  b.onload = () => {
    loadImage();
  };
  b.src = "/assets/images/guy/b.gif";

  function loadImage() {
    imgLoaded += 1;
    if (imgLoaded === 5) {
      console.log("loaded");
      guy.style.backgroundImage = `url(${guyImg.src})`;
      tD.style.backgroundImage = `url(${t.src})`;
      tmD.style.backgroundImage = `url(${tm.src})`;
      bmD.style.backgroundImage = `url(${bm.src})`;
      bD.style.backgroundImage = `url(${b.src})`;
    buttons.classList.add('display');
    }
  }
  function hideAll(show, move){
    if (imgLoaded === 5){
        guy.style = "display:none";
        tD.style = "display:none";
        tmD.style = "display:none";
        bmD.style = "display:none";
        bD.style = "display:none";
        show.style = "display:block"
       
        guys.style.transform = "translate(0, "+ -move +"px)";
    }
  }
  document.querySelector('#music').addEventListener('mouseover', () => {
        hideAll(tD, -5)
  })
  document.querySelector('#animation').addEventListener('mouseover', () => {
    hideAll(tmD, -2.5)
})
document.querySelector('#illustration').addEventListener('mouseover', () => {
    hideAll(bmD, 0)
})
document.querySelector('#about').addEventListener('mouseover', () => {
    hideAll(bD, 2.5)
})



window.addEventListener("load", ()=>{
    const loader = document.querySelector(".loader");
    setTimeout(() => {
        loader.classList.remove('show');
        loader.classList.add("loader-hidden");

      }, 200); // 0.5 seconds
})

window.location.href = window.location.href.replace("index.html", "");
