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
  commentCount : number;
  productFavorite : boolean;
  user : object;
  allComments : boolean;

  constructor(public toastController: ToastController,route: ActivatedRoute,private router:Router,public http: HttpClient,private alertController: AlertController) { 
    this.productID = route.snapshot.params['id']; 
  
          this.http.get( 'http://indirimxmobile.azurewebsites.net/api/app/get_product/' + parseInt(this.productID) ).toPromise()
            .then(data =>{         
              this.product = data;
           })   

           this.user = JSON.parse(localStorage.getItem('user'));

  }
   
  async presentAlertComplaint() {
    const alert = await this.alertController.create({
      message : 'Uygunsuz gönderi mi ?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Şikayet Et',
          handler: () => {
            this.presentToast('Şikayetiniz işleme alındı.');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(mesaj) {
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.getComments();
  }

  getComments (){
    var token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+ token);  
    this.http.get( 'http://indirimxmobile.azurewebsites.net/api/app/get_comments/' + parseInt(this.productID) ,{headers: headers}).toPromise()
    .then(data =>{           
      this.comments = data;
      this.commentCount = Object.keys(data).length;
      this.allComments = false;
   })  
   }

   getAllComments (){
    var token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+ token);  
    this.http.get( 'http://indirimxmobile.azurewebsites.net/api/app/get_all_comments/' + parseInt(this.productID) ,{headers: headers}).toPromise()
    .then(data =>{           
      this.comments = data;
      this.commentCount = Object.keys(data).length;
      this.allComments = true;
   })  
   }

  goHome(){
    this.router.navigateByUrl("/tabs/tab1");
  }

  goToTutorail(){
    this.router.navigateByUrl("/tutorail");
   } 

   favoriteButton(product){
    if(this.productFavorite == true){
     this.productFavorite = false;
    }
    else{
     this.productFavorite = true;
    }
  }

 

   async presentAlertConfirm(id) {
    var user = JSON.parse(localStorage.getItem('user'));
    var token = JSON.parse(localStorage.getItem('token'));

    if(user == null){
      this.router.navigateByUrl("/login");
    }
    else{
    const alert = await this.alertController.create({
      message: 'Yorumun Silinecek !',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Onayla',
          handler: () => {
            let headers = new HttpHeaders();
            headers = headers.set('Authorization', 'Bearer '+ token); 
            this.http.get( 'http://indirimxmobile.azurewebsites.net/api/app/delete_comment/' + id ,{headers: headers}).toPromise()
            .then(data =>{         
              this.getComments();
              this.presentToast('Yorumun silindi.');
           })   
          }
        }
      ]
    });
    await alert.present();
  }
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
          this.http.post<any>('http://indirimxmobile.azurewebsites.net/api/app/add_comments', obj,{headers: headers}).subscribe(data => {
            this.getComments(); 
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


