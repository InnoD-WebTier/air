window.onload = function() {
  function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  function querySelectorAllApply(selector, func) {
    for (let node of document.querySelectorAll(selector)) {
      func(node);
    }
  }

  function unbold(node) {
    node.style.fontWeight = 'normal';
  }

  function bold(node) {
    node.style.fontWeight = 'bold';
  }

  let navNodeMap = {
    'home': document.querySelector('.nav-list #nav-home'),
    'videos': document.querySelector('.nav-list #nav-videos'),
    'about': document.querySelector('.nav-list #nav-about'),
    'members': document.querySelector('.nav-list #nav-members'),
    'news': document.querySelector('.nav-list #nav-news'),
    'contact': document.querySelector('.nav-list #nav-contact')
  };

  let minVisibleHeaderNode;
  document.addEventListener('scroll', function() {
    querySelectorAllApply('.nav-list li', unbold);

    if (window.scrollY == 0) {
      // scrolled to top
      bold(navNodeMap.home);
    } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // scrolled to bottom
      bold(navNodeMap.contact);
    } else {
      // else...
      let headers = document.querySelectorAll('h2');
      let minVisibleHeaderPos = Infinity;
      for (let headerNode of headers) {
        // 2rem for h2 height, 1rem just in case
        let pos = headerNode.getBoundingClientRect().y + convertRemToPixels(3);
        if (pos >= 0 && pos < minVisibleHeaderPos) {
          minVisibleHeaderNode = headerNode;
          minVisibleHeaderPos = pos;

          bold(navNodeMap[minVisibleHeaderNode.id]);
        }
      }
    }
  });

  document.querySelector('.overlay-nav-container').style.visibility = 'visible';
  document.querySelector('.overlay-nav-container').style.opacity = '1';
};
