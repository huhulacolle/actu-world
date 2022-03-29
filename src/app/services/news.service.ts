import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AppPreferences } from '@awesome-cordova-plugins/app-preferences/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // Clé pour NewsAPI 
  API_KEY = '73ce7275f8134bee9e9d0399d2ae3314';

  lang: string;

  constructor(private http: HttpClient, private appPref: AppPreferences) { }

  getLangPreference(): void {
    this.appPref.fetch('lang').then(
      lang => {
        this.lang = lang;
      }
    )
  }

  getNews(): Observable<any> {
    return this.http.get('https://newsapi.org/v2/top-headlines?language='+ this.lang +'&apiKey=' + this.API_KEY);
  }

  getSearch(q: string, source: string): Observable<any> {
    if (source == null) {
      return this.http.get('https://newsapi.org/v2/everything?q=' + q + '&language='+ this.lang +'&apiKey=' +  this.API_KEY);
    }
    return this.http.get('https://newsapi.org/v2/everything?q=' + q + '&sources=' + source + '&language='+ this.lang +'&apiKey=' +  this.API_KEY);
  }

  getSources(): Promise<any> {
    return this.http.get('https://newsapi.org/v2/top-headlines/sources?language='+ this.lang +'&apiKey=' +  this.API_KEY).toPromise();
  }
}
