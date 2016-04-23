/* global location */

export default {
    /**
     * Switches the header indicator if this is an article displaying
     */
    init() {
        let url = location.href;

        if (url.endsWith('/')) {
            url = url.slice(0, -1 * '/'.length);
        }

        if (url.endsWith('/index.html')) {
            url = url.slice(0, -1 * '/index.html'.length);
        }
    }
};
