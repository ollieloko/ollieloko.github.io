let animNum = 16;
preview = document.querySelector('.preview')
link = document.getElementById('previewLink')
line1 = document.getElementById('line1')
line2 = document.getElementById('line2')
line3 = document.getElementById('line3')
let animaName = "";
container2 = document.getElementById("container");
highestOrderNumber = 0;
title = document.createElement('div');




function displayName(name){
}


fetch('data/animationInfo.json')
.then(response => response.json())
.then(data => {
  
  const reference = document.querySelector('.info1'); 
  const sortedEntries = Object.entries(data).sort((a, b) => b[1].order - a[1].order);
  
    
  sortedEntries.forEach(([animKey, animation]) => {
    const container = document.createElement('div');
    const animName = document.createElement('div');
    const year = document.createElement('div');
    if (animation.year == "NEW!"){
      year.classList.add('new');
    }
    animName.textContent = animKey;
    year.textContent = `(${animation.year})`;
    
    container.classList.add('nameContainer');
    animName.classList.add('name');
    year.classList.add('year');

    container.dataset.order = animation.order;

    container.appendChild(animName);
    container.appendChild(year);
    reference.appendChild(container, reference.nextSibling);
    
    container.addEventListener("click", function() {
      loadAnimation(animation.order);
    });
  const highestOrderNumber = Math.max(...sortedEntries.map(([key, value]) => value.order));
  loadAnimation(highestOrderNumber);

});

function loadAnimation(orderNum){
  fetch('data/animationInfo.json')
  .then(response => response.json())
  .then(data => {
    const entry = Object.entries(data).find(([key, value]) => value.order === orderNum);

    if (!entry) {
      console.error("No animation found for order:", orderNum);
      return;
    }
    console.log("loading")

    const [name, animData] = entry;
    animNum = orderNum;
    animaName = name;

    preview.style.backgroundImage = '';
    preview.classList.remove('play');
    preview.classList.add('loading');

    const img = new Image();
    const containers = document.querySelectorAll('.nameContainer');

    for (const nameContainer of containers) {
      nameContainer.classList.remove('selected');
    }

    title.textContent = animaName;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
      });  

    setTimeout(() => {
      img.onload = () => {
        preview.style.backgroundImage = `url(${animData.img})`;


        for (const nameContainer of containers) {
          if (nameContainer.dataset.order == orderNum){
            nameContainer.classList.add('selected');
          }
        }

        preview.classList.remove('loading');
        preview.classList.add('play');

        link.href = animData.url;
        link.target = "_blank";

        line1.textContent = animData.info1;
        line2.textContent = animData.info2;
        line3.textContent = animData.info3;
      };
      img.src = animData.img;
    }, 50);
  });
}

function updateSize() {
  if (window.innerWidth < 680) {
    container2.insertBefore(document.getElementById("info2"), document.getElementById("top"));
    document.getElementById("top").insertBefore(document.getElementById("line3"), document.getElementById("info1"));

    title.classList.add('title');
    title.id='title';
    container2.insertBefore(title, document.getElementById("info2"));
 
  }
  if (window.innerWidth >680){
    container2.insertBefore(document.getElementById("info2"), document.getElementById("top").nextSibling);
    document.getElementById("info2").insertBefore(document.getElementById("line3"), document.getElementById("line2").nextSibling);


  }
}

window.addEventListener("resize", updateSize);
updateSize();

});
