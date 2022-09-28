import { Component, OnInit } from '@angular/core';
/**
 * This controller is responsible for displaying components
 * common to all pages in the app (such as header).
 */
@Component({
  selector: 'layout',
  templateUrl: './layout.html',
})
export class LayoutComponent implements OnInit {
  public test: string = 'test';

  constructor() {
  }

  public ngOnInit(): void {
   
  }
}
