class Product {
    constructor(id, title, price, type) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.selected = false
      this.type = type;
    }
  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        price: this.price,
        selected: this.selected,
        type: this.type,
      };
    }
  }
  
module.exports = Product;  