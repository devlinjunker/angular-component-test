// Get the original functions before patched by Zone.
// See usage and comments in app.module.ts for more information.
// (window as any).originalSetTimeout = window.setTimeout;
// (window as any).originalSetInterval = window.setInterval;

// disable on properties
const targets = [window, Document, HTMLBodyElement, HTMLElement];
(window as any).__Zone_ignore_on_properties = [];
targets.forEach(function (target) {
  (window as any).__Zone_ignore_on_properties.push({
    target: target,
    ignoreProperties: ['scroll'],
  });
});

// disable addEventListener
window['__zone_symbol__BLACK_LISTED_EVENTS'] = ['scroll'];

require('./polyfills');

import _ = require('lodash');
import $ = require('jquery');
window['$'] = window['jQuery'] = $;


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .then((ref) => {
        // Ensure Angular destroys itself on hot reloads.
        if (window['ngRef']) {
          window['ngRef'].destroy();
        }
        window['ngRef'] = ref;

        // Otherise, log the boot error
      })
      .catch((err) => console.log(err));