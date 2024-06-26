import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonComponent } from './button/button.component';
import { IconsModule } from '../icons/icons.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [SidebarComponent, ButtonComponent, BreadcrumbComponent, InputComponent],
  imports: [
    CommonModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],

  exports: [SidebarComponent, ButtonComponent, BreadcrumbComponent, InputComponent],
})
export class ComponentModule {}
