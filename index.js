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

const containers = document.querySelectorAll('.container');

function checkPosition(e) {
  containers.forEach(container => {
    const changeColorAt = (window.scrollY + window.innerHeight) - container.offsetHeight / 4;
    const containerBottom = container.offsetTop + container.offsetHeight;
    const isHalfShown = changeColorAt > container.offsetTop;
    const isNotScrolledPast = window.scrollY < containerBottom;
    if (isHalfShown && isNotScrolledPast) {
      container.classList.add('active');
    } else {
      container.classList.remove('active');
    }
  })
}


window.addEventListener('scroll', debounce(checkPosition));