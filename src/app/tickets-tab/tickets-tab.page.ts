import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tickets-tab',
  templateUrl: 'tickets-tab.page.html',
  styleUrls: ['tickets-tab.page.scss']
})
export class TicketsTabPage implements OnInit{

  listItem:any;
userData:any = {};
  constructor(private router: Router,private route: ActivatedRoute, private storage: Storage, private appService: AppService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.getTickets();
      }
    });
  }

  ngOnInit(): void {
    this.storage.get('USER_DATA').then((response) => {

      if(!response){
        this.router.navigate(['/signin']);
      }
      if(response){
        this.userData = response;
        this.getTickets();
      }
    });
  }

  getTickets(){

    this.appService.postRestWithoutEnv("http://nadi.softstreaktech.in/api/gettasklist",{"user_id":this.userData.id}).subscribe(res=>{
      console.log(res);
      this.listItem = res.data;
    }, err =>{
      console.log(err);
    });
  }

  detailViewlist(item){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(item)
      }
    };
    console.log(item);
    this.router.navigate(['home/indetail'], navigationExtras);
  }

}
