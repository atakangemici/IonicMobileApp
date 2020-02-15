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
    var token = JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+ token);  
    this.http.post<any>('https://localhost:44353/api/app/add_product', product.form.value,{headers: headers}).subscribe(data => {
      this.route.navigateByUrl("/tabs/tab1");
    })
  }

  
}
