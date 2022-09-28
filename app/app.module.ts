import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgradeModule } from '@angular/upgrade/static';
import { UIRouter, UIRouterModule } from '@uirouter/angular';
import { LayoutComponent } from 'routes/layout/layout.controller';
import { LayoutModule } from 'routes/layout/layout.module';
import _ = require('lodash');
require('bootstrap'); // Load bootstrap globally.

/**
 * Function to visualize state transition uncomment this if need to debug with states
 */
export function routerConfigFn(router: UIRouter) {
  // const transitionService = router.transitionService;
  // router.trace.enable(Category.TRANSITION);
  // router.plugin(Visualizer);
}
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    UpgradeModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent],
})
export class AppModule {
  constructor() {}
}
