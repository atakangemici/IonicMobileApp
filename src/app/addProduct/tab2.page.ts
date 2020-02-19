import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentImage: any;
  constructor(public actionSheetController: ActionSheetController, private file: File,public http: HttpClient,private route:Router,private camera: Camera) {

   }

   takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
    this.currentImage = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
   
    });
  }

  getGalleryImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Fotoğraf Yükle",
      buttons: [{
        text: 'Galeriden Seç',
        handler: () => {
          this.getGalleryImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Kamera Kullan',
        handler: () => {
          this.getGalleryImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Vazgeç',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  save(product){
    var token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+ token);  
    this.http.post<any>('http://indirimxmobile.azurewebsites.net/api/app/add_product', product.form.value,{headers: headers}).subscribe(data => {
      this.route.navigateByUrl("/tabs/tab1");
    })
  }

  
}
