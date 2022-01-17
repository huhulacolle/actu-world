import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

const API_KEY = '73ce7275f8134bee9e9d0399d2ae3314';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<Data> {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=fr&language=fr&apiKey=${API_KEY}`);
  }

  getSearch(q: string): Observable<Data> {
    return this.http.get(`https://newsapi.org/v2/everything?q=${q}&language=fr&apiKey=${API_KEY}`);
  }
}
