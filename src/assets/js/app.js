import {Tooltip, Modal} from 'bootstrap';
import LazyLoad from 'vanilla-lazyload'; // https://github.com/verlok/vanilla-lazyload
import { CountUp } from 'countup.js';
import { tns } from "tiny-slider";
import AOS from 'aos';
import Rellax from 'rellax';

// vanilla-lazyload
let lazyLoadInstance = new LazyLoad();
lazyLoadInstance.update();

// tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl)
})

AOS.init({
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down

    disable: function() {
        let maxWidth = 768;
        return window.innerWidth < maxWidth;
    }
});

// mobile menu
function collapseMenu() {
    document.querySelectorAll('#mainMenu .nav-link').forEach(function(item) {
        item.addEventListener('click', function (){
            const menuToggler = document.querySelector("#navbarToggler");
            menuToggler.click();
        });
    });
}

let menuToggler = document.getElementById("navbarToggler");
menuToggler.addEventListener("click", collapseMenu);


// menu active links when scrolling
function menuActiveLinks() {
    let sections = document.querySelectorAll(".nav-section");
    let navLi = document.querySelectorAll("#mainMenu .nav-item");
    window.onscroll = () => {
        var current = "";

        sections.forEach((section) => {
            let sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 70) {
                current = section.getAttribute("id"); }
        });

        navLi.forEach((li) => {
            li.classList.remove("active");
            if (li.classList.contains(current)) {
                li.classList.add("active");
            }
        });
    };
}

function round(value, places) {
    return Math.round(value/places)*places;
}


menuActiveLinks();

function paymentToggle() {
    let toggler = document.getElementById("paymentToggler"),
        priceElements = document.querySelectorAll('.payment-value'),
        priceValuesMonthly = [...priceElements].map(e => round(parseInt(e.innerHTML), 10)),
        priceValuesYearly = priceValuesMonthly.map(e => round(e * 12 * 0.9, 10));

    toggler.addEventListener("change", _toggleMe, false);

    function _toggleMe(){
        let isChecked = toggler.checked;

        $('.interval-name').toggle();
        $(toggler).siblings(".interval").toggleClass('active');

        if(isChecked){ //checked
            priceElements.forEach(function (e, i) {
                animateCalculation(e, {
                    from  : priceValuesMonthly[i],
                    to    : priceValuesYearly[i]
                });
            });

        } else { //unchecked
            priceElements.forEach(function (e, i) {
                animateCalculation(e, {
                    from  : priceValuesYearly[i],
                    to    : priceValuesMonthly[i]
                })
            });
        }
    }
}

paymentToggle();

// Do the animation while calculating
function animateCalculation (target, params) {

    // Prepare object for counting price
    let counter = new CountUp(target, params.to, { startVal: params.from });

    // Animate calculation
    counter.start();
}


// References slider
let slider = tns({
    container: '.tns-references',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    mouseDrag: true,
    autoplayButtonOutput: false,
    lazyload: true,
    controlsPosition: 'bottom',
    navPosition: 'bottom',
    controlsText: ['<i class="back"></i>', '<i class="forward"></i>'],
});

// conatct form fliping

$(function(){
    // Backbone code in here
    let form = $('#contactForm');
    form.submit(function (e){
        e.preventDefault();
        form.parents(".flip-card").toggleClass('flipped');
    })
});

// parallax rellax library
var rellax = new Rellax('.rellax');
