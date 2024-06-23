import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Home,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
  declarations: [],
})
export class IconsModule {}
