import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

    constructor(private http: HttpClient,private router: Router, private  storage:  Storage) {
      this.currentUserSubject = new BehaviorSubject<any>(
        JSON.parse(localStorage.getItem('currentUser'))
      );
      this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
      return this.currentUserSubject.value;
    }

    isAuthenticated() {
      return this.currentUserSubject.value;
    }

    ifLoggedIn() {
      this.storage.get('USER_DATA').then((response) => {
        if (response) {
          this.currentUserSubject.next(true);
        }
      });
    }

  login(body) {
       return this.http.post<any>(`http://nadi.softstreaktech.in/api/login`, body).pipe(
        tap(async (res:  any ) => {
          if (res.data) {
            console.log(res);
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            await this.storage.set('ACCESS_TOKEN', res.data.access_token);
            await this.storage.set('USER_DATA', res.data);
           // await this.storage.set("EXPIRES_IN", res.user.expires_in);
            this.currentUserSubject.next(true);
          }
        })

       );
  }
  async logout() {
    // remove user from local storage to log user out
    await this.storage.remove('USER_DATA');
    await this.storage.remove('ACCESS_TOKEN');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(false);
  }
}