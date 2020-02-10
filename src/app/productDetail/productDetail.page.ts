import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-productDetail',
  templateUrl: 'productDetail.page.html',
  styleUrls: ['productDetail.page.scss'],
})
export class productDetail {
  productID: string;
  product : object;
  comments : object;
  commentCount : string;
  productLike : boolean;

  constructor(route: ActivatedRoute,private router:Router,public http: HttpClient,private alertController: AlertController) { 
    this.productID = route.snapshot.params['id']; 
  
          this.http.get( 'https://localhost:44353/api/app/get_product/' + parseInt(this.productID) ).toPromise()
            .then(data =>{         
              this.product = data;
              console.log(this.product)
           })  

           this.http.get( 'https://localhost:44353/api/app/get_comment/' + parseInt(this.productID) ).toPromise()
           .then(data =>{           
             this.comments = data;
             this.commentCount = "5";
             console.log(this.comments)
          })  

         

    // this.products[0].forEach(currentProduct=> {
    //   if(currentProduct.id  == parseInt(this.productID)){
    //   this.product = currentProduct;
    //   }
    // })
    // })  
  }  

  goHome(){
    this.router.navigateByUrl("/tabs/tab1");
  }

  goToTutorail(){
    this.router.navigateByUrl("/tutorail");
   } 

   likeButton(){
     if(this.productLike == true){
      this.productLike = false;
     }
     else{
      this.productLike = true;
     }
   }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Yorumun',
      inputs: [
        {
          name: 'yorum',
          type: 'text',
          placeholder: 'Yorum Yaz'
        },       
      ],
      buttons: [
        {
          text: 'Kapat',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Paylaş',
          handler: result =>{  
          let obj = {
              name : result.yorum,
              productId : this.productID
          }
          this.http.post<any>('https://localhost:44353/api/app/add_comments', obj).subscribe(data => {
            this.http.get( 'https://localhost:44353/api/app/get_comment/' + parseInt(this.productID) ).toPromise()
           .then(data =>{           
             this.comments = data;
             this.commentCount = "5";
             console.log(this.comments)
          })  
          })
          }
        }
      ]
    });

    await alert.present();
  }
  }


