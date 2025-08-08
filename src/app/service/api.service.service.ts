import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedUser: string | null = null;

  constructor(private router: Router) {}

  login(user: string, password: string): boolean {
      console.log('AuthService recibe:', user, password);
    if (user === 'admin' && password === '123456') {
      this.loggedUser = user;
      return true;
    }
    return false;
  }

  getUser(): string | null {
    return this.loggedUser;
  }

  isLoggedIn(): boolean {
    return this.loggedUser !== null;
  }

  logout() {
    this.loggedUser = null;
    this.router.navigate(['/login']);
  }
}