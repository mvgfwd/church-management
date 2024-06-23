import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarMenu } from './sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  menu: SidebarMenu[];

  constructor() {
    this.menu = [
      { path: 'home', icon: 'layout', name: 'Dashboard' },
      { path: 'financial', icon: 'home', name: 'Keuangan' },
      {
        path: 'board',
        icon: 'layout',
        name: 'Anggota Majelis',
        childrenComponents: [
          { path: 'anak1', icon: 'layout', name: 'anak1' },
          { path: 'anak2', icon: 'layout', name: 'anak2' },
        ],
      },
      { path: 'home', icon: 'layout', name: 'Anggota Jemaat' },
      { path: 'home', icon: 'layout', name: 'Berita' },
      { path: 'home', icon: 'layout', name: 'Jadwal Kegiatan' },
    ];
  }
}
