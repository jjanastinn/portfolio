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

// ADD DIFFERENT COLORS FOR DIFFERENT CONTAINERS

const containersNodeList = document.querySelectorAll('.container');
const parallaxBg = document.querySelector('.projectOneBgOne');
let containers = Array.from(containersNodeList);

const body = document.querySelector('body');

function checkPosition(e) {
  containers.forEach(container => {
    const index = containers.indexOf(container);
    let containersBefore = containers.slice(0, index);
    let colorAddStart = 0;
    containersBefore.forEach(containerBefore => {
      colorAddStart += containerBefore.offsetHeight;
    });
    const colorAddEnd = colorAddStart + container.offsetHeight / 3;
    const colorRemoveStart = colorAddStart + (container.offsetHeight / 3) * 2; 
    const colorRemoveEnd = colorAddStart + container.offsetHeight;
    const colorSectionHeight = (colorAddEnd - colorAddStart) / 100;

    const currentSectionNumber = Math.round((window.scrollY - colorAddStart) / colorSectionHeight);
    const opacityVal = currentSectionNumber / 100;
    
    const colorVal1 = "rgba(191,14,89," + opacityVal + ")";
    const colorVal2 = "rgba(73,62,82," + opacityVal + ")";
    const colorVal3 = "rgba(69,12,36," + opacityVal + ")";

    const currentSectionNumberOut = Math.round((window.scrollY - colorRemoveStart) / colorSectionHeight);
    const reversedOpacityVal = (100 - currentSectionNumberOut) / 100;

    const colorValOut1 = "rgba(191,14,89," + reversedOpacityVal + ")";
    const colorValOut2 = "rgba(73,62,82," + reversedOpacityVal + ")";
    const colorValOut3 = "rgba(69,12,36," + reversedOpacityVal + ")";

    let className = container.classList[1];

    if (window.scrollY > colorAddStart && window.scrollY < colorAddEnd) {
      switch (className) {
        case "container1":
          document.body.style.backgroundColor = colorVal1;
          break;
        case "container2":
          document.body.style.backgroundColor = colorVal2;
          break;
        case "container3":
          document.body.style.backgroundColor = colorVal3;
          parallaxBg.style.backgroundPositionY=  (window.scrollY - parallaxBg.offsetTop) / 1.5+ "px";
          break;
        default:
          document.body.style.backgroundColor = "white";
          break;
      }
    } else if (window.scrollY > colorRemoveStart && window.scrollY < colorRemoveEnd) {
        switch (className) {
          case "container1":
            document.body.style.backgroundColor = colorValOut1;
            break;
          case "container2":
            document.body.style.backgroundColor = colorValOut2;
            break;
          case "container3":
            document.body.style.backgroundColor = colorValOut3;
            break;
          default:
            document.body.style.backgroundColor = "white";
            break;
        }
    }
  })
}  

// ADD ONE COLOR FOR ONE CONTAINER

// const container1 = document.querySelector('.container1');
// const container2 = document.querySelector('.container2');
// const container3 = document.querySelector('.container3');

// const body = document.querySelector('body');

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

// ADD SAME COLOR TO EVERY CONTAINER

// const containers = document.querySelectorAll('.container');
// const body = document.querySelector('body');

// function checkPosition(e) {
//   containers.forEach(container => { 
//     const colorAddStart = container.offsetTop; 
//     const colorAddEnd = container.offsetTop + container.offsetHeight / 3;
//     const colorRemoveStart = container.offsetTop + (container.offsetHeight / 3) * 2; 
//     const colorRemoveEnd = container.offsetTop + container.offsetHeight;
//     const colorSectionHeight = ((colorAddEnd) - colorAddStart) / 100;      
//     if (window.scrollY >= colorAddStart && window.scrollY <= colorAddEnd) {
//       const currentSectionNumber = Math.round((window.scrollY - container.offsetTop) / colorSectionHeight);
//       const opacityVal = currentSectionNumber / 100;
//       const colorVal = "rgba(191,14,89," + opacityVal + ")";
//       document.body.style.backgroundColor = colorVal; 
//     } else if (window.scrollY > colorRemoveStart && window.scrollY < colorRemoveEnd) {
//       const currentSectionNumberOut = Math.round((window.scrollY - colorRemoveStart) / colorSectionHeight);
//       const reversedOpacityVal = (100 - currentSectionNumberOut) / 100;
//       const colorValOut = "rgba(191,14,89," + reversedOpacityVal + ")";
//       document.body.style.backgroundColor = colorValOut;
//     }
//   });
// }

window.addEventListener('scroll', debounce(checkPosition));