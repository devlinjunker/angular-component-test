// This file is required by karma.conf.js and loads recursively all the .spec and framework files
require('./polyfills');

/* tslint:disable */
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/mocha-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import $ = require('jquery');
window['$'] = window['jQuery'] = $;
import chai = require('chai');
import sinon = require('sinon');
import sinonChai = require('sinon-chai');
import chaiAsPromised = require('chai-as-promised');
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Setup chai
chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;
const root: any = window;
root.sinonSandbox = sinon.sandbox.create();
root.sinon = sinon;
root.expect = chai.expect;
root.AssertionError = chai.AssertionError;
root.assert = chai.assert;
root.sin = root.sinon;

// Mock Salesforce embedded service
root.embedded_svc = { settings: {}, init: () => {} };

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};
// platformBrowserDynamicTesting().bootstrapModule(AppModule);
beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

afterEach(() => {
  root.sinonSandbox.restore();
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  const styles: HTMLCollectionOf<HTMLStyleElement> | [] = head.getElementsByTagName('style');

  for (let i: number = 0; i < styles.length; i++) {
    head.removeChild(styles[i]);
  }
});

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
(window as any).__karma__.start();
