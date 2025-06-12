let illusNum = 16;
preview = document.querySelector('.preview')
link = document.getElementById('previewLink')
fsImage = document.getElementById('fsImage')
let illusaName = "";
container2 = document.getElementById("container");
highestOrderNumber = 0;
title = document.createElement('div');

let FS = false;


function displayName(name){
}


fetch('data/illustrationInfo.json')
.then(response => response.json())
.then(data => {
  
  const reference = document.querySelector('.info1'); 
  const sortedEntries = Object.entries(data).sort((a, b) => b[1].order - a[1].order);
  
    
  sortedEntries.forEach(([illusKey, illustration]) => {
    const container = document.createElement('div');
    const illName = document.createElement('div');
    const year = document.createElement('div');
if (illustration.year == "NEW!"){
      year.classList.add('new');
    }
    illName.textContent = illusKey;
    year.textContent = `(${illustration.year})`;
    
    container.classList.add('nameContainer');
    illName.classList.add('name');
    year.classList.add('year');

    container.dataset.order = illustration.order;

    container.appendChild(illName);
    container.appendChild(year);
    reference.appendChild(container, reference.nextSibling);
    
    container.addEventListener("click", function() {
      loadillustration(illustration.order);
    });
  const highestOrderNumber = Math.max(...sortedEntries.map(([key, value]) => value.order));
  loadillustration(highestOrderNumber);

});

function loadillustration(orderNum){
    FS = false;
  fetch('data/illustrationInfo.json')
  .then(response => response.json())
  .then(data => {
    const entry = Object.entries(data).find(([key, value]) => value.order === orderNum);

    if (!entry) {
      console.error("No illustration found for order:", orderNum);
      return;
    }

    const [name, illData] = entry;
    illusNum = orderNum;
    illusaName = name;

    preview.style.backgroundImage = '';
    preview.classList.remove('play');
    preview.classList.add('loading');

    const img = new Image();
    const containers = document.querySelectorAll('.nameContainer');

    for (const nameContainer of containers) {
      nameContainer.classList.remove('selected');
    }

    title.textContent = illusaName;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
      });  

    setTimeout(() => {
      img.onload = () => {
        preview.style.backgroundImage = `url(${illData.img})`;
        FS=true;
        for (const nameContainer of containers) {
          if (nameContainer.dataset.order == orderNum){
            nameContainer.classList.add('selected');
          }
        }

        preview.classList.remove('loading');
        fsImage.style.backgroundImage = `url(${illData.img})`;

       
      };
      img.src = illData.img;

    }, 50);
  });
}

function updateSize() {
  if (window.innerWidth < 680) {

    title.classList.add('title');
    title.id='title';
    container2.insertBefore(title, document.getElementById("top"));
 
  }
  if (window.innerWidth >681){


  }
}

preview.addEventListener("click", function() {
    if (FS == true){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("page-content").classList.add('overlay');
    }
})
document.getElementById("overlay").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("page-content").classList.remove('overlay');

})
window.addEventListener("resize", updateSize);
updateSize();

});
