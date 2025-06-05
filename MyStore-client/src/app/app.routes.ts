import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UpdateProductComponent } from './components/update-product/save-product.component';
import { EditComponent } from './components/edit/edit.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UsersComponent } from './components/users/users.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PayComponent } from './components/pay/pay.component';
import { adminGuard } from './guard/admin.guard';

export const routes: Routes = [

    { path : '', component : HomePageComponent },
    { path : 'products', component : ProductsComponent },
    { path: 'save-product', component: UpdateProductComponent, canActivate: [adminGuard] },
    { path: 'save-product/:productId', component: UpdateProductComponent, canActivate: [adminGuard] },
    { path : 'product-details/:id', component : ProductDetailsComponent },
    { path : 'cart', component : CartComponent},
    { path : 'wishlist', component : WishlistComponent},
    { path : 'login', component : LoginComponent },
    { path : 'register', component : RegisterComponent },
    { path : 'profile', component : RegisterComponent },
    { path : 'edit', component : EditComponent, canActivate: [adminGuard] },
    { path : 'users', component : UsersComponent, canActivate: [adminGuard] },
    { path : 'orders', component : OrdersComponent },
    { path : 'pay', component : PayComponent }
    

];
