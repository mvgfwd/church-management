import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './components/component.module';
import { FinancialComponent } from './pages/financial/financial.component';
import { BoardComponent } from './pages/board/board.component';
import { IconsModule } from './icons/icons.module';

@NgModule({
  declarations: [AppComponent, FinancialComponent, BoardComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentModule, IconsModule],
  exports: [IconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
