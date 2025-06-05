import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, ToastModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  productId : number;
  product : Product;
  isInWishlist: boolean;
  currentUser: User | null;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService, 
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private userService: UserService,
    private messageService: MessageService
  ){};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
      this.productService.getProductById(this.productId).subscribe(data => {
        if (data) {
          this.product = data;
          this.isInWishlist = this.wishlistService.isInWishlist(this.product);
        } else {
          // נניח נווט חזרה במקרה של מוצר לא קיים
          this.router.navigate(['products']);
        }
      });
    });
    // קבלת המשתמש הנוכחי מה־Observable
    this.userService.getCurrentUser$().subscribe(user => {
      this.currentUser = user;
    });
  }

  getByCompany = (company : any):void => {
    this.router.navigate(['products'], { queryParams: { company } })
  }

  addToCart = () :void =>{    
    this.cartService.addToCart({ ...this.product}); 
    this.messageService.add({
      severity: 'contrast',
      // summary: '',
      detail: '\nנוסף לסל בהצלחה',
      life: 3000
    });  
  }

  toggleWishlist(product: Product): void {
    this.isInWishlist = this.wishlistService.isInWishlist(product);
    if(this.isInWishlist){
      this.wishlistService.removeFromWishlist(product);
    }
    else{
      this.wishlistService.addToWishlist(product);  
    }   
    this.isInWishlist = !this.isInWishlist;
  }

}
