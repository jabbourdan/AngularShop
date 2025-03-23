import { Component } from '@angular/core';
import { ShopService } from '../../../services/shop.service';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  total;
  itemsList: Array<Product> = [];
  constructor(private shopService: ShopService) {
    this.total = this.shopService.totalPayment
    this.shopService.cartItems$.subscribe(items => {
      this.itemsList = items;
      this.total = this.shopService.totalPayment;
    });
  }

  // Handle item click event
  deleteItemFromCart(itemID: number): void {
    console.log("delete from card?")
    this.shopService.deleteItemFromCartService(itemID);
  }
}
