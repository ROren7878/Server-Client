import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  
  // URL : string = "http://localhost:5026/api/Product"
  URL : string = "https://localhost:7196/api/Product"

  getAllProducts():Observable<Product[]> {
    return this.http.get<Array<Product>>(this.URL);
  }

  getProductById(id:number):Observable<Product> {
    return this.http.get<Product>(`${this.URL}/id/${id}`);
  }

  getProductByName(name:string):Observable<Product> {
    return this.http.get<Product>(`${this.URL}/name/${name}`);
  }

  getProductByCategory(categoryName:string):Observable<Product[]> {
    return this.http.get<Array<Product>>(`${this.URL}/category/${categoryName}`);
  }

  getProductBySubCategory(subcategoryName:string):Observable<Product[]> {
    return this.http.get<Array<Product>>(`${this.URL}/subCategory/${subcategoryName}`);
  }

  getProductByCompany(companyName:string):Observable<Product[]> {
    return this.http.get<Array<Product>>(`${this.URL}/company/${companyName}`);
  }

  getNoQuantityProducts():Observable<Product[]> {
    return this.http.get<Array<Product>>(`${this.URL}/noQuantity`);
  }

  addProduct(newProduct:Product):Observable<void> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'manager') {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.post<void>(this.URL, newProduct, { headers });
    }
    return new Observable<void>(observer => {
      observer.error('Unauthorized');
    });
  }

  updateProduct(id:number, newProduct:Product):Observable<void> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'manager') {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.put<void>(`${this.URL}/${id}`, newProduct, { headers });
    }
    return new Observable<void>(observer => {
      observer.error('Unauthorized');
    });
    
  }

  deleteProduct(id:number):Observable<void> {
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
}
