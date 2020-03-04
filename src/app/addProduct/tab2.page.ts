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
  image : any;
  constructor(public actionSheetController: ActionSheetController, private file: File,public http: HttpClient,private route:Router,private camera: Camera) {

   }
   
   accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,'+imageData;
      this.image = imageData;
      }, (err) => {
      console.log(err);
    });
  }

 
  save(product){
    var token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+ token);  
    product.form.value.image = "";

    this.http.post<any>('https://localhost:44353/api/app/add_product', product.form.value,{headers: headers}).subscribe(data => {
      this.route.navigateByUrl("/tabs/tab1");
    })
  }

  
}
