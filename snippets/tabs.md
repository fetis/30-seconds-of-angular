---
title: Tabs component
tags:
  - component
---
# Content

Tabs component: 
`tab.component.ts`
```typescript
@Component({
  selector: 'app-tab',
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input() title: string;
  @Input() active = false;
}
```

`tabs.component.ts`
```typescript
import { TabComponent } from './tab.component';

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
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab){
    this.tabs.toArray().forEach(tab => tab.active = false);
    tab.active = true;
  }
}
```

Use:

```
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
```

# Bonus


# Links
