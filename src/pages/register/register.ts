import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  @ViewChild('username') uname;
  @ViewChild('password') pword;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.uname.value + '@domain.invalid', this.pword.value).then(data=> {
      console.log('got data', data);
      this.alert('Registered!');

    }).catch(error => {
      console.log('got an error', error);
      this.alert(error.message);

    });
    console.log('Would register user with ', this.uname.value, this.pword.value);
  }
}
