import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../classes/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { }

  URL : string = "https://localhost:7196/api/Company"

  getAllCompanies():Observable<Company[]> {
    return this.http.get<Array<Company>>(this.URL);
  }

  getCompanyById(id:number):Observable<Company> {
    return this.http.get<Company>(`${this.URL}/${id}`);
  }

  getCompanyByName(name:string):Observable<Company> {
    return this.http.get<Company>(`${this.URL}/${name}`);
  }

  addCompany(newCompanyName:string):Observable<void> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }); 
      return this.http.post<void>(this.URL, JSON.stringify(newCompanyName), { headers });
    }
    return new Observable<void>(observer => {
      observer.error('Unauthorized');
    });
  }

  updateCompany(id:number, newCompanyName:string):Observable<any> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }); 
      return this.http.put<void>(`${this.URL}/${id}`, JSON.stringify(newCompanyName), { headers });
    }
    return new Observable<void>(observer => {
      observer.error('Unauthorized');
    });
  }
}
