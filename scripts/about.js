let killed = false;
const flower = document.getElementById('flower');
const me = document.getElementById('me');
const left = document.getElementById('left');
const right = document.getElementById('right');

function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.src = src;
    });
}

function loadAudio(src) {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', resolve, { once: true });
        audio.src = src;
    });
}

const assetsToLoad = [
    loadImage('/assets/images/flower.gif'),
    loadImage('/assets/images/dyingFlower.gif'),
    loadImage('/assets/images/deadFlower.png'),
    loadAudio('/assets/audio/flower.wav'),
    loadAudio('/assets/audio/flower2.wav')
];

Promise.all(assetsToLoad).then(() => {
    console.log('All assets loaded');

    flower.addEventListener('click', handleFlowerClick);
    flower.addEventListener('touchstart', handleFlowerClick); // mobile Safari fix
});

function handleFlowerClick() {
    if (killed) return;
    killed = true;

    document.getElementById('void').style.display = "block";
    flower.classList.add('dying');
    
    ['circles', 'circles2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    ['info', 'info2', 'info3', 'info5'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.visibility = "hidden";
    });

    const info4 = document.getElementById('info4');
    if (info4) info4.textContent = "why";

    me.classList.add('look');

    const flowerSound1 = new Audio('/assets/audio/flower.wav');
    const flowerSound2 = new Audio('/assets/audio/flower2.wav');
    
    flowerSound1.play();

    setTimeout(() => {
        flower.classList.add('dead');

        setTimeout(() => {
            document.getElementById('void').classList.add('show');
        }, 3500);

        flowerSound2.play();
    }, 800);
}

function updateSize() {
    if (window.innerWidth < 681) {
        left.insertBefore(me, document.getElementById('info'));
    } else {
        document.getElementById('box-container').insertBefore(me, document.getElementById('nothing'));
    }
}

window.addEventListener('load', updateSize);
window.addEventListener('resize', updateSize);
