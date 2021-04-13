import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalservisService } from '../services/globalservis.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public globalservis:GlobalservisService, public movePage : NavController) {}

  detail(i){
    alert(i);
    let param: NavigationExtras = { 
      queryParams: {
        idDetail: i
      }
    };

   this.movePage.navigateForward(["detailpage"], param);
  }

  hapusNote(i){
    this.globalservis.hapus(i);
    
  }
}
