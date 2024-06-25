import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './components/component.module';
import { FinancialComponent } from './pages/financial/financial.component';
import { BoardComponent } from './pages/board/board.component';
import { IconsModule } from './icons/icons.module';
import { NewsComponent } from './pages/news/news.component';
import { CongregationService } from './pages/congregation/congregation.service';
import { CongregationComponent } from './pages/congregation/congregation.component';
import { BoardService } from './pages/board/board.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FinancialComponent,
    BoardComponent,
    NewsComponent,
    CongregationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    IconsModule,
    ReactiveFormsModule,
  ],
  exports: [IconsModule, ReactiveFormsModule],
  providers: [CongregationService, BoardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
