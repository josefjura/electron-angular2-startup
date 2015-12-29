# Startup project for Electron and Angular2
Basic project structure with build tasks for angular2 and electron projects. I am trying to create a project guidelines a will use in the future.

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

## Project.json

To keep clean node_modules directory and simplify package.json content, the file is split in two: one in project root and one in src directory.
This approach is inspired by [electron-boilerplate](https://github.com/szwacz/electron-boilerplate).

Because of this, there are three scenarios of installing dependencies:

### Direct dependencies
Node modules directly used by application. Saved in src/package.json.

Should be installed by *npm i module_name --save* from the src directory. The whole module is then packaged with build and release.

### Bundled dependencies
Node modules containing bundled versions. Saved in package.json.

Should be installed by *npm i module_name --save* from the root project directory and adding the bundle file name to *vendor_bundles_dev* array in tasks/build.js.
The bundle file is then copied to vendor directory and injected to main.html.

This saves time, as the whole content of the node module is not copied with src directory during build and is not packaged during release.

### Development dependencies
Node modules used only during development. Saved in package.json.

Should be installed by *npm i module_name --save-dev* from the root project directory

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

