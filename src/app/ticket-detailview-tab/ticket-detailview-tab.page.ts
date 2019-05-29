import { OnInit } from '@angular/core';
import { AppService } from './../services/app.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-ticket-detailview-tab',
  templateUrl: 'ticket-detailview-tab.page.html',
  styleUrls: ['ticket-detailview-tab.page.scss']
})
export class TicketDetailviewTabPage implements OnInit {

  selectedTickets: any;
  histroylist: any = {};
  form: any = {};
  ticketStatusId;
  userData;
// tslint:disable-next-line: max-line-length
  ticketStatuslist: any = [{"status_id":"1","status_name":"Open"},{"status_id":"2","status_name":"In Progress"},{"status_id":"3","status_name":"Close"},{"status_id":"4","status_name":"Hold"}]
// tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute,private storage: Storage, private router: Router,public toastController: ToastController,private appService: AppService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.selectedTickets = JSON.parse(params.data);
        console.log(this.selectedTickets);
      }
    });
  }

  onChange(e){
    this.ticketStatusId = e.detail.value;
  }
  ObjectKeys = Object.keys;
  ngOnInit(){
    this.storage.get('USER_DATA').then((response) => {
      if(response){
        this.userData = response;
        this.getHistroy();
      }
    });

    
  }

  getHistroy(){
    // tslint:disable-next-line: max-line-length
    this.appService.getRestWithoutEnv(`http://nadi.softstreaktech.in/api/gethistoryList/`+this.selectedTickets.task_reference_id).subscribe(res=>{
      if(res.status === true){
        this.histroylist = res.data;
      }
    })
  }

  addComment(){
    this.form.taskStatus = this.ticketStatusId;
    this.form.task_id = this.selectedTickets.task_id;
    this.form.user_id = this.userData.id;
    this.form.user_type = this.userData.user_type;
    this.appService.postRestWithoutEnv(`http://nadi.softstreaktech.in/api/addhistory`,this.form).subscribe(async res=>{
      if(res.status === true){
        this.getHistroy();
        const toast = await this.toastController.create({
          message: res.message,
          duration: 2000
        });
        toast.present();

      }else{
        const toast = await this.toastController.create({
          message: 'Comments Failed',
          duration: 2000
        });
        toast.present();
      }
    })
  }

}
