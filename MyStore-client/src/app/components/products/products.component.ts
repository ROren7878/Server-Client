import { Component, OnInit } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { SearchService } from '../../services/search.service';

import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-products',
  imports: [ NgIf, NgFor, ProductComponent, MenuModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  
  products: Product[] = [];
  allProducts: Product[] = [];

  userIsAdmin: boolean;
  
  private searchSub!: Subscription;
  private paramsSub!: Subscription;

  isSearchMode: boolean = false;
  isCategoryMode: boolean = false;

  sortOptions: any = [];
  selectedSort: string;

  constructor( 
    private productService : ProductService,
    private searchService: SearchService, 
    private activatedRoute : ActivatedRoute,
    private userService: UserService
  ){};

  ngOnInit(): void {
    this.userService.isUserAdmin$.subscribe(isAdmin => {
      this.userIsAdmin = isAdmin;
      this.setupSortOptions(); // נבנה את האופציות רק אחרי שידוע אם הוא אדמין
    });

    this.paramsSub = this.activatedRoute.queryParams.subscribe(params => {
      const category = params['category'];
      const subcategory = params['subcategory'];
      const company = params['company'];
      const quantity = params['quantity'];
      // ננקה קודם
      this.isCategoryMode = false;

      if (quantity) {
        this.productService.getNoQuantityProducts().subscribe(data => {
          this.products = data;
        });
        return;
      }
      if (category) {
        if (category === 'getAll') {
          this.loadAllProducts();
        } else {
          this.productService.getProductByCategory(category).subscribe(data => {
            this.products = data;
            this.isCategoryMode = true;
          });
        }
        return;
      }
      if (company) {
        this.productService.getProductByCompany(company).subscribe(data => {
          this.products = data;
          this.isCategoryMode = true;
        });
        return;
      }
      if (subcategory) {
        this.productService.getProductBySubCategory(subcategory).subscribe(data => {
          this.products = data;
          this.isCategoryMode = true;
        });
        return;
      }
      // ברירת מחדל: טען הכל
      this.loadAllProducts();
    });
      // מנוי לחיפוש חופשי
    this.searchSub = this.searchService.searchTerm$.subscribe(term => {
        this.filterBySearchProducts(term);
    });
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.allProducts = data;
      this.products = data;
    });
  }

  filterBySearchProducts(term: string): void {
    if (!term || term.trim() === '') {
      // חזרה למצב של קטגוריה/חברה בלבד (או כלל המוצרים)
      this.products = this.allProducts;
      this.isSearchMode = false;
    } else {
    this.isSearchMode = true;
    // אם allProducts לא מלא, טען את כולם מהשרת ואז בצע סינון
      if (this.isCategoryMode) {
        this.productService.getAllProducts().subscribe(all => {
          this.allProducts = all;
          this.isCategoryMode = false;
          this.products = this.filterArray(all, term);
        });
      } else {
        this.products = this.filterArray(this.allProducts, term);
      }
    }
  }
  filterArray(arr: Product[], term: string): Product[] {
    const lowerTerm = term.trim().toLowerCase();
    return arr.filter(p =>
      p.productName?.toLowerCase().includes(lowerTerm) ||
      p.categoryName?.toLowerCase().includes(lowerTerm) ||
      p.subCategoryName?.toLowerCase().includes(lowerTerm) ||
      p.companyName?.toLowerCase().includes(lowerTerm) ||
      p.desc?.toLowerCase().includes(lowerTerm)
    );
  }

  setupSortOptions() {
  this.sortOptions = [
    { label: 'מחיר - מהנמוך לגבוה', value: 'cheap' },
    { label: 'מחיר - מהגבוה לנמוך', value: 'expensive' },
  ];

  if (this.userIsAdmin) {
    this.sortOptions.push({ label: 'כמות במלאי', value: 'quantity' });
  }
}

  onSortChange(value: string) {
    this.selectedSort = value;
    switch (value) {
      case 'cheap':
      case 'expensive':
        this.sortByPrice(value);
        break;
      case 'quantity':
        this.products = this.products.sort((a, b) => a.quantity - b.quantity); // לפי כמות מהמלאי הרבה לפחות
        break;
    }
  }

  sortByPrice(from: string){
    if(from === 'cheap')
      this.products = this.products.sort( (p1, p2) => p1.price - p2.price);
    else if(from === 'expensive')
      this.products = this.products.sort( (p1, p2) => p2.price - p1.price);
  }

  filterByOutOfStock(){
    // this.products = this.allProducts.filter(p => p.quantity == 0)
    // return this.products;
    this.productService.getNoQuantityProducts().subscribe(data => {
      this.products = data;
    })
  }

  sortByQuantity(): Product[]{
    this.products = this.allProducts.sort((p1, p2) => p2.quantity - p1.quantity )
    return this.products;
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
    this.paramsSub?.unsubscribe();
  }

  onProductDeleted(deletedId: number): void {
    this.loadAllProducts();
  }

}

 
