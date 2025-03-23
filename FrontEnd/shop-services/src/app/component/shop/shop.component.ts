import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  selectedPage = 0
  
  

  setClass(pageId: number){
    this.selectedPage = pageId
  }
}
