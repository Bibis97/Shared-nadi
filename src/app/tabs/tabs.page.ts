import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userData;
  constructor(private storage: Storage) {
    this.storage.get('USER_DATA').then((response) => {
      if(response){
        this.userData = response;
        console.log(this.userData);
      }
    });
  }

}
