

class MenuHeader extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
        const currentPage = document.body.dataset.page; // ← THIS was missing

        this.innerHTML = `
            <header>
            <link rel="stylesheet" href="/components/header.css">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <div class="mobMenu"></div>
            <a href="index.html">

            <div class="menuLogo" id="menuLogo"></div>
            </a>
            <div class="right">
                <div class="menu">
                    <div id="music" class="menuButton ${currentPage === 'music' ? 'active' : ''}">MUSIC</div>
                    <div id="animation" class="menuButton ${currentPage === 'animation' ? 'active' : ''}">ANIMATION</div>
                    <div id="illustration" class="menuButton ${currentPage === 'illustration' ? 'active' : ''}">ILLUSTRATION</div>
                    <div id="about" class="menuButton ${currentPage === 'about' ? 'active' : ''}">ABOUT</div>
                    </div>
                all art, animation, illustration, music, visuals, audio ... everything by OLLIE LOKO
            </div>
             
        </header>
    `;
    let musicButton = document.getElementById('music');
    let animButton = document.getElementById('animation');
    let illusButton = document.getElementById('illustration');
    let aboutButton = document.getElementById('about');
    let menuButton = document.getElementById('menuLogo');

    musicButton.addEventListener("click", function() {
        link("/music.html");
    });
    animButton.addEventListener("click", function() {
        link("/animation.html");
    });
    illusButton.addEventListener("click", function() {
        link("/illustration.html");
    });
    aboutButton.addEventListener("click", function() {
        link("/about.html");
    });
    menuButton.addEventListener("click", function() {
        link("/index.html");
    });
    function link(link){
        document.getElementById('loader').classList.remove("loader-hidden");
        document.getElementById('loader').classList.add('show')
        window.location.href = link;
    }

    }, 0);

    }
}
customElements.define('menu-header', MenuHeader)
window.addEventListener("load", ()=>{
    const loader = document.querySelector(".loader");
    setTimeout(() => {
        loader.classList.remove('show');
        loader.classList.add("loader-hidden");

      }, 200); // 0.5 seconds
})
class FooterMain extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
            
            <link rel="stylesheet" href="/components/footer.css">

                <a href="https://www.instagram.com/ollieloko" target="_blank">
                    <div class="footerIcon" style="background-image: url('/assets/images/icons/insta.png');"></div>
                </a>
                <a href="https://www.youtube.com/@ollieloko" target="_blank">
                    <div class="footerIcon" style="background-image: url('/assets/images/icons/youtube.png');"></div>
                </a>
                <a href="https://open.spotify.com/artist/31b8NTJfzMXdArbz4b5Lzy" target="_blank">
                    <div class="footerIcon" style="background-image: url('/assets/images/icons/spotify.png');"></div>
                </a>
                ollieloko 2025 

                </footer>
                <ul class="circles" id="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <ul class="circles2" id="circles2">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
    `
    }
}
customElements.define('footer-main', FooterMain)


