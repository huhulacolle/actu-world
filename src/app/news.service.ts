import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<Data> {
    return this.http.get(`${API_URL}/top-headlines?country=fr&language=fr&apiKey=${API_KEY}`);
  }

  getSearch(q: string): Observable<Data> {
    return this.http.get(`${API_URL}/everything?q=${q}&language=fr&apiKey=${API_KEY}`);
  }
}
