import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  
  public logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }
}
