/* global document, window */

import Vue      from '../bower_components/vue/dist/vue.min.js';
import material from '../bower_components/material-design-lite/material.min.js';

import header     from 'header/header.js';
import articles   from 'articles/articles.js';
import pagination from 'articles/pagination.js';

Vue.config.delimiters = ['[[', ']]'];

const components = [header, articles, pagination];

let data     = {};
let methods  = {};
let computed = {};
let watch    = {};

for (let component of components) {
    if (component.data) {
        data = Object.assign(data, component.data);
    }

    if (component.methods) {
        methods = Object.assign(methods, component.methods);
    }

    if (component.computed) {
        computed = Object.assign(computed, component.computed);
    }

    if (component.watch) {
        watch = Object.assign(watch, component.watch);
    }
}

let vue = new Vue({
    el: document.body,
    data,
    methods,
    computed,
    watch
});

for (let component of components) {
    if (typeof component.init === 'function') {
        component.init.call(vue);
    }
}

window.vm = vue;

material.componentHandler.upgradeAllRegistered();

setTimeout(function () {
    document.documentElement.classList.remove('nojs');
});
