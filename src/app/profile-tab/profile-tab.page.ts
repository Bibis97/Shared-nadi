import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-profile-tab',
  templateUrl: 'profile-tab.page.html',
  styleUrls: ['profile-tab.page.scss']
})
export class ProfileTabPage {
  userData;
  constructor(private storage: Storage) {
    this.storage.get('USER_DATA').then((response) => {
      if(response){
        this.userData = response;
        console.log(response);
      }
    });
  }

}
