function addActiveNav(navItemsSelector){
    const nav = document.querySelectorAll(navItemsSelector);
    nav.forEach(nav_item => {
        nav_item.addEventListener('click', (e)=>{
            e.preventDefault()
            if(!e.target.querySelector("i") && !e.target.classList.contains("fas")){
                nav.forEach(i => {
                    if(i.classList.contains('active')){
                        i.classList.remove('active');
                    }
                });
                e.target.classList.add('active');
            }
            // if(!e.target.classList.contains("fas"))
            //     e.target.classList.add('active');
            // else{
            //     let parent = e.target.parentNode;
            //     parent.classList.add('active');
            // }
        });
    });
}


function clickBars(navSelector, navItemsSelector, barsSelector){
    const nav = document.querySelector(navSelector),
    menuItem = document.querySelectorAll(navItemsSelector),
    hamburger = document.querySelector(barsSelector);

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('navbar-mobile');
        hamburger.classList.toggle('fa-bars');
        hamburger.classList.toggle('fa-times');
    });
    menuItem.forEach(item => {
        item.addEventListener('click', (e) => {
            nav.classList.remove('navbar-mobile');
            hamburger.classList.toggle('fa-bars');
            hamburger.classList.toggle('fa-times');
        });
    });
}

function headerAddScrolled(){
    const header = document.querySelector('.header');
    if (window.scrollY > 1) {
        header.classList.add('header-scrolled');
    }
    else{
        header.classList.remove('header-scrolled');
    }
}

// Slider

function slider({container, slide, nextArrow, prevArrow, wrapper, field}) {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; 
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
}

// Animated text

//Tabs

function tabs(tab_container, tab_item, layout_mode, ul_selector, active_class, filterBy){
    const portfolioContainer = document.querySelector(tab_container)
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: tab_item,
            layoutMode: layout_mode
        });

        ul_items = ul_selector;
        const portfolioFilters = document.querySelectorAll(ul_selector)
        
        portfolioFilters.forEach((element) => {
            element.addEventListener('click', (e)=>{
                e.preventDefault();
                portfolioFilters.forEach((i) =>{
                    if(i.classList.contains(active_class)){
                        i.classList.remove(active_class);
                    }
                });
                e.target.classList.add(active_class);
                portfolioIsotope.arrange({
                    filter: e.target.getAttribute(filterBy)
                });
                // portfolioIsotope.on('arrangeComplete', function() {
                //     AOS.refresh()
                // });
            });
        });
    }
}

// Modals
function closeModals(modalSelector) {
    const modals = document.querySelectorAll(modalSelector);
        
    modals.forEach(modal => {
        modal.classList.remove('show');
        
        document.body.style.overflow = '';
    });
}

function openModal(modalSelector, title="") {
    const modal = document.getElementById(modalSelector);

    if(modalSelector == "order"){
        let m_descr = modal.querySelector(".modals__descr");
        m_descr.textContent = title;
    }
    

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function modal(triggerSelector, modalSelector) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelectorAll(modalSelector);
    

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModals(modalSelector);
            type = e.target.getAttribute("data-type-in");
            console.log(type);
            if(type == "order"){
                parentDiv = btn.parentNode;
                title = parentDiv.querySelector("h4").textContent
                openModal(type, title);
            }
            else if(type == "cart"){
                renderCart(".cart__wrapper");
                openModal(type);
            }
        });
    });

    modal.forEach(msg => {
        msg.addEventListener('click', (e) => {
            if (e.target === msg || e.target.getAttribute('data-close') == "") {
                closeModals(modalSelector);
            }
        });
    });
}

function analyzeStorage(){
    let buttons = document.querySelectorAll('[data-btnAdd]');

    buttons.forEach((btn) => {
        parent1 = btn.parentNode;
        parent2 = parent1.parentNode;

        title = parent2.querySelector("h3").textContent;

        if(localStorage.getItem(title)){
            span = btn.querySelector("span");
            span.textContent = "-";
            btn.classList.add('clicked');
        }

    });

    const productsTitles = document.querySelectorAll(".produkts__item-title"),
        jobTitles = document.querySelectorAll(".job__item-title");
    
        removeNotExistItems(productsTitles);
        removeNotExistItems(jobTitles);
}

