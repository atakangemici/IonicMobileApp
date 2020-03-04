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
  public productCount : number;
  public segmentValue : string;
  public products : object;
  public favorites : object;
  public favoritesCount : number;


  constructor(private route:Router,public http: HttpClient) { 

    this.segmentValue = "gonderi";

    // var user = JSON.parse(localStorage.getItem('user'));

    

      // let headers = new HttpHeaders();
      // headers = headers.set('Authorization', 'Bearer '+ token);  
                
      
  }

  getProducts(){
    this.http.get ( 'https://localhost:44353/api/app/get_user_products/'+ 1)
    .subscribe (data => {  

    this.products = data;
    this.productCount = Object.keys(this.products).length

    })  
  }

  getFavorites(){


  this.http.get ( 'https://localhost:44353/api/app/get_favorites/'+ 1)
      .subscribe (data => {  
  
      this.favorites = data;   
      this.favoritesCount = Object.keys(this.favorites).length;

      }) 
    }

  goToTutorail(){
    this.route.navigateByUrl("/tutorail");
   } 

   goToProduct(product){
    this.route.navigateByUrl("/productDetail/" + product.id);
   }  

  ngOnInit() {
    this.getProducts();
    this.getFavorites();
  }

  segmentChange (value){
  this.segmentValue = value;
  if(this.segmentValue == "gonderi"){
    this.getProducts();

  }
  else{
    this.getFavorites();

  }
  }

}
