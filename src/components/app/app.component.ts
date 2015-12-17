/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Index} from '../index/index';
import {Page} from '../page/page';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'components/app/app.layout.html'
})

@RouteConfig([
    { path: '/', name: 'Index', component: Index, useAsDefault: true },
    { path: '/page', name: 'Page', component: Page }
])

export class App {
    title: string;
    constructor() {
        this.title = 'Angular 2 Startup';
    }
}