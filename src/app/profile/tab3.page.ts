import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public name: string;
  public sure_name: string;
  public photo: string;
  public productCount : string;
  public segmentValue : string;
  products = [];


  constructor(private route:Router,public http: HttpClient) { 

    this.segmentValue = "gonderi";

    var user = JSON.parse(localStorage.getItem('user'));
    if(user !=null){
      this.name = user["name"];
      this.sure_name = user["sure_name"];
      this.photo = user["image"];
      var token = JSON.parse(localStorage.getItem('token'));

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer '+ token);  
      
      this.http.get ( 'http://indirimxmobile.azurewebsites.net/api/app/get_user_products/'+ user["id"] ,{headers: headers})
      .subscribe (data => {  
      console.log(data)  
      this.products.push(data);
      let keys = Object.keys(data);
      this.productCount = "5";
      console.log(this.products)
      })  
    }    
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
