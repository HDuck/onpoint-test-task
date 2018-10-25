var slidesCont = document.getElementsByClassName('slider-container')[0];
var slides = document.querySelectorAll('.slider-container > .slide');
var pagItems = document.getElementsByClassName('pagination__circle');
var bar = document.getElementsByClassName('next-slide')[0];
var slidesArr = Array.prototype.slice.call(slides, 0);
var SLIDE_HEIGHT = 768;
console.log(pagItems);
slidesCont.style.top = 0;

slidesArr.forEach(function(item) {

    item.addEventListener('touchstart', function(evt) {
        var initClientY = evt.changedTouches[0].clientY;
        var slide = evt.currentTarget;

        item.addEventListener('touchmove', hideBar, {once: true});

        item.addEventListener('touchend', function(evt) {
            var endClientY = evt.changedTouches[0].clientY;
            var diffClientY = endClientY - initClientY;
            
            if (Math.abs(diffClientY) > SLIDE_HEIGHT * 0.05) {
                
                if (diffClientY > 0 && isNextSlide(slide, 0)) {
                    changeSlide(slide, 0);
                
                } else if (diffClientY < 0 && isNextSlide(slide, 1)) {
                    changeSlide(slide, 1);
                }
            }

            showBar();
        }, {once: true});
}, false);

});
 
function isNextSlide(currSlide, direction) {
    // direction = 0 for backward move
    // direction = 1 for forward move

    var lastIdx = slides.length - 1;
    var currSlidePos;

    slidesArr.some(function(item, idx) {
        
        if (item.classList[1] === currSlide.classList[1]) {
            currSlidePos = idx;
            return true;
        }
    });

    switch (currSlidePos) {

        case 0: {

            if (direction) {
                return true;
                
            } else {
                return false;
            }
        }

        case lastIdx: {

            if (direction) {
                return false;
                
            } else {
                return true;
            }
        }

        default: return true;
    }
}
 
function changeSlide(currSlide, direction) {
    // direction = 0 for backward move
    // direction = 1 for forward move

    var currSlideIdx = parseInt(currSlide.classList[1][6]);
    var nextSlideIdx;

    if (direction) {
        slidesCont.style.top = (-SLIDE_HEIGHT * (currSlideIdx)) + 'px';
        nextSlideIdx = currSlideIdx + 1;

    } else if (!direction) {
        slidesCont.style.top = (-SLIDE_HEIGHT * (currSlideIdx - 2)) + 'px';
        nextSlideIdx = currSlideIdx - 1;
    }

    changePageIdx(nextSlideIdx, currSlideIdx);
}
 
function changePageIdx(nextSlide, currSlide) {
    pagItems[currSlide - 1].className = 'pagination__circle';
    pagItems[nextSlide - 1].className += ' pagination__circle_active';
}
 
function showBar() {
    bar.style = 'opacity: 1; transition: opacity .3s ease .5s;';
}
 
function hideBar() {
    bar.style = 'opacity: 0;';
}