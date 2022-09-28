import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from 'routes/layout/layout.controller';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  declarations: [LayoutComponent],
  entryComponents: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
