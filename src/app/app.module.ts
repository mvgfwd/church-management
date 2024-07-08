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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewsService } from './pages/news/news.service';
import { NewsDetailComponent } from './pages/news/news-detail/news-detail.component';
import { IncomeService } from './pages/financial/income.service';
import { OutcomeService } from './pages/financial/outcome.service';
import { ToastService } from './services/toast.service';
import { CurrencyFormatPipe } from './core/pipe/currency-format.pipe';
import { NumberFormatPipe } from './core/pipe/number-no-rp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FinancialComponent,
    BoardComponent,
    NewsComponent,
    CongregationComponent,
    DashboardComponent,
    NewsDetailComponent,
    CurrencyFormatPipe,
    NumberFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    IconsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports: [IconsModule],
  providers: [
    ToastService,
    CongregationService,
    BoardService,
    NewsService,
    IncomeService,
    OutcomeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
