import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketDetailviewTabPage } from './ticket-detailview-tab.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TicketDetailviewTabPage }])
  ],
  declarations: [TicketDetailviewTabPage]
})
export class TicketDetailviewTabPageModule {}
