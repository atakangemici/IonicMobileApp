import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-productDetail',
  templateUrl: 'productDetail.page.html',
  styleUrls: ['productDetail.page.scss']
})
export class productDetail {
  productID: string;
  product : object;

  products = [
    {
      "id" : 1,
      "name" : "Nike",
      "price" : "170",
      "photo" : "https://cdn-occ.akinon.net/products/2019/08/26/93605/bf90d6e4-8c01-48a2-a055-e88160a4fc16_size780x780_cropCenter.jpg"
    },
    {
      "id" : 2,
      "name" : "Adidas",
      "price" : "200",
      "photo" : "https://assets.adidas.com/images/w_600,f_auto,q_auto:sensitive,fl_lossy/1f893c7c14424f6f8f72a98101359ecb_9366/Grand_Court_Ayakkabi_Beyaz_F36483_01_standard.jpg"

    },
    {
      "id" : 3,
      "name" : "Puma",
      "price" : "250",
      "photo" : "http://static.barcin.com/web/images/products/190949-16/puma-defy-fw18-kadin-spor-ayakkabi-original-big.jpg"

    }
  ];

  constructor(route: ActivatedRoute) { 
    this.productID = route.snapshot.params['id']; 
    console.log(this.productID)

    this.products.forEach(currentProduct=> {
        if(currentProduct.id  == parseInt(this.productID)){
        this.product = currentProduct;
        }
   })
  }  
  }


