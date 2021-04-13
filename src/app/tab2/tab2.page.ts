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

  detail(counter){
    alert(counter);
    let parameter: NavigationExtras = { 
      queryParams: {
        idDetail: counter
      }
    };

   this.movePage.navigateForward(["tab3"], parameter);
  }
}
