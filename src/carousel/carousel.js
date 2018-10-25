var TAB_WIDTH = 1024;
var INPUT_MAX_VAL = 100;
var THUMB_RIGHT = -5;
var input = document.getElementsByClassName('toggle__input')[0];
var carousel = document.getElementsByClassName('carousel')[0];
var tabs = document.querySelectorAll('.carousel > .slide');
var thumb = document.getElementsByClassName('toggle__thumb')[0];
var barProg = document.getElementsByClassName('toggle__bar-prog')[0];
var borderVals = setBorders(tabs.length);
var initSlide;
var right;

carousel.style.right = 0;
thumb.style.right = THUMB_RIGHT + 'px';

input.addEventListener('touchstart', function(evt) {
    evt.stopPropagation();
    
    initSlide = initialSlide(input.value);
    right = parseInt(carousel.style.right);

    setTimeout(changeSlide, 0);
    
    this.addEventListener('touchmove', changeSlide, false);
    
    this.addEventListener('touchend', function() {
        this.removeEventListener('touchmove', changeSlide);
        setTimeout(changeSlide, 0);
        moveToggle(input.value);
    }, {once: true});
}, false);

// Changing slide according to toggle position

function changeSlide() {
    var inputVal = input.value;
    var rightVal;

    borderVals.some(function(item, idx) {
        if (inputVal >= item[0] && inputVal <= item[1]) {

            if (initSlide > idx) {
                rightVal = right - TAB_WIDTH * (initSlide - idx);
                
            } else if (initSlide < idx) {
                rightVal = right + TAB_WIDTH * (idx - initSlide);
                
            } else if (initSlide === idx) {
                rightVal = right;
            }

            carousel.style.right = rightVal + 'px';
            moveWrapper(input.value);
            return true;
        }
    });
}

// Setting borders for slides on toggle

function setBorders(tabCount) {
    var result = [];
    var border = INPUT_MAX_VAL / tabCount;
    
    for (var i = 0; i < tabCount; i++) {
        result[i] = [];
        
        if (i === 0) {
            result[0].push(0, border);
        
        } else if (i === tabCount - 1) {
            result[i].push(result[i-1][1], INPUT_MAX_VAL);
        
        } else {
            result[i].push(result[i-1][1], border * (i + 1));
        }
    }

    return result;
}

// Looking for current slide

function initialSlide(inpStartVal) {
    var slideNum;

    borderVals.some(function(item, idx) {
    
        if (inpStartVal >= item[0] && inpStartVal <= item[1]) {
            slideNum = idx;
            return true;
        }
    });

    return slideNum;
}

// Moving toggle to year tag

function moveToggle(inputVal) {
    var inputTags = setBorders(tabs.length - 1, inputVal);
    
    inputTags.some(function(tagsItem) {
    
        if (inputVal >= tagsItem[0] && inputVal <= tagsItem[1]) {
            var aveTag = (tagsItem[1] + tagsItem[0]) / 2;
        
        borderVals.some(function(bordItem) {
            
            if (inputVal >= bordItem[0] && inputVal <= bordItem[1]) {
                var aveBord = (bordItem[1] + bordItem[0]) / 2;
            
                if (aveBord <= aveTag) {
                    input.value = tagsItem[0];
                
                } else if (aveBord > aveTag) {
                    input.value = tagsItem[1];
                }

                moveWrapper(input.value);
                return true;
            }
        });

            return true;
        }
    });
}

// Moving input wrapper

function moveWrapper(inpVal) {
    barProg.style.width = inpVal + '%';
    thumb.style.right = ((inpVal - INPUT_MAX_VAL) / 3 + THUMB_RIGHT) + 'px';
}