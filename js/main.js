const SideBarModule = (function () {
    const closeBtns = document.querySelectorAll('.js-side-bar-toggle');
    const sideBar = document.getElementById('aside');
    const sideBarLinks = document.querySelectorAll('.js-aside__link');

    const header = document.getElementById('banner-header');
    const banner = document.getElementById('banner');
    const about = document.getElementById('about');
    const service = document.getElementById('service');
    const portfolio = document.getElementById('portfolio');
    const contact = document.getElementById('contact');

    const bannerLink = document.getElementById('banner-link');
    const aboutLink = document.getElementById('about-link');
    const serviceLink = document.getElementById('service-link');
    const portfolioLink = document.getElementById('portfolio-link');
    const contactLink = document.getElementById('contact-link');

    closeBtns.forEach(function (element) {
        element.addEventListener('click', function (event) {
            sideBar.classList.toggle('aside--open');
        })
    })

    sideBarLinks.forEach(function (element) {
        element.addEventListener('click', function (event) {
            window.removeEventListener('scroll', SideBarScrollAnimation);
            let sideBarLinkActive = document.querySelector('.sidebar--active');

            sideBarLinkActive.classList.remove('sidebar--active');
            event.target.classList.add('sidebar--active');
            setTimeout(function () {
                sideBar.classList.toggle('aside--open');
            }, 500);
            let y = document.documentElement.scrollTop;
            var checkScroll = setInterval(function () {
                if (y === document.documentElement.scrollTop) {
                    window.addEventListener('scroll', SideBarScrollAnimation);
                    clearInterval(checkScroll);
                } else y = document.documentElement.scrollTop;
            }, 300);
        })
    })

    window.addEventListener('scroll', function () {
        let y = Math.round(this.scrollY);

        if (y > 0) {
            header.classList.add('banner__header--scroll-active');
        } else {
            header.classList.remove("banner__header--scroll-active");
        }
    });

    window.addEventListener('scroll', SideBarScrollAnimation);

    function SideBarScrollAnimation() {
        let sideBarLinkActive = document.querySelector('.sidebar--active');
        let y = Math.round(this.scrollY);

        if (y >= banner.offsetTop && y < about.offsetTop) {
            sideBarLinkActive.classList.remove('sidebar--active');
            bannerLink.classList.add('sidebar--active');
        }

        if (y >= about.offsetTop && y < service.offsetTop) {
            sideBarLinkActive.classList.remove('sidebar--active');
            aboutLink.classList.add('sidebar--active');
        }

        if (y >= service.offsetTop && y < portfolio.offsetTop) {
            sideBarLinkActive.classList.remove('sidebar--active');
            serviceLink.classList.add('sidebar--active');
        }


        if (y >= portfolio.offsetTop && y < contact.offsetTop && Math.ceil(window.innerHeight + window.scrollY) < document.body.scrollHeight) {
            sideBarLinkActive.classList.remove('sidebar--active');
            portfolioLink.classList.add('sidebar--active');
        }

        if (y >= contact.offsetTop) {
            sideBarLinkActive.classList.remove('sidebar--active');
            contactLink.classList.add('sidebar--active');
        }

        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            sideBarLinkActive.classList.remove('sidebar--active');
            contactLink.classList.add('sidebar--active');
        }
    }
})();

const PreLoadAnimation = (function () {
    const preload = document.getElementById('preload');
    const loadedContent = document.getElementById('loaded-content');
    const bannerTitleTop = document.querySelector('.js-banner__title-top');
    const bannerTitleBottom1= document.querySelector('.js-banner__title-bottom-1');
    const bannerTitleBottom2 = document.querySelector('.js-banner__title-bottom-2');
    const limitTime = 1500;

    window.addEventListener('load', (event) => {
        var timePoint = performance.now();
        if(timePoint < limitTime){
            setTimeout(function(){
                preload.style.display = 'none';
                loadedContent.style.display = 'initial';
                decorateBannerTitleAnimate();
            }, (limitTime - timePoint));
        }else{
            preload.style.display = 'none';
            loadedContent.style.display = 'initial';
            decorateBannerTitleAnimate();
        }
    });

    function decorateBannerTitleAnimate(){
        bannerTitleTop.classList.add('banner__title-animation-bottom');
        bannerTitleBottom1.classList.add('banner__title-animation-left');
        bannerTitleBottom2.classList.add('banner__title-animation-right'); 
    }
})()

SmoothScroll({
    frameRate: 150,
    animationTime: 800,
    stepSize: 100,
    pulseAlgorithm: 1,
    pulseScale: 4,
    pulseNormalize: 1,
    accelerationDelta: 50,
    accelerationMax: 3,
    keyboardSupport: 1,
    arrowScroll: 50,
    fixedBackground: 0
});

// below listed default settings
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1500, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});