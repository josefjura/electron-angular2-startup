# electron-angular2-startup
Basic project structure with build tasks for angular2 and electron projects.

This startup is using Angular2 BETA version, which should now be stable to develop with. Note that some tutorials on the internet will not work, as they might be written for the alfa version.
I decided to do the structure as src/dist with gulp build scripts, as a stylesheet preprocessor I chose LESS because it seems to be a bit of a biolerplate code standard.

Any help or advice will be highly appreciated

Installation (I will streamline the proces as I clean the project structure) :

* Clone repo: *git clone https://github.com/josefjura/electron-angular2-startup.git*
* Install dev dependencies: *cd electron-angular2-startup && npm install*
* Install dependencies: *cd src && npm install*
* *cd ..*
* Install gulp and tsd: *npm install gulp tsd -g*
* Install typings: *tsd install*
* Run in debug mode: *npm run start*


## Source code structure

### src

All source code should be stored inside src folder

#### package.json
Package config where the name, version and dependencies for the application are defined.

#### main.html
Entry point of electron app, loads System.js and starts application boot. Vendor bundles and stylesheets are also injected here.

#### background.ts
Electron app bootstrap, modified version of the standard loader from https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md

### src/app

This folder contains all the scripting. All the scripting is meant to be written in Typescript.

#### app.boot.ts
Angular2 booting logic

#### app.component.ts
Application component definition, also contains the routing initialization. As this is a fairly specific component I decided to move it out of the components folder.

#### app.component.ts
Application layout. As this is a fairly specific component I decided to move it here from the templates folder.

### src/app/common

Directory containing all common scripts

### src/app/components

Directory containing all Angular2 components.

### src/app/services

Directory containing all Angular2 services.

### src/assets

Directory containing all the assets used by the application (images, etc.)

### src/stylesheets

Directory containing application stylesheets written in LESS

### src/templates

Directory containing the application`s HTML templates

