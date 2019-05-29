import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings-tab',
  templateUrl: 'settings-tab.page.html',
  styleUrls: ['settings-tab.page.scss']
})
export class SettingsTabPage {

  constructor(private authService: AuthService, private router: Router) {}

  logout(){
    this.authService.logout();
   // this.router.navigate(['/signin']);

  }
}
