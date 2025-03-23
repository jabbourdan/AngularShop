import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './component/shop/products-page/products-page.component';
import { CartComponent } from './component/shop/cart/cart.component';
import { ProductDetailsComponent } from './component/shop/product-details/product-details.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './auth.guard';
import { ShopComponent } from './component/shop/shop.component';
import { AboutComponent } from './component/shop/about/about.component';
import { ContactUsComponent } from './component/shop/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsPageComponent },
      { path: 'cart', component: CartComponent },
      { path: 'product/details/:id', component: ProductDetailsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactUsComponent }
    ]
  },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
