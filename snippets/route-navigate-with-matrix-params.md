---
title: Route navigate with matrix params
author: Jamaks
level: beginner
tags:
  - routing
---
# Content
Navigate with matrix params:

the router will navigate to `/first;name=foo/details`
```html
<a [routerLink]="['/', 'first', {name: 'foo'}, 'details']">
  link with params
</a>
```


# Links
https://stackblitz.com/edit/angular-xvy5pd



# ComponentCode
  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
    <a routerLink="/">home</a> <br/>
    <a [routerLink]="['/', 'first', 'details']"> link without params </a> <br/>
    <a [routerLink]="['/', 'first', {name: 'foo'}, 'details']"> link with params </a> <br/>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
}

@Component({
  selector: 'first',
  template: `
    first component
    <router-outlet></router-outlet>
  `,
})
export class FirstComponent implements OnInit {
  params: any;
  constructor(private activatedRoute: ActivatedRoute){}
  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      console.log(`FirstComponent:`, params);
    });
  }
}
@Component({
  selector: 'details',
  template: `
    Details
  `,
})
export class DetailComponent  {
  constructor(private activatedRoute: ActivatedRoute){}
  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      console.log(`DetailComponent:`, params);
    });
  }
}



# ModuleCode
  import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { AppComponent, DetailComponent, FirstComponent } from './app.component';

const ROUTES:  Route[] = [
  {
    path: 'first',
    component: FirstComponent,
    children: [{
      path: 'details',
      component: DetailComponent
    }
    ]
  },
];
@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(ROUTES) ],
  declarations: [ AppComponent, DetailComponent, FirstComponent  ],
  bootstrap:    [ AppComponent ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/angular/30-seconds' }]
})
export class AppModule { }
