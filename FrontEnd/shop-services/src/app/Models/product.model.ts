export class Product {
    id: number;
    title: string;
    price: number;
    type: string;
    selected: boolean;
  
    constructor(id: number, title: string, price: number, type: string ,selected: boolean = false) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.type = type;
      this.selected = selected;
    }
  }