import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CompanyService } from '../../services/company.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { NgFor, NgIf } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


interface EntityItem { id: number; name: string; }

@Component({
  selector: 'app-login',
  imports: [NgIf, NgFor, RadioButtonModule, ButtonModule, FormsModule, ToastModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})

export class EditComponent implements OnInit {
  entity: 'category' | 'subcategory' | 'company';
  action: 'add' | 'edit' | 'delete';
  items: EntityItem[] = [];
  selectedId: number | null = null;
  name: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private companyService: CompanyService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // וודאו שהפרמטרים הם בדיוק 'category' / 'subcategory' / 'company'
      this.entity = params['entity'];
      this.action = params['action'];
      this.selectedId = params['id'] ? +params['id'] : null;
      if (this.action === 'edit' || this.action === 'delete') {
        this.loadItems();
      }
    });
  }

  private loadItems() {
    let obs;
    if (this.entity === 'category') {
      obs = this.categoryService.getAllCategories();
    } else if (this.entity === 'subcategory') {
      obs = this.subCategoryService.getAllSubCategories();
    } else {
      obs = this.companyService.getAllCompanies();
    }

    obs.subscribe((data: any[]) => {
      this.items = data.map(item => ({ id: item.id, name: item.name }));
      // אם הגיעה id כפרמטר, נסמן אותה כברירת מחדל
      if (this.selectedId) {
        this.selectedId = this.selectedId;
      }
    });
  }

  onSubmit(): void {
    // אם add – אין צורך ב־selectedId
    if (this.action === 'add') {
      this.perform(this.selectedId);
    } else {
      if (!this.selectedId) {
        return;
      }
      this.perform(this.selectedId);
    }
  }

  private perform(id: number | null) {
    switch (this.entity) {
      case 'category':   this.callCategory(id);    break;
      case 'subcategory':this.callSubCategory(id); break;
      case 'company':    this.callCompany(id);     break;
    }
  }

  private callCategory(id: number|null) {
    if (this.action === 'add') {
      this.categoryService.addCategory(this.name).subscribe(() => this.finish());
    } else if (this.action === 'edit') {
      this.categoryService.updateCategory(id!, this.name).subscribe(() => this.finish());
    } else {
      this.categoryService.deleteCategory(id!).subscribe(() => this.finish());
    }
  }

  private callSubCategory(id: number|null) {
    if (this.action === 'add') {
      this.subCategoryService.addSubCategory(this.name).subscribe(() => this.finish());
    } else if (this.action === 'edit') {
      this.subCategoryService.updateSubCategory(id!, this.name).subscribe(() => this.finish());
    } else {
      this.subCategoryService.deleteSubCategory(id!).subscribe(() => this.finish());
    }
  }

  private callCompany(id: number|null) {
    if (this.action === 'add') {
      this.companyService.addCompany(this.name).subscribe(() => this.finish());
    } else if (this.action === 'edit') {
      this.companyService.updateCompany(id!, this.name).subscribe((data) => {
        console.log(data);
        
        this.finish()});
    }
    //  else {
    //   this.companyService.deleteCompany(id!).subscribe(() => this.finish());
    // }
  }

  private finish() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.action === 'add'   ? 'נוסף בהצלחה' :
              this.action === 'edit'  ? 'עודכן בהצלחה' :
                                        'נמחק בהצלחה',
      life: 2000
    });

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
