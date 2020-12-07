import { Component, OnInit } from '@angular/core';
import { get, GlobalService } from '../global.service';

@Component({
  selector: 'app-society-admin-tab1',
  templateUrl: './society-admin-tab1.page.html',
  styleUrls: ['./society-admin-tab1.page.scss'],
})
export class SocietyAdminTab1Page implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getData();
  }
  async getData(){
    GlobalService.userId = await get('userId');
    console.log("ID ",GlobalService.userId);
    GlobalService.userCode = await get('userCode');
    console.log("CODE ",GlobalService.userCode);

  }
  //GlobalService.userId = await get('userId'); # Society Admin id
  //GlobalService.userCode = await get('userCode');  # Society Code for accessing society
  //this.fireStore.firestore.collection('societyCodes').doc(GlobalService.userCode).get().then(doc => {}); # get society id
}
