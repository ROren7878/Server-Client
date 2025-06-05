import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { ReactiveFormsModule ,FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';
import { SubCategoryService } from '../../services/sub-category.service';
import { SubCategory } from '../../classes/subcategory';
import { Company } from '../../classes/company';
import { CompanyService } from '../../services/company.service';
import { NgFor } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update-product',
  imports: [NgFor, ReactiveFormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './save-product.component.html',
  styleUrl: './save-product.component.scss'
})
export class UpdateProductComponent implements OnInit{
  
  productId: number;
  product: Product;
  categories: Category[];
  subcategories: SubCategory[]; 
  companies: Company[];

  constructor( 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private companyService: CompanyService,
    private messageService: MessageService
  ){};


  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    desc: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl(''),
    companyId: new FormControl(''),
    src: new FormControl('')
  });

  ngOnInit(): void {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product updates successfully', life: 3000 });

    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
    this.subCategoryService.getAllSubCategories().subscribe(data => {
      this.subcategories = data;
    });
    this.companyService.getAllCompanies().subscribe(data => {
      this.companies = data;
    });

    this.activatedRoute.params.subscribe(params => {
      if (params['productId']) {
        this.productId = +params['productId'];
        this.productService.getProductById(this.productId).subscribe(product => {
          if (product) {
            this.product = product;
            this.productForm.patchValue({
              productName: product.productName,
              desc: product.desc,
              price: product.price,
              quantity: product.quantity,
              categoryId: product.categoryId !== undefined ? String(product.categoryId) : '',
              subCategoryId: product.subCategoryId !== undefined ? String(product.subCategoryId) : '',
              companyId: product.companyId !== undefined ? String(product.companyId) : '',
              src: product.src ?? ''
            });
          } else {
            this.router.navigate(['/products']);
          }
        });
      }
    });
  }

  get isEditMode(): boolean {
    return this.productId !== undefined;
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productToSave: Product = {
        id: this.productId ?? 0, // חובה כי השרת דורש
        productName: formValue.productName!,
        desc: formValue.desc!,
        price: formValue.price!,
        quantity: formValue.quantity!,
        src: formValue.src || '',
        categoryId: formValue.categoryId ? Number(formValue.categoryId) : undefined,
        subCategoryId: formValue.subCategoryId ? Number(formValue.subCategoryId) : undefined,
        companyId: formValue.companyId ? Number(formValue.companyId) : undefined
      };
      if (this.productId !== undefined) {
        // עדכון
        this.productService.updateProduct(this.productId, productToSave).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'המוצר עודכן בהצלחה',
            life: 2000
          });

          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        });
      } else {
    // יצירה
        this.productService.addProduct(productToSave).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'המוצר נוסף בהצלחה',
            life: 2000
          });

          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        });
      }
    }
  }

}
