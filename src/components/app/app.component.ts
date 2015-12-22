/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Main} from '../main/main';
import {Other} from '../other/other';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'components/app/app.layout.html'
})

@RouteConfig([
    { path: '/main', name: 'Main', component: Main, useAsDefault: true },
    { path: '/other', name: 'Other', component: Other }
])

export class App {
    title: string;
    constructor() {
        this.title = 'Angular 2 Startup';
    }
}