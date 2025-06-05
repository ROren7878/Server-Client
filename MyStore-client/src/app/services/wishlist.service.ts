import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistItems: Product[];// = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  private wishlistSubject = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();
  
  private storageKey: string;

  constructor(private userService: UserService) {
    const user = this.userService.getCurrentUser(); // סינכרוני
    const userId = user?.id;

    this.storageKey = userId ? `wish_${userId}` : 'wish_guest';
    this.loadWishlistFromStorage();

    userService.getCurrentUser$().subscribe(user => {
      const userId = user?.id;
      this.storageKey = userId ? `wish_${userId}` : 'wish_guest';
      this.loadWishlistFromStorage();
    });
  }

  loadWishlistFromStorage(): void {
    try {
      this.wishlistItems = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (error) {
      console.error('שגיאה בקריאת wishlist:', error);
      this.wishlistItems = [];
    }
    this.wishlistSubject.next(this.wishlistItems);
  }

  private updateWishlist(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.wishlistItems));
    this.wishlistSubject.next(this.wishlistItems);
  }

  addToWishlist(product: Product): void {
    if(!this.isInWishlist(product)){
      this.wishlistItems.push(product);
      this.updateWishlist();
    }
  }

  isInWishlist(product: Product): boolean {
    return this.wishlistItems.some(p => p.id == product.id);
  }

  removeFromWishlist(product: Product): void {
    this.wishlistItems = this.wishlistItems.filter(p => p.id !== product.id);
    this.updateWishlist();
  }

  getWishlist(): Product[] {
    return [...this.wishlistItems];
  }

    clearWishlist(): void {
    this.wishlistItems = [];
    this.updateWishlist();
  }


}
