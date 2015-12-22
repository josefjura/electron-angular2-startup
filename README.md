# electron-angular2-startup
Basic project structure with build tasks for angular2 and electron projects. This module is currently under heavy development. If you include it in your project, lock down the version number until things settle down, as it can be changed dramatically while I remove unnecessary things and problems. Also the documentation will be done after this first wild stage.

This startup is using Angular2 BETA version, which should now be stable to develop with. Note that some tutorials on the internet will not work, as they might be written for the alfa version.

I decided to do the structure as src/dist with gulp build and watch scripts, as a stylesheet preprocessor I chose LESS because it seems to be a bit of a biolerplate code standard.

Any help or advice will be highly appreciated

Installation (I will streamline the proces as I clean the project structure) :

* Clone repo: *git clone https://github.com/josefjura/electron-angular2-startup.git*
* Install dev dependencies: *cd electron-angular2-startup && npm install*
* Install dependencies: *cd src && npm install*
* *cd ..*
* Install gulp and tsd: *npm install gulp tsd -g*
* Install typings: *tsd install*
* Build the source: *gulp build*
* Run in debug mode: *npm run debug*


