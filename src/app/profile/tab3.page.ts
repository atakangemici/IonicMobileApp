import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public name: string;
  public sure_name: string;
  public photo: string;
  public productCount : string;
  public segmentValue : string;
  products = [];


  constructor(private route:Router,public http: HttpClient) { 

    this.segmentValue = "gonderi";

    this.http.get ( 'https://localhost:44353/api/app/get_user' )
    .subscribe (data => {  
    this.name = data["name"];
    this.sure_name = data["sure_name"];
    this.photo = data["image"];

    this.http.get ( 'https://localhost:44353/api/app/get_user_products/'+ data["id"] )
    .subscribe (data => {  
    console.log(data)  
    this.products.push(data);
    let keys = Object.keys(data);
    this.productCount = "5";
    console.log(this.products)
    })

    })
    
  }

  goToTutorail(){
    this.route.navigateByUrl("/tutorail");
   } 

   goToProduct(product){
    this.route.navigateByUrl("/productDetail/" + product.id);
   }  

  ngOnInit() {
  }

  segmentChange (value){
  this.segmentValue = value;
  }

}
