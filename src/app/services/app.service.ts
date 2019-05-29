import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  postRestWithoutEnv(url: string, body: any, token?: string): Observable<any> {
   return this.http.post(url, JSON.stringify(body), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
         // Authorization: token,
        }),
      });
  }

  getRestWithoutEnv(url: string, token?: string): Observable<any> {
  return this.http.get(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // 'Authorization': token
        }),
      });
  }
}
