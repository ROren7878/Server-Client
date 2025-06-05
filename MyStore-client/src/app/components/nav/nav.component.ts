import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartItem } from '../../classes/cart-item';
import { Product } from '../../classes/product';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { AdminOptionsComponent } from "../admin-options/admin-options.component";


@Component({
    selector: 'app-nav',
    imports: [RouterLinkActive, RouterOutlet, RouterLink, InputIconModule, IconFieldModule, FloatLabelModule, MenubarModule, ToastModule, ButtonModule, MenuModule, FormsModule, AdminOptionsComponent],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  currentUser: User | null;
  cart: CartItem[];
  wishlist: Product[];
  loginItems: MenuItem[];
  searchValue: string;
  userIsAdmin: boolean;
  
  constructor( 
    private router : Router, 
    private userService: UserService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private searchService: SearchService
  ){};
  
  ngOnInit(): void {
    this.userService.getCurrentUser$().subscribe(user => {
      this.currentUser = user;
      this.updateLoginItems();
    });

    this.userService.isUserAdmin$.subscribe(isAdmin => {
      this.userIsAdmin = isAdmin;
    });
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlist = wishlist;
    });
    // this.updateLoginItems();
  };

  updateLoginItems() {
    if (this.currentUser) {
      this.loginItems = [
        {
          label: 'עריכת פרופיל',
          icon: 'pi pi-user-edit',
          routerLink: '/profile'  // או מה שהנתיב שלך
        },
        {
          label: 'ההזמנות שלי',
          icon: 'pi pi-list-check',
          routerLink: '/orders'  // או מה שהנתיב שלך
        },
        {
          label: 'התנתק',
          icon: 'pi pi-sign-out',
          command: () => this.logout()
        }
      ];
    } else {
      this.loginItems = [
        {
          label: 'התחבר',
          icon: 'pi pi-sign-in',
          routerLink: '/login'
        },
        {
          label: 'הרשמה',
          icon: 'pi pi-user-plus',
          routerLink: '/register'
        }
      ];
    }
  }
  
  logout() {
    this.userService.logout();
    this.cartService.clearCart(); // אופציונלי
    this.wishlistService.clearWishlist();
    this.updateLoginItems();
  }

  goToProductPage = ( category : string) :void => {
    this.router.navigate(['products'], { queryParams: { category } });
  };

  onSearch(event: Event): void{
    const value = (event.target as HTMLInputElement).value;
    this.searchService.setSearchTerm(value)

    if (value && value.trim() !== '') {
      this.router.navigate(['/products']); // <-- בלי פרמטרים!
    }
  }
  
}
