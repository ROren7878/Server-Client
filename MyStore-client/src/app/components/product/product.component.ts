import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Product } from '../../classes/product';
import {  Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../services/product.service';
import { NgStyle } from '@angular/common';
import { CurrencyPipe } from "@angular/common";


@Component({
  selector: 'app-product',
  imports: [NgStyle, ConfirmPopupModule, ToastModule, ButtonModule, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  @Input() currentProduct: Product;
  @Output() productDeleted = new EventEmitter<number>();

  isInWishlist: boolean;
  currentUser: User | null;
  userIsAdmin: boolean;

  constructor( 
    private router: Router,
    private wishlistService: WishlistService,
    private userService: UserService,
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){};

  ngOnInit(): void {
    
    this.isInWishlist = this.wishlistService.isInWishlist(this.currentProduct);
    this.userService.getCurrentUser$().subscribe(user => {
      this.currentUser = user;
    });
    this.userService.isUserAdmin$.subscribe(isAdmin => {
      this.userIsAdmin = isAdmin;
    });
  }

  productDetails = (): void => {
    this.router.navigate([`product-details/${this.currentProduct.id}`])
  };

  getByCompany = (company : any):void => {
    this.router.navigate(['products'], { queryParams: { company } })
  }

  toggleWishlist(): void {
    this.isInWishlist = this.wishlistService.isInWishlist(this.currentProduct);
    if(this.isInWishlist)
      this.wishlistService.removeFromWishlist(this.currentProduct);
    else
      this.wishlistService.addToWishlist(this.currentProduct);    
    this.isInWishlist = !this.isInWishlist;
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.currentProduct.id).subscribe({
      next: ()=>{
       this.productDeleted.emit(this.currentProduct.id);
       this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'המוצר נמחק', life: 3000 }); 
      },
      error:err=>{
        console.log("error", err); 
      }
    }); 
  }

  updateProduct(): void {
    this.router.navigate(['save-product', this.currentProduct.id]);
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this product?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.deleteProduct();
               
      }
    });
  }

}
