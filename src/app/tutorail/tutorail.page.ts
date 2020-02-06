import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tutorail',
  templateUrl: './tutorail.page.html',
  styleUrls: ['./tutorail.page.scss'],
})
export class TutorailPage implements OnInit {

  constructor(private route:Router) { }
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
 
  continue(){
    localStorage.setItem("isCompletTutorial","true")
    this.route.navigateByUrl("/order-preparing");
  }

  goHome(){
    this.route.navigateByUrl("/tabs/tab1");
  }

  ngOnInit() {
    
  }

}
