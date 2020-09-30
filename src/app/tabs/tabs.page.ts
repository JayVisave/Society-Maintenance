import { get, GlobalService } from './../global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  typeUser: boolean;
  constructor() {
  }
  async ngOnInit() {
    GlobalService.userId = await get('userId');
    if (GlobalService.userId.substring(0, 5 ) === 'admin'){
      this.typeUser = true;
    }
    else{
      this.typeUser = false;
    }
  }

}
