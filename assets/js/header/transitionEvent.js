/* global document */

let $el         = document.createElement('div');
let transitions = {
    transition      : 'transitionend',
    OTransition     : 'oTransitionEnd',
    MozTransition   : 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
};

let transition = 'transitionend';

for (let key of Object.keys(transitions)) {
    if ($el.style.hasOwnProperty(key)) {
        transition = transitions[key];
        break;
    }
}

export default transition;
