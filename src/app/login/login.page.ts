import { Component } from '@angular/core';


@Component({
  selector: 'app-Login',
  templateUrl: 'Login.page.html',
  styleUrls: ['Login.page.scss'],
})
export class Login {
  registerContent : boolean;

  constructor() { 
    
  }

  registerPage() {
    this.registerContent = true;
  }

  loginPage() {
    this.registerContent = false;
  }
  
  }


