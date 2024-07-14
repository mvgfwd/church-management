import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarMenu } from './sidebar.interface';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subject, map, take, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/core/services/shared-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menu: SidebarMenu[];
  activeMenu: string = '';
  unsubscribe$: Subject<void> = new Subject();

  constructor(private router: Router, private sharedSvc: SharedService) {
    this.menu = [
      { path: 'dashboard', icon: 'clipboard', name: 'Dashboard' },
      {
        path: 'financial',
        icon: 'dollar-sign',
        name: 'Keuangan',
        // childrenComponents: [
        //     { path: 'financial/income', icon: 'layout', name: 'Pemasukan' },
        //     { path: 'board/outcome', icon: 'layout', name: 'Pengeluaran' },
        //   ],
      },
      {
        path: 'board',
        icon: 'user-check',
        name: 'Anggota Majelis',
      },
      { path: 'congregation', icon: 'users', name: 'Anggota Jemaat' },
      { path: 'news', icon: 'globe', name: 'Berita' },
      { path: 'activity', icon: 'activity', name: 'Jadwal Kegiatan' },
      { path: 'asset', icon: 'package', name: 'Aset' },
    ];
  }

  ngOnInit(): void {
    this.sharedSvc.currentNavMenuValue.subscribe(
      (val) => (this.activeMenu = val)
    );
    this.activeMenu = this.parseUrlToMenuName(this.extractUrlAfterBase());
  }

  parseUrlToMenuName(str: string): string {
    let res = '';
    switch (str) {
      case 'dashboard':
        res = 'Dashboard';
        break;
      case 'financial':
        res = 'Keuangan';
        break;
      case 'board':
        res = 'Anggota Majelis';
        break;
      case 'congregation':
        res = 'Anggota Jemaat';
        break;
      case 'news':
        res = 'Berita';
        break;
      case 'activity':
        res = 'Jadwal Kegiatan';
        break;
    }
    return res;
  }

  extractUrlAfterBase(): string {
    const fullUrl = window.location.href;
    const protocol = window.location.protocol;
    const host = window.location.host;
    const baseUrl = `${protocol}//${host}/`;
    const index = fullUrl.indexOf(baseUrl);

    if (index !== -1) {
      return fullUrl.substring(index + baseUrl.length);
    }
    return '';
  }

  navMenuClicked(str: string) {
    this.activeMenu = str;
  }

  unSubs() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
