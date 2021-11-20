import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-home-discussion',
  templateUrl: './home-discussion.page.html',
  styleUrls: ['./home-discussion.page.scss'],
})
export class HomeDiscussionPage implements OnInit {
  nickname = '';
  constructor(public navCtrl: NavController, private socket: Socket) { }

  ngOnInit() {
  }
  joinChat(){
    this.socket.connect();
    this.socket.emit('set-nickname',this.nickname);
    this.navCtrl.navigateForward('chat/'+this.nickname);
    // this.navCtrl.navigateForward('/chat/niand');

    // this.navCtrl.navigateForward('/chat');
  }

}
