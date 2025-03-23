import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service'; // Adjust the path as needed

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: number | undefined;
  productDetails: any; // You can create an interface for the product if needed
  imageUrl: string = 'https://img.freepik.com/premium-vector/new-product-speed-style-label-clipart_1197144-4.jpg';
  constructor(
    private route: ActivatedRoute, // To capture route parameters
    private shopService: ShopService // To get product details from the service
  ) { }

  ngOnInit(): void {
    // Capture the product ID from the route parameter
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    // Call the service to fetch product details
    this.getProductDetails(this.productId);
  }

  // Method to get the product details
  getProductDetails(productId: number): void {
    this.shopService.getProductDetailsById(productId).subscribe(
      (response) => {
        this.productDetails = response.data;
        console.log(this.productDetails)
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
}
