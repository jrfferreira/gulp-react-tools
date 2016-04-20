# Gulp react tools

Some basic commands for creating react components from the command line.

## Installation

Run `npm install gulp-react-tools`. You will need gulp [installed globally][gulp] and locally in your project.

To configure the gulp task you will need to create a `gulpfile.js` (if you don't already have one in your project), and add the following:

```javascript
var gulp = require('gulp');
require('gulp-react-tools')(gulp[, config]);
```

`config` is an optional object which can contain any of the following keys:

* `commandPrefix` - the prefix for the gulp command. The command is in the following format `gulp {PREFIX}generate --component {COMPONENT_NAME_IN_CAMEL_CASE}`
* `componentDir` - the directory to save new components to
* `componentStylesDir` - the directory to save new component css to
* `componentTemplate` - the path to the template component file, relative to `gulpfile.js`. This file can include tokens - see below.
* `componentStyleTemplate`- the path to the template component style file, relative to `gulpfile.js`. This file can include tokens - see below.
* `componentName` - the filename for the output component, must contain a token for the filename.
* `componentStylesName` - the filename for the output component style file, must contain a token for the filename.
* `generateComponentStyles` - whether to create style files for each component.
* `appendStyleImportTo` - a filepath to append a style import to. False to disable.
* `appendStyleImportTemplate` - the import string to append, should contain a token for the filename. 

## Tokens

Tokens can be used in filenames and template files. The following tokens are available:

* `{{COMPONENT}}` - the upper-camel case component name. eg. "MyComponent"
* `{{COMPONENT_DASHED}}` - the dashed component name. eg. "my-component"
* `{{CSS_FILE_COMMENT}}` - the comment generated from `appendStyleImportTemplate`

[gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
