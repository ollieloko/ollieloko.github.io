let flower = document.getElementById('flower')
killed = false
let me = document.getElementById('me');
let left = document.getElementById('left');
let right = document.getElementById('right');
let loaded = 0;
let loadedB = false;

function checkIMG(){
    if (loaded == 5){
        loadedB = true;
    }
}
const flower1 = new Image();
flower1.onload = () => {
    loaded += 1;
    checkIMG()
}
flower1.src = '/assets/images/flower.gif'

const flower2 = new Image();
flower2.onload = () => {
    loaded += 1;
    checkIMG()
}
flower2.src = '/assets/images/dyingFlower.gif'

const flower3 = new Image();
flower3.onload = () => {
    loaded += 1;
    checkIMG()
}
flower3.src = '/assets/images/deadFlower.png'

var flower4 = new Audio();
flower4.addEventListener('canplaythrough', () => {
    loaded += 1;
    checkIMG();
});
flower4.src = '/assets/audio/flower.wav';
var flower5 = new Audio();
flower5.addEventListener('canplaythrough', () => {
    loaded += 1;
    checkIMG();
});
flower5.src = '/assets/audio/flower2.wav';

flower.addEventListener("click", function() {
    if (loadedB == true){
        if (killed == false){
            killed = true
            document.getElementById('void').style.display = "block"
            
            flower.classList.add('dying')
            document.getElementById('circles').style.display = "none";
            document.getElementById('circles2').style.display = "none";
            document.getElementById('info').style.visibility = "hidden";
            document.getElementById('info2').style.visibility = "hidden";
            document.getElementById('info3').style.visibility = "hidden";
            document.getElementById('info5').style.visibility = "hidden";

            document.getElementById('info4').textContent ="why"

            document.getElementById('me').classList.add('look');
            flower4.play();
            setTimeout(() => {
                flower.classList.add('dead')
                setTimeout(() => {
                    document.getElementById('void').classList.add('show');
                }, 3500); 
                flower5.play();

            }, 800); 
        }
}
})


function updateSize() {
    if (window.innerWidth < 681) {
        left.insertBefore(me, document.getElementById("info"));
    }
    if (window.innerWidth >680){
        right.insertBefore(me, document.getElementById("nothing"));
    }
}  
window.addEventListener("resize", updateSize);
updateSize();