function removeNotExistItems(titles){
    let keys = Object.keys(localStorage);

    keys.forEach((key) => {
        let yes = false;
        titles.forEach((title) => {
            if(title.textContent == key){
                yes = true;
            }
        });
        if(!yes){
            localStorage.removeItem(key);
        }
    });
}

function renderCart(wrapperSelector){
    let keys = Object.keys(localStorage),
        len = keys.length;

    let wrapper = document.querySelector(wrapperSelector);
    wrapper.innerHTML = "";
    parentWraper = wrapper.parentNode;
    btn = parentWraper.querySelector(".btn__choose");

    if(len == 0){
        const element = document.createElement('div');

        if(btn.classList.contains('show')){
            btn.classList.remove('show');
            btn.classList.add('hide');
        }
        element.classList.add("cart__empty-title");
        element.innerHTML = `Кошик пустий`;
        wrapper.append(element);
    }
    else{
        for(let i = 0; i < len; i++){
            title = keys[i];
            price = localStorage.getItem(title);
            const element = document.createElement('div');
            element.classList.add("cart__item");

            element.innerHTML = `
                        <div class="cart__item-title">
                            ${title}
                        </div>
                        <div class="cart__item-price">
                            ${price}
                        </div>
                    `;
            wrapper.append(element);
        }
        if(!btn.classList.contains('show')){
            btn.classList.remove('hide')
            btn.classList.add('show');
        }
    }
}
function addElemToLocalStorage(buttonSelector){
    let buttons = document.querySelectorAll(buttonSelector);

    buttons.forEach((btn) =>{
        btn.addEventListener('click', (e)=>{
            e.preventDefault();

            parent1 = btn.parentNode;
            parent2 = parent1.parentNode;
            title = parent2.querySelector("h3").textContent;
            price = parent2.querySelector(".numeric_price").textContent;

            span = btn.querySelector("span");
            if(btn.classList.contains('clicked')){
                localStorage.removeItem(title);
                span.textContent = "+";
                btn.classList.remove('clicked');
            }
            else{
                localStorage.setItem(title, price);
                span.textContent = "-";
                btn.classList.add('clicked');
            }
        });
    });
}

// card Flip

function cardFlip(cardItemSelector, cardBtnClass){
    const cardItems = document.querySelectorAll(cardItemSelector);
        
    cardItems.forEach((cardItem) => {
        cardItem.addEventListener('click', (e)=>{
            console.log(e.target);
            const targetParent = e.target.parentNode;
            if(!targetParent.classList.contains(cardBtnClass) && e.target.className != cardBtnClass){
                cardItem.classList.toggle("is-flipped");
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', function() {
    addActiveNav('.navbar-link');
    clickBars('.navbar', '.navbar-link', '.mobile-nav-bars');
    slider({
        container: '.slider',
        slide: '.slide',
        nextArrow: '.slider-next',
        prevArrow: '.slider-prev',
        wrapper: '.slider-wrapper',
        field: '.slider-inner'
    });
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    modal('[data-order]', '[data-modal]');
    modal('[data-cart]', '[data-modal]');
    addElemToLocalStorage('[data-btnAdd]');
    analyzeStorage();
    cardFlip(".job__layer", "job__item-btn");
    cardFlip(".produkts__layer", "produkts__item-btn");
});

window.addEventListener('load', () =>{
    tabs(
        '.tariffs__wrapper',
        '.tariffs__item',
        'fitRows',
        '.tariffs__types li',
        'type-active',
        'data-type'
    );

    tabs(
        '.job__wrapper',
        '.job__item',
        'fitRows',
        '.job__types li',
        'type-active',
        'data-type'
    );

    tabs(
        '.produkts__wrapper',
        '.produkts__item',
        'fitRows',
        '.produkts__types li',
        'type-active',
        'data-type'
    );
});
window.addEventListener('scroll', function(){
    headerAddScrolled();
});
