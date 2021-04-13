import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GlobalservisService } from '../services/globalservis.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  jdlNote = "";
  isiNote = "";
  nilaiNote = 0;

  constructor(public globalservis:GlobalservisService, private toastCtrl: ToastController) {}

  addNewFoto(){

    this.globalservis.dtFotoBaru = [];
    this.globalservis.addFoto();
  }

  simpan(){
    console.log(this.jdlNote.toString() + "-" + this.isiNote.toString() +  "-" + this.nilaiNote.toString());
    if(this.jdlNote != "" && this.isiNote != "" && this.nilaiNote != 0){
      this.globalservis.uploadAll(this.jdlNote, this.isiNote, this.nilaiNote);
      //this.jdlFoto = "";
      //this.tagFoto = "";
    }
    else{
      this.presentToast();

    }
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Semua Data tidak boleh kosong !',
      duration: 3000,
      position: 'top',
      color: "danger"
    });
  
  
    toast.present();
  }
}
