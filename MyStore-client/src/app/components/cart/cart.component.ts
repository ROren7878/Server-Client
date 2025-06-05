import { Component, Input, input, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../classes/cart-item';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OrdersComponent } from "../orders/orders.component";
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { Order } from '../../classes/order';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  imports: [RouterOutlet, CurrencyPipe, OrdersComponent, RouterLink, NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cart : CartItem[];
  totalSum : number;
  currentUser: User | null;
  order: Order;
  isUser: boolean;

  constructor( 
    private cartService : CartService,
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totalSum = this.cartService.getTotal(); // או לחשב ישירות כאן
    });
    this.userService.currentUser$.subscribe( user => {
      this.currentUser = user;
      if(user)
        this.isUser = true;
    });
  }

  plus(item: CartItem): void {
    this.cartService.increaseQuantity(item.product.id)
  }

  minus(item: CartItem): void {
    this.cartService.decreaseQuantity(item.product.id)
  }

  checkout(): void {
    if(this.currentUser){
      this.order = new Order(0, new Date(), this.totalSum, this.currentUser.id);
      this.orderService.addOrder(this.order).subscribe({});
      for (let i = 0; i < this.cart.length; i++) {
        const product = this.cart[i].product;
        product.quantity = this.cart[i].quantity;
        this.cartService.clearCart();
        this.productService.updateProduct(product.id, product).subscribe({
          next:()=>console.log(),
          error: err => console.error(err)
        })
      }
    }
    else
     this.isUser = false; 
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id)
  }

}
