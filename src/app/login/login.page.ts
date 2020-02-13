import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-Login',
  templateUrl: 'Login.page.html',
  styleUrls: ['Login.page.scss'],
})
export class Login {
  registerContent : boolean;

  constructor(public http: HttpClient,private route:Router) { }
  

  registerPage() {
    this.registerContent = true;
  }

  loginPage() {
    this.registerContent = false;
  }
  
  register(user){
    user.form.value.image = "https://www.pngkey.com/png/detail/47-474070_child-avatar-icon-flat-design-red-yellow-coffee.png";
    this.http.post<any>('https://localhost:44353/api/app/add_user', user.form.value).subscribe(data => {
      this.route.navigateByUrl("/tabs/tab1");
    })
  }

  }


