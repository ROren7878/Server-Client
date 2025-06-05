import { Component, OnInit } from '@angular/core';
import { Order } from '../../classes/order';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe, NgFor, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{

  orders: Order[];
  currentUser: User | null;
  private destroy$ = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(
        filter((user): user is User => !!user),
        switchMap(user => {
          this.currentUser = user;
          return this.orderService.getOrderByUserId(user.id);
        }),
        takeUntil(this.destroy$)
      )
    .subscribe({
      next: orders => {
        this.orders = orders;
        this.orders = this.orders.sort((a,b)=>a.orderDate.getDate() - b.orderDate.getDate());    
      },
      error: err => {
        console.error('Error loading orders', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
