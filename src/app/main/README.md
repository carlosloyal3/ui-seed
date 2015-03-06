##Directory Structure

Files are grouped by functionality instead by meaning or type. Readability is improved as they are consistent with the architectural design of the app.

##Fractal hierarchy

Each folder represents a logic unit/module and all of them shares a common set of rules.

A unit/module contains: 

- **Controllers** and **Modules** definitions (*.js)
- **SASS** style surcefile (*.scss)
- **Unit** test file (*.test.js)
- **E2E** test file (*.e2e.js)
- **HTML** module template (*.html)


All of them represents and are only used by the current module. (tests, styles and behaviors).

##NOTES

* Each module will generate a css file for testing propouse, but it will be ignored by git.

* This app supports three levels of hierarchy (to get more, update gulpfiles.js)
