import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  signIn() {
    this.navCtrl.push(LoginPage);     // goes to the login page
  }

  register() {
    this.navCtrl.push(RegisterPage);     // goes to the register page
  }
}
