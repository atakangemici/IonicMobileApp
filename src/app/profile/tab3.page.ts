import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public name: string;
  public photo: string;
  products = [];

  constructor(private route:Router,public http: HttpClient) { 

    this.http.get ( 'https://localhost:44353/api/app/get_all_products' )
    .subscribe (data => {  
    console.log(data)  
    this.products.push(data);
    console.log(this.products)
    })
    
  }

  ngOnInit() {
  }

}
