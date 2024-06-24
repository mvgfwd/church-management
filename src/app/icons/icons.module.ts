import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home, DollarSign, Users, UserCheck, Globe } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Home,
  DollarSign,
  Users,
  UserCheck,
  Globe
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
  declarations: [],
})
export class IconsModule {}
