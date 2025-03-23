import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './component/shop/shop.component';
import { ProductsComponent } from './component/shop/products/products.component';
import { CartComponent } from './component/shop/cart/cart.component';
import { ProductsPageComponent } from './component/shop/products-page/products-page.component';
import { ProductDetailsComponent } from './component/shop/product-details/product-details.component';
import { LoginComponent } from './component/login/login.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './component/shop/about/about.component';
import { ContactUsComponent } from './component/shop/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ProductsComponent,
    CartComponent,
    ProductsPageComponent,
    ProductDetailsComponent,
    LoginComponent,
    NavBarComponent,
    SideBarComponent,
    AboutComponent,
    ContactUsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
