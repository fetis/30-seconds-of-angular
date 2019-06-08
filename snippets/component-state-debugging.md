---
title: component-state-debugging
author: lironHazan
twitter: lironn_h
level: beginner

tags:
- good-to-know
  - tips 
links:
  - https://blog.angularindepth.com/everything-you-need-to-know-about-debugging-angular-applications-d308ed8a51b4
---
# Content

Debug the component state in the browser console by printing 
```
ng.probe($0).componentInstance
```

`$0` - stands for the last selected DOM node index


# Bonus

With Ivy renderer engine 
```
ng.getComponent($0)
```
  
