import { Component} from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChatPage } from '../chat/chat';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  // @ViewChild('username') uname;
  // @ViewChild('password') pword;
  username: string= '';
  password: string= '';

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, private storage: Storage)
  {
    this.storage.get('username').then((val) => {
      if (val != null) {
        this.username= val;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signInUser() {
    this.storage.set('username', this.username);

    // if(/^[a-zA-Z0-9]+$/.test(this.uname.value))
    this.fire.auth.signInWithEmailAndPassword(this.username + '@domain.invalid', this.password).then(data=> {
    console.log('got data', this.fire.auth.currentUser);
    this.alert('Success! You\'re logged in');

    this.navCtrl.push(ChatPage, {username: this.username});
    // this.navCtrl.setRoot(ChatPage);

    }).catch(error => {
      console.log('got an error', error);
      this.alert(error.message);
    })
    console.log('Would sign in with ', this.username, this.password)
    // else {this.alert('Error, Invalid username');}
  }
}

// admin55@gmail.com
