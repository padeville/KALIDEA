import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, first, map, skip, tap } from 'rxjs/operators';
import { Credentials } from './models/credentials';
import { User } from './models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const URL_EMAIL = 'https://jsonplaceholder.typicode.com/users?email=';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly storageKey = 'user';
  private static readonly delay = 800;
  private userSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = JSON.parse(
      localStorage.getItem(UserService.storageKey) || 'null'
    );
    this.userSubject = new BehaviorSubject<User | null>(storedUser);
    this.userSubject
      .pipe(
        skip(1), 
        tap((user) =>
          localStorage.setItem(UserService.storageKey, JSON.stringify(user))
        )
      )
      .subscribe();
  }

  checkUser(user: string): Observable<Array<Credentials> | null> {
    return this.http.get<Array<Credentials>>(
      `${URL_EMAIL}${user}`,
      httpOptions
    );
  }

  get user(): User | null {
    return this.userSubject.value;
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  login({ email }: Credentials): Observable<User | null> {
    return this.checkUser(email).pipe(
      map((users) => users?.find((user) => user?.email === email)),
      map((user) => {
        if (user) {
          return {
            id: '5fc62fdb5eb04def08ac913a',
            username: 'JohnDoe',
          } as User;
        } else {
          throwError(new Error('invalid credential'))
          return null;
        }
      }),
      tap((user) => this.userSubject.next(user))
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(UserService.delay),
      tap(() => this.userSubject.next(null))
    );
  }
}
