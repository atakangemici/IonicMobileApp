import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
  user : object;

  constructor(public toastController: ToastController,route: ActivatedRoute,private router:Router,public http: HttpClient,private alertController: AlertController) { 
    this.productID = route.snapshot.params['id']; 
  
          this.http.get( 'https://localhost:44353/api/app/get_product/' + parseInt(this.productID) ).toPromise()
            .then(data =>{         
              this.product = data;
           })   
  }
   
  async presentToast(mesaj) {
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.getComment();
  }

  getComment (){
    var token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+ token);  
    this.http.get( 'https://localhost:44353/api/app/get_comment/' + parseInt(this.productID) ,{headers: headers}).toPromise()
    .then(data =>{           
      this.comments = data;
      this.commentCount = "5";
   })  
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

   deleteComment(id){
    this.http.get( 'https://localhost:44353/api/app/delete_comment/' + id ).toPromise()
    .then(data =>{         
      this.getComment();
      this.presentToast('Yorumun silindi.');
   })   
   }

   
  async presentAlertPrompt() {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(localStorage.getItem('token'));

    if(user == null){
      this.router.navigateByUrl("/login");
    }
    else{
     
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
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', 'Bearer '+ token);  
          this.http.post<any>('https://localhost:44353/api/app/add_comments', obj,{headers: headers}).subscribe(data => {
            this.getComment(); 
            this.presentToast('Yorumun paylaşıldı.');
          })
          }
        }
      ]
    });

    await alert.present();
  }
    }
    
  }


