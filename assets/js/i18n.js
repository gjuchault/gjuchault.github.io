/* global localStorage, navigator */

export default Vue => {
    const SUPPORTED_LANGUAGES = ['en', 'fr'];
    const DEFAULT_LANGUAGE    = 'en';

    let i18n = {
        /**
         * Sets the language
         * @param  {String} lng Locale
         */
        set lng(lng) {
            localStorage.setItem('lng', lng);
        },

        /**
         * Gets the locale or the default locale
         * @return {string} The locale
         */
        get lng() {
            if (localStorage.hasOwnProperty('lng')) {
                let lng = localStorage.getItem('lng');
                return SUPPORTED_LANGUAGES.indexOf(lng) > -1 ? lng : DEFAULT_LANGUAGE;
            }

            for (let lng of navigator.languages) {
                if (SUPPORTED_LANGUAGES.indexOf(lng) > -1) {
                    return lng;
                }
            }

            return DEFAULT_LANGUAGE;
        },

        /**
         * Translates an item given its different representations
         * @param  {Object} obj  The object to translate
         * @param  {String} elem The key of the object's value to translate
         * @param  {String} lng  The locale to use
         * @return {String}      The translated object's value
         */
        _(obj, elem, lng = this.lng) {
            return obj[lng][elem];
        }
    };

    Vue.filter('i18n', (obj, elem) => i18n._(obj, elem));
};
