import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         this.currentUserSubject.next(user);
        //         return user;
        //     }));
        let model = "username=" + username + "&password=" + password + "&grant_type=" + "password";
            return this.http.post<any>(`https://t1809ecoinmarket20200608234615.azurewebsites.net/token`,  model, {
                // headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // }
              })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null); 
    }
    register(Email: string, Password: string, ConfirmPassword: string, FirstName: string, LastName:string) {
        return this.http.post<any>(`https://t1809ecoinmarket20200608234615.azurewebsites.net/api/account/registerV1`, { Email, Password, ConfirmPassword, FirstName, LastName })
        .pipe(map(user => {
            console.log('register', user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user));
            // this.currentUserSubject.next(user);
            return user;
        }));
    }
    getArticle(): Observable<any> {
        // return this.http.get<any>(`https://t1809ecoinmarket20200608234615.azurewebsites.net/api/posts`);
        return this.http.get<any>(`https://t1809ecoinmarket20200608234615.azurewebsites.net/api/posts`, {
            // headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            // 'Access-Control-Allow-Origin': 'http://localhost:8888/'
            // }
          });
      }
      upgradeAccount(token: any): Observable<any> {
        return this.http.put<any>(`https://t1809ecoinmarket20200608234615.azurewebsites.net/api/rank`, { token });
      }
      verifyAccount(Email: any, Code: any) {
        return this.http.post<any>(`https://t1809ecoinmarket20200608234615.azurewebsites.net/api/account/ConfirmRegister`, { Email, Code }, {
            withCredentials: true
          });
    }
}