/// <reference path="../typings/tsd.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/platform/browser';

// Angular 2
import {bind} from 'angular2/core';

// Angular's router injectables services/bindings
import {ROUTER_PROVIDERS} from 'angular2/router';

import {SERVICES_BINDINGS} from './services/services';

import {App} from './pages/base/layout';

bootstrap(
    App,
    [
        SERVICES_BINDINGS,
        ROUTER_PROVIDERS
    ]
);