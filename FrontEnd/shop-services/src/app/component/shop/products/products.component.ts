import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() itemId: number | null = null;
  @Input() title: string = "default";
  @Input() price: number = 0;
  @Input() type: string = 'makeUp';
  @Input() actionType!: 'add' | 'delete';
  
  @Output() itemClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemDeleteClicked: EventEmitter<number> = new EventEmitter<number>();

  imageUrl: string = 'https://img.freepik.com/premium-vector/new-product-speed-style-label-clipart_1197144-4.jpg';

  addItem(event: Event): void {
    event.stopPropagation();  // Prevent routerLink from being triggered
    this.itemClicked.emit(this.itemId!);
  }
  
  deleteItemToList(event: Event): void {
    event.stopPropagation();  // Prevent routerLink from being triggered
    this.itemDeleteClicked.emit(this.itemId!);
  }
  
}
