---
title: Creating a service to grab some data from a public api with Angular HttpClient
author: chrisksamueljr
level: intermediate
tags:
  - observables
  - http
  - HttpService
  - Date()
  - Github Api
---
# Content

 The Angular HttpClient Module

```TypeScript
// api.service.ts

import { Injectable } from '@angular/core';

import *  as moment from 'moment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RepoResponse {}

interface Repo {}

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {


  private configurationURL = 'https://api.github.com/';
  private popularRepoUrl = `search/repositories?q=created:`;


  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }
   // You should handle your errors somehow 
  private handleError(error: any): Promise<any> {
    console.log('An Error occured', error);
    return Promise.reject(error.message || error);
  }

getPopularRepos(from: Date): Observable<RepoResponse> {
    let formattedDate = moment(from).utc().format('YYYY-MM-DD');
    // let params = new HttpParams();
    // params = params.set('HttpParams', formattedDate);

    // You can check your Url logging here to make sure it is valid
    console.log(` ServiceUrl built below:
    ${this.configurationURL}${this.popularRepoUrl}${formattedDate}&sort=stars
    `);


    return this.http.get<RepoResponse>(`${this.configurationURL}${this.popularRepoUrl}${formattedDate}&sort=stars`);
  
}

```
