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

// BURGER MENU
const burger = document.getElementById("burger-wrapper");
const menu = document.getElementById("menu");
const cross = document.getElementById("close-menu");
burger.addEventListener("click", addMenu);
cross.addEventListener("click", removeMenu);

function addMenu() {
  menu.style.animation = "menuIn 1s";
  menu.style.display = "inherit";
  document.body.style.overflow = "hidden";
}

function removeMenu() {
  menu.style.animation = "menuOut 1s forwards";
  document.body.style.overflow = "inherit";
}


const containersNodeList = document.querySelectorAll('.container');
const projectsNodeList = document.querySelectorAll('.project');
let containers = Array.from(containersNodeList);
let projects = Array.from(projectsNodeList);

let scrollPos = 0;

const body = document.querySelector('body');

function checkPosition(e) {
  
  // CHANGE BACKGROUND COLOR DEPENDING ON SCROLL POSITION
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
    
    const colorVal2 = "rgba(255, 236, 234," + opacityVal + ")";
    const colorVal3 = "rgba(247, 253, 252," + opacityVal + ")";
    const colorVal4 = "rgba(243, 238, 247," + opacityVal + ")";
    const colorVal5 = "rgba(152, 52, 96," + opacityVal + ")";
    const colorVal51 = "rgb(255, 255, 255)";

    const currentSectionNumberOut = Math.round((window.scrollY - colorRemoveStart) / colorSectionHeight);
    const reversedOpacityVal = (100 - currentSectionNumberOut) / 100;

    const colorValOut1 = "rgba(238, 238, 254," + reversedOpacityVal + ")";
    const colorValOut2 = "rgba(255, 236, 234," + reversedOpacityVal + ")";
    const colorValOut3 = "rgba(247, 253, 252," + reversedOpacityVal + ")";
    const colorValOut4 = "rgba(243, 238, 247," + reversedOpacityVal + ")";

    let className = container.classList[1];

    if (window.scrollY > colorAddStart && window.scrollY < colorAddEnd) {
      switch (className) {
        case "container2":
          document.body.style.backgroundColor = colorVal2;
          break;
        // case "container3":
        //   document.body.style.backgroundColor = colorVal3;
        //   break;
        case "container4":
          document.body.style.backgroundColor = colorVal4;
          break;
        case "container5":
          document.body.style.backgroundColor = colorVal5;
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
          // case "container3":
          //   document.body.style.backgroundColor = colorValOut3;
          //   break;
          case "container4":
            document.body.style.backgroundColor = colorValOut4;
            break;
          default:
            break;
        }
    }
  })
  


// SLIDE IN PROJECTS
  // projects.forEach(project => {
    
  //   const startPosition = window.scrollY + window.innerHeight >= project.offsetTop;
  //   const endPosition = window.scrollY + window.innerHeight <= project.offsetTop + project.offsetHeight / 3;
  //   const scrollUp = window.scrollY < scrollPos;

  //   if (startPosition) {
  //     project.classList.add("slidein");
  //   } else if (scrollUp) {
  //     project.classList.remove("slidein");
  //   } else if (endPosition && !startPosition && scrollUp) {
  //     project.classList.add("slideout");
  //   }
    
  // })
  
  // scrollPos = window.scrollY;
}  

window.addEventListener('scroll', debounce(checkPosition));