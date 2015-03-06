module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'src/components/**/*.js',
      'src/app/**/*.js'
    ],

    exclude : [
      'src/app/**/*.e2e.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
