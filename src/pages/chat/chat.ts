import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';
import $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string= '';
  message: string= '';
  obsRef: AngularFireObject<any>;
  obsToData: Subscription;
  messages: object[]= [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.obsRef = this.db.object('/chat');
    this.obsToData = this.obsRef.valueChanges().subscribe( data => {
      var data_array= $.map(data, function(value, index) {            // converts data (object) to array
        return [value];
      });

      this.messages= data_array;
    });
  }

  sendMessage() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then( () => {
      this.message= '';
    });
  }

  ionViewWillLeave() {
    console.log('user is about to go');
    this.obsToData.unsubscribe();

    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} has left the room`
    })
  }

  ionViewDidLoad() {
    this.username= this.navParams.get('username');
    //this.username= this.navParams.data;
    console.log('ionViewDidLoad ChatPage', this.username);

    this.db.list('/chat').push({
      specialMessage: true,
      message: this.username + ` has joined the room`
    })
  }
}
