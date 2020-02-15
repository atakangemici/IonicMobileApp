import { Component , OnInit} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  products = [];
  productLike : boolean;

  constructor(private route:Router,public http: HttpClient) {     
    
    this.http.get ( 'https://localhost:44353/api/app/get_all_products')
    .subscribe (data => {  
    console.log(data)  
    this.products.push(data);
    console.log(this.products)
    })
    
  }
  
  
  ngOnit(){
    console.log('aa');
  }
  
  goToProduct(product){
    this.route.navigateByUrl("/productDetail/" + product.id);
   }  

   goToTutorail(){
    this.route.navigateByUrl("/tutorail");
   } 

   likeButton(product){
    if(this.productLike == true){
     this.productLike = false;
    }
    else{
     this.productLike = true;
    }
  }
  

}


  

