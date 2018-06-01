'use strict';

function debounce(func, wait = 10, immediate = true) {
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

const containers = document.querySelectorAll('.container');
// const container1 = document.querySelector('.container1');
// const container2 = document.querySelector('.container2');
// const container3 = document.querySelector('.container3');

const body = document.querySelector('body');

function checkPosition(e) {
  containers.forEach(container => { 
    const colorAddStart = container.offsetTop; 
    const colorAddEnd = container.offsetTop + container.offsetHeight / 3;
    const colorRemoveStart = container.offsetTop + (container.offsetHeight / 3) * 2; 
    const colorRemoveEnd = container.offsetTop + container.offsetHeight;
    const colorSectionHeight = ((colorAddEnd) - colorAddStart) / 100;    
    
    if (window.scrollY >= colorAddStart && window.scrollY <= colorAddEnd) {
      const currentSectionNumber = Math.round((window.scrollY - container.offsetTop) / colorSectionHeight);
      const opacityVal = currentSectionNumber / 100;
      const colorVal = "rgba(191,14,89," + opacityVal + ")";
      document.body.style.backgroundColor = colorVal; 
    } else if (window.scrollY > colorRemoveStart && window.scrollY < colorRemoveEnd) {
      const currentSectionNumberOut = Math.round((window.scrollY - colorRemoveStart) / colorSectionHeight);
      const reversedOpacityVal = (100 - currentSectionNumberOut) / 100;
      const colorValOut = "rgba(191,14,89," + reversedOpacityVal + ")";
      document.body.style.backgroundColor = colorValOut;
    }
  });

   
}

// function checkPosition(e) {

//   const colorAddStart = container1.offsetHeight + container2.offsetHeight; 
//   const colorAddEnd = container1.offsetHeight + container2.offsetHeight + container3.offsetHeight / 3;
//   const colorRemoveStart = container1.offsetHeight + container2.offsetHeight + (container3.offsetHeight / 3) * 2; 
//   const colorRemoveEnd = container1.offsetHeight + container2.offsetHeight + container3.offsetHeight;
//   const colorSectionHeight = (colorAddEnd - colorAddStart) / 100;

//   if (window.scrollY > colorAddStart && window.scrollY < colorAddEnd) {
//     const currentSectionNumber = Math.round((window.scrollY - colorAddStart) / colorSectionHeight);
//     const opacityVal = currentSectionNumber / 100;
//     const colorVal = "rgba(191,14,89," + opacityVal + ")";
//     document.body.style.backgroundColor = colorVal; 
//   } else if (window.scrollY > colorRemoveStart && window.scrollY < colorRemoveEnd) {
//     const currentSectionNumberOut = Math.round((window.scrollY - colorRemoveStart) / colorSectionHeight);
//     const reversedOpacityVal = (100 - currentSectionNumberOut) / 100;
//     const colorValOut = "rgba(191,14,89," + reversedOpacityVal + ")";
//     document.body.style.backgroundColor = colorValOut;
//   }
 
// }

window.addEventListener('scroll', debounce(checkPosition));