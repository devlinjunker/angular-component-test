const path = require('path');
const { default: merge } = require('webpack-merge');
const commonPromise = require('./webpack/webpack.dev.config');

// Make Headless Chrome available.
process.env.CHROME_BIN = require('puppeteer').executablePath();

const basePath = __dirname;

const paths = {};
paths.appDir = path.join(basePath, 'app');
paths.testDir = path.join(basePath, 'test');
paths.imagesSubDir = 'images';
paths.imagesDir = path.join(basePath, paths.imagesSubDir);
paths.targetDir = path.join(basePath, 'target');
paths.targetCoverageDir = path.join(paths.targetDir, 'coverage');
paths.junitCoverageFilename = 'junit.xml';

let timeoutLength = 6000;
let coverageOption = {};

module.exports = async (config) => {
  const common = await commonPromise;

  console.log(common.module.rules)
  console.log(JSON.stringify(common.module.rules))

  config.set({
    basePath,

    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browsers: ['Chrome'], // ['ChromeHeadless'] if debugging

    plugins: [
      require('karma-mocha'),
      require('karma-sinon'),
      require('karma-chai'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-source-map-support'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
    ],

    client: {
      args: [],
      mocha: {
        timeout: timeoutLength,
      },
    },

    colors: true,

    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      dir: paths.targetCoverageDir,
      reports: ['text-summary', 'html', 'cobertura'],
    },

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu'],
      },
      ChromeDebug: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333'],
      },
    },

    files: ['./app/test-bootstrap.ts'],

    frameworks: ['mocha', 'sinon', 'chai', 'source-map-support'],

    junitReporter: {
      useBrowserName: false,
      outputFile: paths.junitCoverageFilename,
      outputDir: '/' + paths.targetDir,
      suite: 'test',
    },

    logLevel: 'DEBUG',

    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },

    port: 9876,
    preprocessors: {
      ['**/*.ts']: ['webpack', 'sourcemap'],
    },

    proxies: {
      '/images/': paths.imagesDir + '/',
    },

    reporters: ['progress', 'coverage-istanbul', 'junit'],
    singleRun: true, // config.debug

    webpack: merge(common, {
      devtool: false,
      resolve: {
        modules: [path.resolve('./test')],
      },
      module: {
        rules: [coverageOption],
      },
    }),
  });
};
