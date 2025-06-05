import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL : string = "https://localhost:7196/api/User"
  loginURL : string = "https://localhost:7196/api/Login"

  private currentUser: User | null;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private isUserAdminSubject = new BehaviorSubject<boolean>(false);
  isUserAdmin$ = this.isUserAdminSubject.asObservable();

  constructor(private http : HttpClient) {
    this.loadUserFromStorage();
  }

  login( name: string, email: string): Observable<{ token: string; role: string }>{
    const body = { UserName: name, Email: email };
    return this.http.post<{ token: string; role: string }>(
      this.loginURL,
      body
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.setCurrentUser(null);
    this.isUserAdminSubject.next(false);
  }

  setCurrentUser(user: User | null): void {
    if(localStorage.getItem('token')){
      const role = localStorage.getItem('role');
        if (user && role === 'manager') 
          this.isUserAdminSubject.next(true);
    }
     else {
      this.isUserAdminSubject.next(false);
    }
    
    this.currentUser = user;
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser$(): Observable<User | null>{ 
    return this.currentUser$;
  }

  getCurrentUser(): User | null{ 
    return this.currentUser;
  }

  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Array<User>>(this.URL, { headers });
    }

    return new Observable<User[]>(observer => {
      observer.error('Unauthorized');
    });
  }

  getUserById(id:number):Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  getUserByUsernameEmail(username: string, email: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/${encodeURIComponent(username)}/${encodeURIComponent(email)}`);
  }

  addUser(newUser:User):Observable<void> {
    return this.http.post<void>(this.URL, newUser);
  }

  updateUser(id:number, newUser:User):Observable<void> {
    return this.http.put<void>(`${this.URL}/${id}`, newUser);
  }

  deleteUser(id:number):Observable<void> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'manager') {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.delete<void>(`${this.URL}/${id}`, { headers });
    }
    return new Observable<void>(observer => {
      observer.error('Unauthorized');
    });
  }
  
  loadUserFromStorage(): void {
    const userStr = localStorage.getItem('currentUser');
    const role = localStorage.getItem('role');
    
    if (userStr) {
      const user: User = JSON.parse(userStr);
      this.currentUser = user;
      this.currentUserSubject.next(user);

      if (role === 'manager') {
        this.isUserAdminSubject.next(true);
      } else {
        this.isUserAdminSubject.next(false);
      }
    }
  }

  isAdmin(): boolean {
    return this.isUserAdminSubject.getValue();
  }

}
