import { Component , OnInit , ViewChild} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public products : object;
  productFavorite : boolean;
  public favoriteCount : number;
  user : object;
  iller : object;
  @ViewChild('scroll-infinite', { static : false }) infiniteScroll : IonInfiniteScroll;

  constructor(public toastController: ToastController,public alertController: AlertController,private route:Router,public http: HttpClient) {     

    this.user = JSON.parse(localStorage.getItem('user'));
   
    this.http.get ( 'https://localhost:44353/api/app/get_all_products')
    .subscribe (data => {  
    this.products = data;  
    })    
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
   
      if (Object.keys(this.products).length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async presentToast(mesaj) {
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm() {
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
  
  ngOnit(){
  }
  
  goToProduct(product){
    this.route.navigateByUrl("/productDetail/" + product.id);
   }  

   goToTutorail(){
    this.route.navigateByUrl("/tutorail");
   } 

   favoriteButton(product){
    if(this.productFavorite == true){
     this.productFavorite = false;
    }
    else{
     this.productFavorite = true;
    }
  }
  

}


  

