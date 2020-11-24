import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Riepilogo',  icon: 'view_compact' },
    { path: '/map',       title: 'Mappa',      icon: 'location_on'},
    { path: '/search',    title: 'Cerca',      icon: 'search'}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
