import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../classes/product';
import { CartItem } from '../classes/cart-item';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private storageKey: string


  constructor(private userService: UserService) {
    const user = this.userService.getCurrentUser(); // סינכרוני
    const userId = user?.id;
    this.storageKey = userId ? `cart_${userId}` : 'cart_guest';
    this.loadCartFromStorage();
    // האזנה לשינויים (בהמשך)
    userService.getCurrentUser$().subscribe(user => {
      const userId = user?.id;
      this.storageKey = userId ? `cart_${userId}` : 'cart_guest';
      this.loadCartFromStorage();
    });
  }

  /**
   * טוען נתונים מה־localStorage, ומסנן מוצרים לא תקינים.
   */
  private loadCartFromStorage(): void {
    try {
      const stored = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      this.cartItems = (stored as CartItem[]).filter(item =>
        item?.product && typeof item.product.id === 'number'
      );
    } catch (error) {
      console.error('שגיאה בקריאת העגלה מה-localStorage:', error);
      this.cartItems = [];
    }
    this.cartSubject.next(this.cartItems);
  }

  /**
   * מעדכן את ה־localStorage ואת הסטרים
   */
  private updateCart(): void {
    const cleanedCart = this.cartItems.filter(item =>
      item?.product && typeof item.product.id === 'number'
    );
    localStorage.setItem(this.storageKey, JSON.stringify(cleanedCart));
    this.cartSubject.next(this.cartItems);
  }

  /**
   * הוספת מוצר לעגלה
   */
  addToCart(product: Product): void {
    if (!product || typeof product.id !== 'number') {
      console.warn('מוצר לא תקין לא נוסף לעגלה:', product);
      return;
    }

    const index = this.cartItems.findIndex(item => item.product.id === product.id);

    if (index > -1) {
      this.cartItems[index].quantity += 1;
    } else {
      this.cartItems.push({ index: this.cartItems.length, product, quantity: 1 });
    }

    this.updateCart();
  }

  /**
   * הסרת מוצר לפי אינדקס
   */
  removeFromCart(productId: number): void {
    const index = this.cartItems.findIndex(item => item.product.id == productId);
    if(index > -1)
      this.cartItems.splice(index, 1);
    this.updateCart();
  }

  /**
   * הגדלת כמות
   */
  increaseQuantity(productId: number): void {
    const index = this.cartItems.findIndex(item => item.product.id == productId);
    if (index > -1) {
      this.cartItems[index].quantity += 1;
      this.updateCart();
    }
  }

  /**
   * הקטנת כמות
   */
  decreaseQuantity(productId: number): void {
    const index = this.cartItems.findIndex(item => item.product.id == productId);
    if (index > -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
      this.updateCart();
    }
  }

  /**
   * ניקוי כל העגלה
   */
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  /**
   * החזרת העגלה עצמה
   */
  getCart(): CartItem[] {
    return this.cartItems;
  }

  /**
   * חישוב סך כולל
   */
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

}
