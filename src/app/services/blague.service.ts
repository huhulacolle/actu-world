import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlagueService {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjI0MTQ4MzIxODY0OTA4ODAyIiwibGltaXQiOjEwMCwia2V5IjoiYTl5cWpBdm9tZGZkRVh6OFhOS20zSDZIU1cxd3dUSmlkRXdiZVQyNE9SbFRJek50dW8iLCJjcmVhdGVkX2F0IjoiMjAyMi0wMy0xNVQxMzo0ODo0MyswMDowMCIsImlhdCI6MTY0NzM1MjEyM30.d27HbmnnUmlYLO8ZT07Y1SwdIdwbQC8TeeRio5Z8Yh8';
  url: string[];

  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenReq = req.clone({
      setHeaders: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: 'Bearer ' + this.token
      }
    });
    return next.handle(tokenReq);
  }

  getBlagueLimite(): Observable<any> {
    return this.http.get('https://www.blagues-api.fr/api/type/dev/random');
  }
}
