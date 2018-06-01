'use strict';

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');
const container3 = document.querySelector('.container3');

const body = document.querySelector('body');

function checkPosition(e) {

    const colorAddStart = container1.offsetHeight + container2.offsetHeight - container3.offsetHeight / 2; //900
    const colorAddEnd = container1.offsetHeight + container2.offsetHeight - container3.offsetHeight / 4; //1050
    const colorSectionHeight = (colorAddEnd - colorAddStart) / 100;

    if (window.scrollY > colorAddStart && window.scrollY < colorAddEnd) {
      const currentSectionNumber = Math.round((window.scrollY - colorAddStart) / colorSectionHeight);
      const opacityVal = currentSectionNumber / 100;
      const colorVal = "rgba(191,14,89," + opacityVal + ")";
      document.body.style.backgroundColor = colorVal; 
    } else {
      document.body.style.backgroundColor = "white";
    }
   
}


window.addEventListener('scroll', debounce(checkPosition));