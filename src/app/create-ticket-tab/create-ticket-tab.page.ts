import { Storage } from '@ionic/storage';
import { OnInit } from '@angular/core';
import { AppService } from './../services/app.service';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from "moment";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create-ticket-tab',
  templateUrl: 'create-ticket-tab.page.html',
  styleUrls: ['create-ticket-tab.page.scss']
})
export class CreateTicketTabPage implements OnInit {
  form: any = {};
  userData: any = {};
  selectedProject: any = {};

// tslint:disable-next-line: max-line-length
  categorylist: any = [];
  constructor(private route: ActivatedRoute, private appService: AppService,private router: Router,
              public toastController: ToastController,private storage: Storage) {
    }
  ngOnInit(){
    this.storage.get('USER_DATA').then((response) => {
      if(response){
        this.userData = response;
      }
    });
    this.appService.getRestWithoutEnv(`http://nadi.softstreaktech.in/api/getprojects`).subscribe(res => {
      if (res.status === true){
        this.categorylist = res.data;
      }
    }, err =>{
      console.log(err);
    });
  }

  onChange(e){
    this.categorylist.forEach(element => {
      if(element.project_id === e.detail.value){
        this.selectedProject = element;
      }
    });
  }
  async saveTicket() {
    this.form.requestedDeliveryDate = moment(this.form.requestedDeliveryDate).format('DD-MM-YYYY');
    this.form.projectName = this.selectedProject.project_ref_id;
    this.form.user_id = this.userData.id;
    this.form.user_type = this.userData.user_type;
    this.appService.postRestWithoutEnv(`http://nadi.softstreaktech.in/api/createtask`, this.form).subscribe(async res => {
      if(res.status === true){
        const toast = await this.toastController.create({
          message: res.message,
          duration: 2000
        });
        toast.present();
        const navigationExtras: NavigationExtras = {
          queryParams: {
            data: JSON.stringify(res)
          }
        };
        this.router.navigate(['home/tickets'],navigationExtras);
        this.form = {};
      } else {
        const toast = await this.toastController.create({
          message: 'Ticket raised failed.',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
