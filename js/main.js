var App = {};

const SideBarModule = (function () {
    const closeBtns = document.querySelectorAll('.js-side-bar-toggle');
    const sideBar = document.getElementById('aside');
    const sideBarLinks = document.querySelectorAll('.js-aside__link');

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

    // Click event listener for open-close sidebar buttons
    closeBtns.forEach(function (element) {
        element.addEventListener('click', function (event) {
            sideBar.classList.toggle('aside--open');
        })
    })

    // Click event listener for every sidebar link 
    sideBarLinks.forEach(function (element) {
        element.addEventListener('click', function (event) {
            let sideBarLinkActive = document.querySelector('.sidebar--active');
            let y = document.documentElement.scrollTop;

            // Stop page-scroll event listener
            window.removeEventListener('scroll', SideBarScrollAnimation);

            // Remove current active side-bar link
            sideBarLinkActive.classList.remove('sidebar--active');
            // Set active class to current event element
            event.target.classList.add('sidebar--active');

            // Wait .5s and close side-bar
            setTimeout(function () {
                sideBar.classList.toggle('aside--open');
            }, 500);

            // Check if Page is scrolling or not - if not active page-scroll event listener 
            var checkScroll = setInterval(function () {
                if (y === document.documentElement.scrollTop) {
                    window.addEventListener('scroll', SideBarScrollAnimation);
                    clearInterval(checkScroll);
                } else y = document.documentElement.scrollTop;
            }, 500);
        })
    })

    //Page scroll event listener (change side-bar active link)
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

const HeaderModule = (function () {
    const header = document.getElementById('banner-header');

    // Active header if page is away from top
    window.addEventListener('scroll', function () {
        let y = Math.round(this.scrollY);

        if (y > 0) {
            header.classList.add('banner__header--scroll-active');
        } else {
            header.classList.remove("banner__header--scroll-active");
        }
    });
})();

const PreLoadAnimation = (function () {
    const preload = document.getElementById('preload');
    const bannerTitleTop = document.querySelector('.js-banner__title-top');
    const bannerTitleBottom1 = document.querySelector('.js-banner__title-bottom-1');
    const bannerTitleBottom2 = document.querySelector('.js-banner__title-bottom-2');
    const limitTime = 1500;

    window.addEventListener('load', (event) => {
        var timePoint = performance.now();
        if (timePoint < limitTime) {
            setTimeout(function () {
                (new PreloadVisibility()).Hidden();
                decorateBannerTitleAnimate();
            }, (limitTime - timePoint));
        } else {
            (new PreloadVisibility()).Hidden();
            decorateBannerTitleAnimate();
        }
    });

    // Make loading animation slowly faded
    function PreloadVisibility() {
        this.Hidden = function () {
            preload.classList.add('preload--hidden');
            setTimeout(function () {
                preload.style.display = 'none';
            }, 1200)
        }

        this.Active = function () {
            preload.classList.remove('preload--hidden');
            preload.style.display = 'block';
        }
    }

    // Start running Banner title text-animation
    function decorateBannerTitleAnimate() {
        bannerTitleTop.classList.add('banner__title-animation-bottom');
        bannerTitleBottom1.classList.add('banner__title-animation-left');
        bannerTitleBottom2.classList.add('banner__title-animation-right');
    }

    App.PreloadVisibility = PreloadVisibility;
})()

const EmailService = (function () {
    const userId = 'user_Ubj9Yj81C14AvGgwmUkwf';
    const serviceId = 'service_ew59x8a';
    const templateId = 'template_hxytvei';
    const messageDisplayTime = 1800;
    emailjs.init(userId);

    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        (new App.PreloadVisibility()).Active();

        //Start Sending Email
        emailjs.sendForm(serviceId, templateId, this)
            .then(function () {
                (new App.PreloadVisibility()).Hidden();
                (new App.ModalVisibility()).Active();
                App.SetModalText('Thank you for sending me a message. I will reply soon', App.MessageMode.Success);

                setTimeout(function () {
                    (new App.ModalVisibility()).Hidden();
                }, messageDisplayTime);
            }, function (error) {
                App.SetModalText('Some thing when wrong, please try again', App.MessageMode.Fail);
                setTimeout(function () {
                    (new App.ModalVisibility()).Hidden();
                }, messageDisplayTime);
            });
    });
})()

const ModalModule = (function () {
    const modal = document.getElementById("modal-type-1");
    const modalContent = document.getElementById("modal-content-type-1");
    const modalText = document.getElementById("email-message-text");

    const successIcon = document.querySelector('.js-success-icon');
    const failIcon = document.querySelector('.js-fail-icon');
    const errorIcon = document.querySelector('.js-error-icon');

    const MessageMode = {
        Success: 0,
        Fail: 1,
        Error: 2
    }

    function ModalVisibility() {
        this.Hidden = function () {
            modalContent.classList.remove('modal-show-animation')
            modalContent.classList.add('modal-hide-animation');
            setTimeout(function () {
                modal.style.display = "none";
            }, 500)
        }

        this.Active = function (messageMode) {
            modal.style.display = "block";

            modalContent.classList.remove('modal-hide-animation');
            modalContent.classList.add('modal-show-animation');
        }
    }

    function SetModalText(text, messageMode) {
        modalText.innerText = text;

        switch (messageMode) {
            case MessageMode.Success:
                successIcon.style.display = "block";
                failIcon.style.display = "none";
                errorIcon.style.display = "none";
                break;
            case MessageMode.Fail:
                successIcon.style.display = "none";
                failIcon.style.display = "block";
                errorIcon.style.display = "none";
                break;
            case MessageMode.Error:
                successIcon.style.display = "none";
                failIcon.style.display = "none";
                errorIcon.style.display = "block";
                break;
        }
    }

    App.ModalVisibility = ModalVisibility;
    App.SetModalText = SetModalText;
    App.MessageMode = MessageMode;
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
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 1500, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});