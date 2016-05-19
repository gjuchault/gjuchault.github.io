/* global document, vm, window */

import transitionEvent from './transitionEvent.js';

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

export default class Slider {
    /**
     * Creates the slider
     * @param {HTMLElement} slider The slider container
     */
    constructor(slider) {
        this.slider           = slider;
        this.$content         = slider.children[0];
        this.currentIndex     = 0;
        this.$pages           = Array.from(this.$content.children);
        this.isTransitionning = false;

        const triggerUpdate = () => {
            this.updateSizes();
            requestAnimationFrame(triggerUpdate);
        }

        triggerUpdate();
    }

    /**
     * Updates the pages sizes
     */
    updateSizes() {
        this.pageWidth = document.body.clientWidth;
        this.slider.style.width = `${this.pageWidth}px`;

        let totalWidth = this.pageWidth * this.$pages.length;

        for (let $page of this.$pages) {
            $page.style.width = `${this.pageWidth}px`;
        }

        this.$content.style.width     = `${totalWidth}px`;

        // let saveTransition = this.$content.style.transition;
        // console.log(saveTransition);
        // this.$content.style.transition = 'none';
        this.$content.style.transform  = 'translate3d(' + (-1 * (this.pageWidth * this.currentIndex)) + 'px, 0, 0)';

        // clearTimeout(this.timeoutTransitionRestore);
        // this.timeoutTransitionRestore = setTimeout(() => {
        //     this.$content.style.transition = saveTransition;
        // }, 10);
    }

    /**
     * Swithes slider page
     * @param {Number} index The new page index
     */
    goToIndex(index) {
        if (this.isTransitionning) {
            this.isTransitionning = false;

            return;
        }

        this.isTransitionning           = true;
        this.$pages[index].style.height = '100%';
        this.$content.style.transform   = 'translate3d(' + (-1 * (this.pageWidth * index)) + 'px, 0, 0)';

        let indexToHide = this.currentIndex;

        const eventListener = () => {
            this.isTransitionning = false;
            console.log('TRANSITIONEND');

            this.$pages[indexToHide].style.height = '1px';
            this.$content.removeEventListener(transitionEvent, eventListener);
        };

        console.log('ADDING ', transitionEvent, 'on ', this.$content);
        this.$content.addEventListener(transitionEvent, eventListener);

        this.currentIndex = index;
        vm.actualTab      = index;
    }
}
