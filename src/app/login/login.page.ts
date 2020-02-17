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
  
  public url = "http://172.16.137.17/";


  registerPage() {
    this.registerContent = true;
  }

  loginPage() {
    this.registerContent = false;
  }

  login(user){
    this.http.post<any>('https://localhost:44353/api/app/token', user.form.value).subscribe(data => {
      localStorage.setItem('user', JSON.stringify(data['user']));
      user = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('token', JSON.stringify(data['token']));
      this.route.navigateByUrl("/tabs/tab1");
    })
  }
  
  register(user){
    user.form.value.image = "https://www.pngkey.com/png/detail/47-474070_child-avatar-icon-flat-design-red-yellow-coffee.png";
    this.http.post<any>('https://localhost:44353/api/app/add_user', user.form.value).subscribe(data => {
      this.http.post<any>('https://localhost:44353/api/app/token', data).subscribe(data => {
        localStorage.setItem('user', JSON.stringify(data['user']));
        localStorage.setItem('token', JSON.stringify(data['token']));
        JSON.parse(localStorage.getItem('user'));    
        this.route.navigateByUrl("/tabs/tab1");
      })
    })
  }

  }


