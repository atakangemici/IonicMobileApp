import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private route:Router,public actionSheetController: ActionSheetController,private alertController: AlertController,public modalController: ModalController) {}
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Ürünü Paylaş',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Ürün Adı'
        },
        {
          name: 'description',        
          type: 'text',
          placeholder: 'Açıklama'
        },
        {
          name: 'location',
          type: 'text',
          placeholder: 'Lokasyon'
        },
        {
          name: 'store',        
          type: 'text',
          placeholder: 'Mağaza'
        },      
        {
          name: 'price',
          type: 'number',
          placeholder: 'Fiyat'
        }     
      ],
      buttons: [
        // {
        //   text: 'Fotoğraf Seç',
        //   role: 'photo',
        //   cssClass: 'alertcss',
        //   handler: () => {
        //     console.log('Confirm Cancel');
        //   }
        // },
        {
          text: 'Kapat',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Paylaş',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  goToAddProduct(){
    this.route.navigateByUrl("/addProduct");
   } 
  
}
