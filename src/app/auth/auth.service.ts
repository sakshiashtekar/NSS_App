import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost/PracticeProjects/auth-app/api';
  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post(`${this.url}/register.php`, user);
  }

  login(credentials: User): Observable<String>{
    return this.http.post<{token: string}>(`${this.url}/login.php`, credentials).pipe(
      map(response => response.token)
    );
  }
}