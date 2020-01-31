import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  products = [];

  constructor(private route:Router,public http: HttpClient) { 

    this.http.get ( 'https://localhost:44353/api/app/get_all_products' )
    .subscribe (data => {  
    console.log(data)  
    this.products.push(data);
    console.log(this.products)
    })
  }
  
  
  goToProduct(product){
    this.route.navigateByUrl("/productDetail/" + product.id);
   }   

  //  products = [

  //   {
  //     "id" : 1,
  //     "name" : "Nike",
  //     "price" : "170",
  //     "location" : "Marmara Forum",
  //     "like" : "14",
  //     "comment" : "22",
  //     "photo" : "https://cdn-occ.akinon.net/products/2019/08/26/93605/bf90d6e4-8c01-48a2-a055-e88160a4fc16_size780x780_cropCenter.jpg"
  //   },
  //   {
  //     "id" : 2,
  //     "name" : "Adidas",
  //     "price" : "200",
  //     "location" : "Forum İstanbul",
  //     "like" : "26",
  //     "comment" : "36",
  //     "photo" : "https://assets.adidas.com/images/w_600,f_auto,q_auto:sensitive,fl_lossy/1f893c7c14424f6f8f72a98101359ecb_9366/Grand_Court_Ayakkabi_Beyaz_F36483_01_standard.jpg"

  //   },
  //   {
  //     "id" : 3,
  //     "name" : "Puma",
  //     "price" : "250",
  //     "location" : "Axis İstanbul",
  //     "like" : "86",
  //     "comment" : "75",
  //     "photo" : "http://static.barcin.com/web/images/products/190949-16/puma-defy-fw18-kadin-spor-ayakkabi-original-big.jpg"

  //   }
  // ];

}


  

