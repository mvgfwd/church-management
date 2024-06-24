import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: { label: string; url: string }[] = [];
  breadcrumbsLength:number=0;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   // this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    //   console.log('event',event)
    // });
    console.log(this.activatedRoute)
  }

  // buildBreadcrumbs(
  //   route: ActivatedRoute,
  //   url: string = '',
  //   breadcrumbs: { label: string; url: string }[] = []
  // ): { label: string; url: string }[] {
  //   const children = route.children;
  //   if (children.length === 0) {
  //     return breadcrumbs;
  //   }
  //   for (const child of children) {
  //     if (child.outlet === 'primary') {
  //       const routeUrl = `${url}/${child.snapshot.url
  //         .map((segment) => segment.path)
  //         .join('/')}`;
  //       const urlLength = routeUrl.split('/');
  //       this.breadcrumbsLength = urlLength.length;
  //       const label = child.snapshot.data['title'];
  //       breadcrumbs.push({ label, url: routeUrl });
  //       return this.buildBreadcrumbs(child, routeUrl, breadcrumbs);
  //     }
  //   }
  //   return breadcrumbs;
  // }
}
