import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  URL : string = "https://localhost:7196/api/Category"

  getAllCategories():Observable<Category[]> {
    return this.http.get<Array<Category>>(this.URL);
  }

  getCategoryById(id:number):Observable<Category> {
    return this.http.get<Category>(`${this.URL}/${id}`);
  }

  getCategoryByName(name:string):Observable<Category> {
    return this.http.get<Category>(`${this.URL}/${name}`);
  }

  addCategory(newCategoryName: string): Observable<void> {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }); 
      return this.http.post<void>(this.URL, JSON.stringify(newCategoryName), { headers });
      }
      return new Observable<void>(observer => {
        observer.error('Unauthorized');
      });
  }

  updateCategory(id: number, newCategoryName: string): Observable<void> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }); 
      return this.http.put<void>(`${this.URL}/${id}`, JSON.stringify(newCategoryName), { headers });
      }
    return new Observable<void>(observer => {
      observer.error('Unauthorized');
    });
  }

  deleteCategory(id:number):Observable<void> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }); 
      return this.http.delete<void>(`${this.URL}/${id}`, { headers });
      }
    return new Observable<void>(observer => {
      observer.error('Unauthorized');
    });
  }

}
