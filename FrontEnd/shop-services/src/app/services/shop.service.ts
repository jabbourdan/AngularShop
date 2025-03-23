import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Models/product.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = 'http://localhost:3000/api/products';
  prodcutListSubject = new BehaviorSubject<Product[]>([]);
  productsList: Array<Product> = [];

  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  totalPayment = 0;

  constructor(private http: HttpClient, private loggerService: LoggerService) {
    console.log("FETCHING")

    const headers = this.loggerService.getAuthHeaders(); 

    this.http.get<any>(this.apiUrl,headers).subscribe((data) => {
      this.prodcutListSubject.next(data.data);
      this.productsList = data.data;
    });
    
  }

  addItemToCartService(id: number): void {
    const product = this.productsList.find((item) => item.id === id);
    if (product) {
      this.totalPayment += product.price;
      const newCart = [...this.cartItemsSubject.value, product];
      this.cartItemsSubject.next(newCart); // update observable
      alert("The product has been added to the cart!")
    }
  }

  deleteItemFromCartService(id: number): void {
    const cartItems = this.cartItemsSubject.value;
    const product = cartItems.find((item) => item.id === id);
    if (product) {
      this.totalPayment -= product.price;
      const updatedCart = cartItems.filter(item => item.id !== product.id);
      this.cartItemsSubject.next(updatedCart); // update observable
    }
  }


  submitProduct(product: Product): void {
    const productPayload = {
      title: product.title,
      price: product.price,
      type: product.type
    };
  
    const headers = this.loggerService.getAuthHeaders(); 
  
    this.http.post<any>(this.apiUrl, productPayload, headers).subscribe({
      next: (response) => {
        console.log('Product submitted successfully:', response);
  
        // Refresh product list after submission
        this.http.get<any>(this.apiUrl, headers).subscribe(data => {
          this.prodcutListSubject.next(data.data);
        });
      },
      error: (err) => {
        console.error('Error submitting product:', err);
      }
    });
  }
  


  deleteProductFromServer(itemId: number): void {
    console.log(itemId)
    const headers = this.loggerService.getAuthHeaders(); 
    this.http.delete(`${this.apiUrl}/${itemId}`, headers).subscribe({
      next: (response) => {
        console.log('Product deleted successfully:', response);
        console.log(this.productsList)
        // Remove from local productsList
        this.productsList = this.productsList.filter(product => product.id !== itemId);

        // Update observable to reflect changes in the UI
        this.prodcutListSubject.next(this.productsList);
        console.log(this.productsList)

        this.refreshProductsList();

      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }

  getProductsByFilterAndSort(filter: string, sort: string): Observable<any> {
    const headers = this.loggerService.getAuthHeaders();
    const filterParam = filter ? `&filter=${filter}` : ''; 
    const sortParam = sort ? `&sort=${sort}` : '';        
    if(filterParam== ''){
      this.http.get<any>(this.apiUrl, headers).subscribe(data => {
        this.prodcutListSubject.next(data.data);
      });
    }
    return this.http.get<any>(`${this.apiUrl}?${filterParam}${sortParam}`, headers);
  }
  
  
  getProductDetailsById(productId: number): Observable<any> {
    const headers = this.loggerService.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${productId}`,headers);
  }

  refreshProductsList() {
    const headers = this.loggerService.getAuthHeaders(); 
    this.http.get<any>(this.apiUrl,headers).subscribe(data => {
      this.productsList = data.data;
      this.prodcutListSubject.next(this.productsList);
    });
  }


}
