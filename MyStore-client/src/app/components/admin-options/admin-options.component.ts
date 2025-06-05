import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-options',
  imports: [TieredMenuModule, ButtonModule],
  templateUrl: './admin-options.component.html',
  styleUrl: './admin-options.component.scss'
})
export class AdminOptionsComponent implements OnInit{

  visible: boolean;
  menuItems: MenuItem[];
  constructor( 
    private router: Router
  ){};

  ngOnInit(): void {
    this.menuItems = [
      this.buildMenuGroup('קטגוריה', 'category'),
      this.buildMenuGroup('תת קטגוריה', 'subcategory'),
      this.buildMenuGroup('חברה', 'company'),
      {
        label: 'מוצר',
        icon: 'pi pi-box',
        items: [
          {
            label: 'הוסף',
            icon: 'pi pi-plus',
            command: () => this.addProduct()
          },
          {
            label: 'צפיה בכל המוצרים',
            icon: 'pi pi-eye',
            command: () => this.router.navigate(['products'])
          },
          {
            label: 'אזל מהמלאי',
            icon: 'pi pi-times-circle',
            command: () => this.router.navigate(['products'], {queryParams: {quantity: 0}})
          }
        ]
      },
      {
        label: 'משתמשים',
        icon: 'pi pi-users',
        items: [
          {
            label: 'הצג',
            icon: 'pi pi-eye',
            command: () => this.router.navigate(['/users'], { queryParams: { action: 'view' } })
          },
          {
            label: 'מחק',
            icon: 'pi pi-trash',
            command: () => this.router.navigate(['/users'], { queryParams: { action: 'delete' } })
          }
        ]
      }
    ];
  }

  buildMenuGroup(label: string, entityType: string): MenuItem {
    return {
      label,
      icon: 'pi pi-folder',
      items: [
        {
          label: 'הוסף',
          icon: 'pi pi-plus',
          command: () => this.go(entityType, null, 'add')
        },
        {
          label: 'ערוך',
          icon: 'pi pi-pencil',
          command: () => this.go(entityType, 'some-id', 'edit')
        },
        {
          label: 'מחק',
          icon: 'pi pi-trash',
          command: () => this.go(entityType, 'some-id', 'delete')
        }
      ]
    };
  }

  go(entityType: string, id: string | null, action: 'add' | 'edit' | 'delete') {
    this.router.navigate(['/edit'], {
      queryParams: { entity: entityType, id, action }
    });
  }

  addProduct():void {
    this.router.navigate(['save-product']);
  }

}
