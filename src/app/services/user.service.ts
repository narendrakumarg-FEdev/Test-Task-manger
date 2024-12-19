import { Injectable } from '@angular/core';
import { User } from '../models/User';

import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'users';
  private loggedInUserKey = 'loggedInUser';
  private loggedInUser: User | null = null;

  constructor() {
    this.loadLoggedInUser();
  }

  addUser (user: User): Observable<void> {
    return new Observable<void>(observer => {
      const users = this.getUsers();
      user.id = this.generateUniqueId(users);
      users.push(user);
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));      
      observer.next(); 
      observer.complete(); 
    }).pipe(
      delay(1000) 
    );
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private generateUniqueId(users: User[]): number {
    return users.length ? Math.max(...users.map(user =>
      user.id
    )) + 1 : 1;
  } 

  authenticateUser (email: string, password: string): Observable<User | undefined> {
    return new Observable<User | undefined>(observer => {
      const users = this.getUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        this.loggedInUser  = user;
        localStorage.setItem(this.loggedInUserKey, JSON.stringify(user)); 
        observer.next(user); 
      } else {
        observer.next(undefined); 
      }

      observer.complete(); 
    }).pipe(
      delay(1000) 
    );
  }

  isAuthenticated(): boolean {
    return this.loggedInUser !== null;
  }

  private loadLoggedInUser(): void {
    const storedUser = localStorage.getItem(this.loggedInUserKey);
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser) as User;
    }
  }

  logout(): void {
    this.loggedInUser = null;
    localStorage.removeItem(this.loggedInUserKey);
  }


  getLoggedInUserId(): number | null {
    return this.loggedInUser ? this.loggedInUser.id : null;
  }
}