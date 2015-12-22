/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/platform/browser';

// Angular's router injectables services/bindings
import {ROUTER_PROVIDERS} from 'angular2/router';

import {SERVICES_PROVIDERS} from '../../services/services';

import {App} from './app.component';

bootstrap(
    App,
    [
        SERVICES_PROVIDERS,
        ROUTER_PROVIDERS
    ]
);