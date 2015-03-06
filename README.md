# UI-SEED
This site provides a general ui-seed with main structure and sourcecode for every single App.
**It is open to be implemented with any JS Framework you can think of (AngularJS, ReactJS, RxJs).**

## Overview
This App is created mainly to support all the UI code trying to separate the backend and the ui layer. The way to connect both is via REST API services.

This App uses:
- **BowerJS**, Manage UI Dependencies.
- **GulpJS**, Automate tasks (Minify, concat, JSHint, generate, Sass, build).
- **Sass**, CSS pre-processor.
- **Bourbon** **Neat**, (styles framework).
- **JasmineJS**, Unit Test
- **Karma**, Automate, realtime and on real devices/browsers Tests.
- **Protractor**, (Selenium WebDriver) to run end-to-end Testing runing in real browsers.
- **NPM**, Package manager. Installs, publishes, etc.

## Table of Contents

  1. [Prerequisites](#prerequisites)
  1. [Directory Layout](#directory-layout)
  1. [Installation](#installation)
  1. [Start](#start)
  1. [Unit Tests](#unit-test)
  1. [End-to-End Tests](#end-to-end-tests)
  1. [Styles](#styles)
  1. [JS Guidelines](src/app)
  1. [Directory Structure](src/app/main)

###Prerequisites
**GIT**

**NODEJS**

##Directory Layout

Directory layout is based on [Google Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

```
src/
  - app/
    - main/
        main.html
        main.js
        main.test.js
        main.e2e.js
        main.sass
        - *sub-module/
            sub-module.html
            sub-module.js
            sub-module.test.js
            sub-module.e2e.js
            sub-module.sass
              - *sub-sub-module/
                  sub-sub-module.html
                  sub-sub-module.js
                  sub-sub-module.test.js
                  sub-sub-module.e2e.js
                  sub-sub-module.sass
              ...
        ...
    app.js
  - components/
    - styles/
        base-rules.scss
        layout-rules.scss
        state-rules.scss
        theme-rules.scss
    - images/
  index.html
karma.conf.js                                  //Karma Unit test config
.bowerrc                                       //Directory config
.gitignore                                     //Files and folders ignored by Git
bower.json                                     //UI Dependencies
package.json                                   //NPM Scripts and dependencies 
protractor-conf.js                             //End-to-End config
.jshintrc                                      //JS configuration linter rules 
```
**NOTES:**
Some folders and files are generated but ignored by git:
```
dist/  //Distribution folder
node_modules/  //Require modules to run this app (gulp, bower, sass, jasmine, karma, etc)
src/vendor/  //All the js/css UI libraries
```
**.css files will be ignored by git as well. (As SCSS are the main style sourcecode)**

**[⬆ back to top](#table-of-contents)**

##Installation

**Getting started**
```
git clone https://github.com/carlosvega20/ui-seed.git
cd ui-seed
```

If you just want to start a new project without the ui-seed commit history then you can do:
```
git clone --depth=1 https://github.com/angular/ui-seed.git <your-project-name>
```

**Install Dependencies**

```
npm install --save-dev
```

**[⬆ back to top](#table-of-contents)**

##Start

Process SCSS and JS files and build distribution folder and files 
```
gulp build
```

Watch SCSS/JS changes and open a realtime sync browser window.
```
gulp watch
```

**Distribution**
dist/ folder is generated with this structure and content:

```
- dist/
    index.html //Minify html version
    all.min.css  // Minify version of all internal css files.
    all.min.js // Minify version of all internal js files.
    externalLibs.js // Minify version of all external js files.
```

**[⬆ back to top](#table-of-contents)**

##Unit Tests
Each Unit Test is made with JasmineJS, and 'Karma' rul all automate unit tests. It will open a browser and test every *.test.js file.
```
npm test
```

**[⬆ back to top](#table-of-contents)**

##End-to-End Tests
End-to-End Tests are done by 'Protractor' that basically use WebdriverJS(Selenium) to runs tests against your application running in a real browser, interacting with it as a user would.

First time you will need to update webdriver
```
npm run update-webdriver
```

run End-to-End Tests:
```
npm run e2e
```

##Styles

**CSS Reset**
[Normalize.css](http://necolas.github.io/normalize.css/) makes browsers render all elements more consistently and in line with modern standards.

**Styles structure**
Based on [Smacss style guides]((https://smacss.com/book/)), There are five types of categories:

1. [**Base rules**](src/components/styles/base-rules.scss):
Base rules are the defaults. They are almost exclusively single element selectors but it could include attribute selectors, pseudo-class selectors, child selectors or sibling selectors. Essentially, a base style says that wherever this element is on the page, it should look like this.

1. [**Layout rules**](src/components/styles/layout-rules.scss):
Divide the page into sections. Layouts hold one or more modules together.

1. **Module** (they are in every hierarchy app folder. "Each folder is a module"):
Are the reusable, modular parts of our design. They are the callouts, the sidebar sections, the product lists and so on.

1. [**State**](components/styles/state-rules.scss):
Describes how our modules or layouts will look when in a particular state. Is it hidden or expanded? Is it active or inactive? They are about describing how a module or layout looks on screens that are smaller or bigger. They are also about describing how a module might look in different views like the home page or the inside page.

1. [**Theme**](components/styles/theme-rules.scss):
Are similar to state rules in that they describe how modules or layouts might look. 

**Sass framework**
[**Bourbone**](http://bourbon.io/): A simple and lightweight mixin library for Sass.

[**Neat**](http://neat.bourbon.io/): A lightweight semantic grid framework for Sass and Bourbon.

**[⬆ back to top](#table-of-contents)**
