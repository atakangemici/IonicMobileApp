import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public http: HttpClient,private route:Router) { }

  save(product){
    this.http.post<any>('https://indirimxapp.azurewebsites.net/api/app/add_product', product.form.value).subscribe(data => {
      this.route.navigateByUrl("/tabs/tab1");
    })
  }

  
}
