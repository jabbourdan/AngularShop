import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {
  itemsList: Array<Product> = []; // Initialize as an empty array of type Product
  showForm = false;
  newProductTitle = '';
  newProductPrice: number | null = null;
  newProductType: string = '';
  selectedFilter: string = ''; // Default filter to 'makeup'
  selectedSort: string = ''; // Default sort order (ascending)

  constructor(private shopService: ShopService) {
    // Subscribe to the product list updates
    this.shopService.prodcutListSubject.subscribe(data => {
      this.itemsList = data;
    });
  }

  openAddProductForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.newProductPrice = null;
    this.newProductTitle = '';
  }

  submitProduct() {
    if (!this.newProductTitle || this.newProductPrice == null) {
      return alert("Please assign both title and price to the product");
    }

    const newProduct: Product = {
      id: 0, // just for local product
      title: this.newProductTitle,
      price: this.newProductPrice,
      type: this.newProductType,
      selected: false
    };

    this.shopService.submitProduct(newProduct);
    console.log("Product submitted");
    this.closeForm();
  }

  // Handle item click event (Add to Cart)
  addItemToCard(itemID: number): void {
    this.shopService.addItemToCartService(itemID);
  }

  // Handle item delete event
  deleteItemToList(itemID: number): void {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    
    if (confirmed) {
      console.log("Item deleted:", itemID);
      this.shopService.deleteProductFromServer(itemID);
    } else {
      console.log("Deletion canceled.");
    }
  }

  // Fetch products based on the selected filter and sort
  fetchProducts() {
    const filter = this.selectedFilter || '';  // Empty filter fetches all products
    this.shopService.getProductsByFilterAndSort(filter, this.selectedSort).subscribe(data => {
      this.itemsList = data.data; // Update itemsList with filtered and sorted products
    });
  }

  // Handle filter change
  onFilterChange() {
    this.fetchProducts(); // Fetch products when the filter changes
  }

  // Handle sort change
  onSortChange() {
    this.fetchProducts(); // Fetch products when the sort changes
  }

  clearFilter() {
    this.selectedFilter = ''; // Reset the filter
    this.fetchProducts(); // Fetch all products
  }
}
