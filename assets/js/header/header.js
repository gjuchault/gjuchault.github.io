import Slider from './slider.js';

let slider;

export default {
    data: {
        actualTab        : -1,
        onlyHeader       : false,
        draggingMenu     : false,
        initialMousePosX : 0,
        intiialScrollLeft: 0,
        showIconRight    : true,
        showIconLeft     : false
    },
    methods: {
        /**
         * Changes from one tab to another
         * @param {MouseEvent} e Mouse click event
         */
        changeTab(e) {
            this.actualTab = parseInt(e.currentTarget.getAttribute('data-index'), 10);

            const slug    = e.currentTarget.getAttribute('data-slug');
            location.hash = slug;
        },

        /**
         * Changes from one tab to another, but only the green indicator
         * @param {Number} tab The new index
         */
        changeTabWithoutMovingPage(tab) {
            this.onlyHeader = true;
            this.actualTab       = tab;
        },

        /**
         * Triggered when the user starts dragging the header
         * @param {MouseEvent} e The mousedown event
         */
        startDragMenu(e) {
            e.preventDefault();
            this.draggingMenu      = true;
            this.initialMousePosX  = e.x;
            this.intiialScrollLeft = e.currentTarget.scrollLeft;
            console.log('[Drag start]');
        },

        /**
         * Triggered when the user is dragging the header
         * @param {MouseEvent} e The mousemove event
         */
        moveMenu(e) {
            if (!this.draggingMenu) {
                return;
            }

            console.log('[Drag]');
            e.currentTarget.scrollLeft = this.intiialScrollLeft + this.initialMousePosX - e.x;

            this.showIconRight = e.currentTarget.scrollWidth - e.currentTarget.offsetWidth -
                                 e.currentTarget.scrollLeft > 2;
            this.showIconLeft  = e.currentTarget.scrollLeft > 2;
        },

        /**
         * Triggered when the user stops dragging the header
         * @param {MouseEvent} e The mouseup event
         */
        stopDragMenu(e) {
            e.preventDefault();

            console.log('[Drag Stop]');
            this.draggingMenu = false;
        }
    },
    watch: {
        /**
         * Watches for tab change
         * @param {Number} tab The new tab index
         * @param {Number} previousTab Previous tab index
         */
        actualTab(tab, previousTab) {
            let $tab = this.$els[`tab${tab}`];

            let box       = $tab.getBoundingClientRect();
            let firstLeft = this.$els.tab0.getBoundingClientRect().left;

            this.$els.underline.style.width = `${box.width}px`;
            this.$els.underline.style.left  = `${box.left - firstLeft}px`;

            if (previousTab !== -1 && !this.onlyHeader) {
                slider.goToIndex(tab, $tab.firstChild.nodeValue.trim());
            }

            this.onlyHeader = false;
        }
    },

    /**
     * Sets the initial tab
     */
    init() {
        this.actualTab = 0;

        slider = new Slider(this.$els.slider);

        const bindHashChange = () => {
            window.addEventListener('hashchange', () => {
                let loadedIndex;

                if (location.hash.slice(1).length === 0) {
                    loadedIndex = document.querySelector('[data-slug=projects]');
                } else {
                    loadedIndex = document.querySelector(`[data-slug=${location.hash.slice(1)}]`);
                }

                this.changeTab({ currentTarget: loadedIndex });
            });
        };

        if (location.hash.slice(1).length !== 0) {
            const loadedIndex = document.querySelector(`[data-slug=${location.hash.slice(1)}]`);
            setTimeout(() => {
                this.changeTab({ currentTarget: loadedIndex });
                bindHashChange();
            });
        } else {
            bindHashChange();
        }

    }
};
