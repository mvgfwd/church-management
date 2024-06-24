import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialComponent } from './pages/financial/financial.component';
import { BoardComponent } from './pages/board/board.component';
import { NewsComponent } from './pages/news/news.component';
import { CongregationComponent } from './pages/congregation/congregation.component';

const routes: Routes = [
  {
    path: 'financial',
    title: 'Keuangan',
    component: FinancialComponent,
  },
  {
    path: 'congregation',
    title: 'Anggota Jemaat',
    component: CongregationComponent,
  },
  {
    path: 'board',
    title: 'Anggota Majelis',
    component: BoardComponent,
  },
  {
    path: 'news',
    title: 'Berita',
    component: NewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
