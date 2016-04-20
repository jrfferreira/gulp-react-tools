var assign = require('object-assign')
var fs = require('fs')
var camelCase = require('camelcase')
var upperCamelCase = require('uppercamelcase')
var decamelize = require('decamelize')

module.exports = function(gulp, userConfig) {

  var config = assign({
    commandPrefix:              'grt-',
    componentDir:               './src/js/components/',
    componentStylesDir:         './src/scss/',
    // storeDir:                   './src/js/stores/',
    // actionsDir:                 './src/js/actions/',
  
    componentTemplate:          __dirname + '/templates/Component.react.js',
    componentStyleTemplate:     __dirname + '/templates/component.css',
  
    componentName:              '{{COMPONENT}}.react.js',
    componentStylesName:        '_components.{{COMPONENT_DASHED}}.scss',
  
    generateComponentStyles:    true,
  
    // appendStyleImportTo:        false,
    appendStyleImportTemplate:  "// @import 'components.{{COMPONENT_DASHED}}\n",
    appendStyleImportTo:        './src/scss/main.scss'
  }, userConfig)

  gulp.task(config.commandPrefix + 'generate', function() {
    var argv = require('yargs').argv

    if (argv.c || argv.component) {
      return generateComponent(argv)
    }
  })

  function generateComponentStyle(dashedComponentName, replaceTokens) {
    var templateFile = fs.readFileSync(config.componentStyleTemplate, "utf8")
    var newComponent = replaceTokens(templateFile)

    var componentFileName = config.componentStylesDir + replaceTokens(config.componentStylesName)

    if (fs.existsSync(componentFileName)) {
      console.log('Component style "' + componentFileName + '" already exists');
    }
    else {
      fs.writeFileSync(componentFileName, newComponent, 'utf8')
      console.log('Generated component style: ' + componentFileName)

      if (config.appendStyleImportTemplate && config.appendStyleImportTo) {
        var newImport = replaceTokens(config.appendStyleImportTemplate)
        var appendStyleImportToFile = fs.readFileSync(config.appendStyleImportTo)
        var updatedStyleImportFile = appendStyleImportToFile + "\n" + newImport
        fs.writeFileSync(config.appendStyleImportTo, updatedStyleImportFile)

        console.log('Appended "' + newImport + '" to "' + config.appendStyleImportTo + '"')
      }
    }

    return componentFileName
  }

  function generateComponent(argv) {

    function replaceTokens(input) {
      var output = input
                    .replace(new RegExp('{{COMPONENT}}', 'g'), camelComponentName)
                    .replace(new RegExp('{{COMPONENT_DASHED}}', 'g'), dashedComponentName)
                    .replace(new RegExp('{{CSS_FILE_COMMENT}}', 'g'), cssFileComment)
      return output
    }

    var componentName = argv.c || argv.component || null
    if (!componentName) return

    var dashedComponentName = decamelize(componentName, '-')
    var camelComponentName = upperCamelCase(dashedComponentName)
    var cssFileComment = ''
    var cssFileName = ''

    if (config.generateComponentStyles) {
      cssFileName = generateComponentStyle(dashedComponentName, replaceTokens)
      cssFileComment = '// css: ' + cssFileName
    }

    var templateFile = fs.readFileSync(config.componentTemplate, "utf8")
    var newComponent = replaceTokens(templateFile)

    var componentFileName = config.componentDir + replaceTokens(config.componentName)

    if (fs.existsSync(componentFileName)) {
      console.log('Component "' + componentFileName + '" already exists');
    }
    else {
      fs.writeFileSync(componentFileName, newComponent, 'utf8')
      console.log('Generated component: ' + componentFileName)
    }
  }
}
