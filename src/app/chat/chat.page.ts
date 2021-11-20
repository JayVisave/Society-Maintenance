import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { observable, Observable } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages = [];
  nickname = '';
  message = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.nickname = this.navParams.get('nickname');
    this.getMessages().subscribe(message =>{
      this.messages.push(message);
    })
    this.getUsers().subscribe(data =>{
      let user = data['user'];
      if(data['event'] == 'left'){
        this.showToast('Society Member Left '+user);
      }else{
        this.showToast('Society Member Joined '+user);
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
  }

}
