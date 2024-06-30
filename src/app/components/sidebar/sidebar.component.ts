import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarMenu } from './sidebar.interface';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject, map, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menu: SidebarMenu[];
  activeMenu: string = '';
  unsubscribe$: Subject<void> = new Subject();

  constructor(private router: Router) {
    this.menu = [
      { path: 'dashboard', icon: 'clipboard', name: 'Dashboard' },
      { path: 'financial', icon: 'dollar-sign', name: 'Keuangan' },
      {
        path: 'board',
        icon: 'user-check',
        name: 'Anggota Majelis',
        // JIKA MENU PUNYA ANAK
        // childrenComponents: [
        //   { path: 'board/anak1', icon: 'layout', name: 'anak1' },
        //   { path: 'board/anak2', icon: 'layout', name: 'anak2' },
        // ],
      },
      { path: 'congregation', icon: 'users', name: 'Anggota Jemaat' },
      { path: 'news', icon: 'globe', name: 'Berita' },
      { path: 'home', icon: 'activity', name: 'Jadwal Kegiatan' },
    ];
  }

  ngOnInit(): void {
    // // IF MENU HAS CHILD AND BROWSER REFRESHED THE CHILD WILL BE SHOWN.
    // this.router.events
    // .pipe(map( (e:any) => {
    //   if(e.routerEvent?.url.substring(0,6) === "/board"){
    //     this.activeMenu = 'Anggota Majelis'
    //     this.unSubs();
    //   }
    // }))
    // .pipe(takeUntil(this.unsubscribe$))
    // .subscribe();
  }

  navMenuClicked(str: string) {
    this.activeMenu = str;
  }

  unSubs() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
