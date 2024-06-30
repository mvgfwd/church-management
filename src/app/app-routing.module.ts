import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialComponent } from './pages/financial/financial.component';
import { BoardComponent } from './pages/board/board.component';
import { NewsComponent } from './pages/news/news.component';
import { CongregationComponent } from './pages/congregation/congregation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewsDetailComponent } from './pages/news/news-detail/news-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    data: { title: 'Dashboard' },
    component: DashboardComponent,
  },
  {
    path: 'financial',
    title: 'Keuangan',
    data: { title: 'Keuangan' },
    component: FinancialComponent,
  },
  {
    path: 'congregation',
    title: 'Anggota Jemaat',
    data: { title: 'Anggota Jemaat' },
    component: CongregationComponent,
  },
  {
    path: 'board',
    title: 'Anggota Majelis',
    data: { title: 'Anggota Majelis' },
    // CONTOH JIKA MENU PUNYA ANAK
    // children: [
    //   {
    //     path: 'anak1',
    //     title: 'anak1',
    //     data: { title: 'anak1' },
    //     component: NewsComponent,
    //   },
    // ],
    component: BoardComponent,
  },
  {
    path: 'news',
    title: 'Berita',
    data: { title: 'Berita' },
    component: NewsComponent,
    children: [
      {
        path: ':id',
        title: 'Detail Berita',
        data: {
          title: 'Detail Berita',
        },
        component: NewsDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
