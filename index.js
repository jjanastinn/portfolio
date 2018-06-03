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



const containersNodeList = document.querySelectorAll('.container');
const projectsNodeList = document.querySelectorAll('.project');
let containers = Array.from(containersNodeList);
let projects = Array.from(projectsNodeList);

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
    
    const colorVal2 = "rgba(73,62,82," + opacityVal + ")";
    const colorVal3 = "rgba(69,12,36," + opacityVal + ")";

    const currentSectionNumberOut = Math.round((window.scrollY - colorRemoveStart) / colorSectionHeight);
    const reversedOpacityVal = (100 - currentSectionNumberOut) / 100;

    const colorValOut1 = "rgba(1,66,51," + reversedOpacityVal + ")";
    const colorValOut2 = "rgba(73,62,82," + reversedOpacityVal + ")";
    const colorValOut3 = "rgba(69,12,36," + reversedOpacityVal + ")";

    let className = container.classList[1];

    if (window.scrollY > colorAddStart && window.scrollY < colorAddEnd) {
      switch (className) {
        case "container2":
          document.body.style.backgroundColor = colorVal2;
          break;
        case "container3":
          document.body.style.backgroundColor = colorVal3;
          break;
        default:
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
            break;
        }
    }
  })

  projects.forEach(project => {

    let scrollPos = 0;
    const startPosition = window.scrollY + window.innerHeight >= project.offsetTop;
    if (startPosition && (document.body.getBoundingClientRect()).top < scrollPos) {
      project.classList.add("active");
      scrollPos = (document.body.getBoundingClientRect()).top;
    } else if ((document.body.getBoundingClientRect()).top > scrollPos) {
      project.classList.remove("active");
      scrollPos = (document.body.getBoundingClientRect()).top;
    }
  })

}  

window.addEventListener('scroll', debounce(checkPosition));