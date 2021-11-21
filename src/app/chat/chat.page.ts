import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { get } from '../global.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages = [];
  nickname = '';
  message = '';
  userDetails : any;
  constructor(public navCtrl: NavController,   private socket: Socket, private toastCtrl: ToastController) {
    // this.nickname = this.navParams.get('nickname');
    this.getMessages().subscribe(message =>{
      this.messages.push(message);
    })
    this.getUsers().subscribe(data =>{
      let user = data['user'];
      if(data['event'] == 'left'){
        this.showToast(user+' Left.');
      }else{
        this.showToast(user+' Joined.');
      }
    });
   }
ionViewWillLeave(){
  this.socket.disconnect();
}
getMessages(){
  let observable = new Observable(observer=>{
    this.socket.on('message', data => {
      observer.next(data);
    })
  });
  return observable;
}
  async getNickName(){
  this.nickname =await get('nickName');
}
getUsers(){
  let observable = new Observable(observer=>{
    this.socket.on('users-changed', data => {
      observer.next(data);
    })
  });
  return observable;
}
sendMessage(){
  this.socket.emit('add-message',{text: this.message});
  this.message = '';
}
showToast(message: string) {
  this.toastCtrl.create({ message, duration: 3000, }).then(toastData => toastData.present());
}


  ngOnInit() {
    this.getNickName();
  }

}
