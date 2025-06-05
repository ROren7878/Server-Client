import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }
  
  URL : string = "https://localhost:7196/api/Order"

  getAllOrders():Observable<Order[]> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Array<Order>>(this.URL, { headers });
    }

    return new Observable<Order[]>(observer => {
      observer.error('Unauthorized');
    });
  }

  getOrderById(id:number):Observable<Order> {
    return this.http.get<Order>(`${this.URL}/${id}`);
  }

  getOrderByUserId(userId:number):Observable<Order[]> {
    return this.http.get<Array<Order>>(`${this.URL}/user/${userId}`);
  }

  getOrderByDate(date:Date):Observable<Order[]> {
    const formattedDate = date.toISOString().split('T')[0];
    return this.http.get<Array<Order>>(`${this.URL}/date/${formattedDate}`);
  }

  addOrder(newOrder:Order):Observable<void> {
    return this.http.post<void>(this.URL, newOrder);
  }
}
