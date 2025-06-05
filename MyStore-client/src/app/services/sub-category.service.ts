import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from '../classes/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

    constructor(private http : HttpClient) { }

  URL : string = "https://localhost:7196/api/SubCategory"

  getAllSubCategories():Observable<SubCategory[]> {
    return this.http.get<Array<SubCategory>>(this.URL);
  }

  getSubCategoryById(id:number):Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.URL}/${id}`);
  }

  getSubCategoryByName(name:string):Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.URL}/${name}`);
  }

  addSubCategory(newSubCategoryName:string):Observable<void> {
    const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }); 
      return this.http.post<void>(this.URL, JSON.stringify(newSubCategoryName), { headers });
      }
      return new Observable<void>(observer => {
        observer.error('Unauthorized');
    });
  }

  updateSubCategory(id:number, newSubCategoryName:string):Observable<void> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }); 
      return this.http.put<void>(`${this.URL}/${id}`, JSON.stringify(newSubCategoryName), { headers });
    }
    return new Observable<void>(observer => {
      observer.error('Unauthorized');
    });
  }

  deleteSubCategory(id:number):Observable<void> {
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
