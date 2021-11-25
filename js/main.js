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

const PreLoadAnimationModule = (function () {
    const preload = document.getElementById('preload');
    const bannerTitleTop = document.querySelector('.js-banner__title-top');
    const bannerTitleBottom1 = document.querySelector('.js-banner__title-bottom-1');
    const bannerTitleBottom2 = document.querySelector('.js-banner__title-bottom-2');
    const limitTime = 1500;

    function OnLoadPreloadAnimation() {
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
    }

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
    App.OnLoadPreloadAnimation = OnLoadPreloadAnimation;
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
                    document.getElementById('contact-form').reset();
                }, messageDisplayTime);
            }, function (error) {
                App.SetModalText('Some thing when wrong, please try again', App.MessageMode.Fail);
                setTimeout(function () {
                    (new App.ModalVisibility()).Hidden();
                    document.getElementById('contact-form').reset();
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

const FetchDataService = (function () {
    const dataSetName = "portfolio2021";

    const client = contentful.createClient({
        space: "np5xiu7p1a25",
        accessToken: "64YNvoh63aQMrddRtnNAVZxHlXGdfRMjuoeB4cnXE_Q"
    });

    async function FetchLanguage() {
        return await client.getEntries({
            content_type: dataSetName
        }).then(function (data) {
            let items = data.items;
            items = items.map(function (item) {
                return item.fields;
            })

            return items;
        })
    }

    App.FetchLanguage = FetchLanguage;
})()

const CheckUserCountryService = (function () {
    function fetchCountryData() {
        return fetch('https://extreme-ip-lookup.com/json/?key=hsA5j5AAWFkKE4VLTLDZ')
            .then(function (data) {
                return data.json();
            })
            .catch((data, status) => {
                console.log('Request failed');
            });
    }

    App.FetchCountryData = fetchCountryData;
})();

function LaguageViewModel() {
    var self = this;

    self.Banner = {
        sectionTitle: ko.observable(),
        title_1: ko.observable(),
        title_2: ko.observable(),
        title_3: ko.observable(),
        buttonTitle: ko.observable(),
        scrollTitle: ko.observable()
    };

    self.About = {
        sectionTitle: ko.observable(),
        paragraph_1: ko.observable(),
        paragraph_2: ko.observable()
    };

    self.ResumePartOne = {
        sectionTitle: ko.observable(),
        contentBlocks: ko.observableArray()
    };

    self.ResumePartTwo = {
        sectionTitle: ko.observable(),
        contentBlocks: ko.observableArray()
    };

    self.Services = {
        sectionTitle: ko.observable(),
        title_1: ko.observable(),
        title_2: ko.observable(),
        contentBlocks: ko.observable()
    };

    self.Portfolio = {
        sectionTitle: ko.observable(),
        title_1: ko.observable(),
        title_2: ko.observable(),
        contentBlocks: ko.observableArray()
    };

    self.Contact = {
        sectionTitle: ko.observable(),
        title_1: ko.observable(),
        title_2: ko.observable(),
        title_3: ko.observable(),
        contactForm: {
            name: ko.observable(),
            email: ko.observable(),
            subject: ko.observable(),
            message: ko.observable(),
            submit: ko.observable()
        }
    };

    var Language = {
        VietNam: {
            Id: 0,
            Code: "VN"
        },
        Japan: {
            Id: 1,
            Code: "JP"
        }
    }

    var Section = {
        Banner: {
            id: 0,
            name: "banner"
        },
        About: {
            id: 1,
            name: "about"
        },
        Resume_1: {
            id: 2,
            name: "resume"
        },
        Resume_2: {
            id: 3,
            name: "resume"
        },
        Service: {
            id: 4,
            name: "service"
        },
        Portfilio: {
            id: 5,
            name: "portfolio"
        },
        Contact: {
            id: 6,
            name: "contact"
        },
        Message: {
            id: 7,
            name: "message"
        }
    }

    function getSectionById(id, data) {
        return data.filter(function (item) {
            return item.id === id
        })[0];
    }

    function InitViewModel(data) {
        var bannerData = getSectionById(Section.Banner.id, data);
        var aboutData = getSectionById(Section.About.id, data);
        var resumePart1Data = getSectionById(Section.Resume_1.id, data);
        var resumePart2Data = getSectionById(Section.Resume_2.id, data);
        var serviceData = getSectionById(Section.Service.id, data);
        var portfolioData = getSectionById(Section.Portfilio.id, data);
        var contactData = getSectionById(Section.Contact.id, data);
        var messageData = getSectionById(Section.Message.id, data);

        self.Banner.sectionTitle(bannerData.title);
        self.Banner.title_1(bannerData.content.title_1);
        self.Banner.title_2(bannerData.content.title_2);
        self.Banner.title_3(bannerData.content.title_3);
        self.Banner.buttonTitle(bannerData.content.icon_1_title);
        self.Banner.scrollTitle(bannerData.content.icon_2_title);

        self.About.sectionTitle(aboutData.title);
        self.About.paragraph_1(aboutData.content.p_1);
        self.About.paragraph_2(aboutData.content.p_2);
        
        self.ResumePartOne.sectionTitle(resumePart1Data.title);
        self.ResumePartOne.contentBlocks(resumePart1Data.content);

        self.ResumePartTwo.sectionTitle(resumePart2Data.title);
        self.ResumePartTwo.contentBlocks(resumePart2Data.content);

        self.Services.title_1(serviceData.title_1);
        self.Services.title_2(serviceData.title_2);
        self.Services.contentBlocks(serviceData.content);
        
        self.Portfolio.title_1(portfolioData.title_1);
        self.Portfolio.title_2(portfolioData.title_2);
        self.Portfolio.contentBlocks(portfolioData.content);
        console.log(portfolioData.content)
    }

    self.BindingLanguage = function (languageCode, data) {
        var returnData = data.filter(function (item) {
            return item.languageCode === languageCode
        })[0];
        InitViewModel(returnData.content);
    }
}

function ViewModel() {
    var self = this;

    self.LanguageViewModel = new LaguageViewModel();

    (function () {
        (new App.PreloadVisibility()).Active();
        App.FetchCountryData().then(function (currentCountry) {
            App.FetchLanguage().then(function (languageDataSet) {
                self.LanguageViewModel.BindingLanguage(currentCountry.countryCode, languageDataSet);
            })
        }).then(function () {
            (new App.PreloadVisibility()).Hidden();
        })
    })();
}

const OnLoadPage = (function () {
    window.addEventListener('load', (event) => {
        ko.applyBindings(ViewModel, document.getElementById('main-page'));
    });
})();

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