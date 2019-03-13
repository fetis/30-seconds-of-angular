---
title: Tabs component
author: Jamaks
level: beginner
tags:
  - component
---
# Content
 <app-tabs>
    <app-tab title="First tab">
        First tab body
    </app-tab>
    <app-tab title="Second tab">
        Second tab body
    </app-tab>
    <app-tab title="Third tab">
        Third tab body
    </app-tab>
 </app-tabs>


# Links
https://stackblitz.com/edit/angular-mm5gwg



# ComponentCode
  import { Component, Input, AfterContentInit, ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <app-tabs>
    <app-tab title="First tab">
        First tab body
    </app-tab>
    <app-tab title="Second tab">
        Second tab body
    </app-tab>
    <app-tab title="Third tab">
        Third tab body
    </app-tab>
  </app-tabs>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
}

@Component({
  selector: 'app-tab',
  template: `
    <div *ngIf="active">
     <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input() title: string;
  @Input() active = false;
}
@Component({
  selector: 'app-tabs',
  template: `
    <ul class="tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <div>{{tab.title}}</div>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [
    `
    .tabs {
      display: flex;
      justify-content: space-around;
      list-style-type: none;
      margin: 0px;
    }
    .tabs li{
      cursor: pointer;
    }
    .active {
      color: red;
    }
    `
  ]
})
export class TabsComponent implements AfterContentInit {
  
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
  ngAfterContentInit() {
    const activeTab = this.tabs.find(tab => tab.active);
    if(activeTab) {
      this.selectTab(activeTab);
    } else {
       this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab){
    this.tabs.forEach(tab => tab.active = false);
     tab.active = true;
  }
}


# ModuleCode
  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent, TabComponent, TabsComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, TabComponent, TabsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}