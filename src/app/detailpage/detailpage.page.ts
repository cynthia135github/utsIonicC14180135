import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalservisService } from '../services/globalservis.service';


@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.page.html',
  styleUrls: ['./detailpage.page.scss'],
})
export class DetailpagePage implements OnInit {

  ganti = false;

  idDetailFoto = 0;
  urlfoto = "";

  
  jdlNote = "";
  isiNote = "";
  tglNote;
  nilaiNote = 0;

  constructor(public globalservis: GlobalservisService, public router: ActivatedRoute, private toastCtrl : ToastController) {}

  ngOnInit() {
    this.urlfoto = "";

  
    this.jdlNote = "";
    this.isiNote = "";
    this.nilaiNote = 0;

    this.router.queryParams.subscribe( params => {
      this.idDetailFoto = params["idDetail"];

      console.log("Id Detail: "+this.idDetailFoto);
    });

    this.urlfoto = this.globalservis.dataUpload[this.idDetailFoto].urlfoto;
    this.jdlNote =  this.globalservis.dataUpload[this.idDetailFoto].judul;
    this.isiNote =  this.globalservis.dataUpload[this.idDetailFoto].isi;
    this.tglNote =  this.globalservis.dataUpload[this.idDetailFoto].tgl;
    this.nilaiNote =  this.globalservis.dataUpload[this.idDetailFoto].nilai;
  }


  edit(){

    if(this.jdlNote != "" && this.isiNote != "" && this.nilaiNote != 0 && this.tglNote != null){
      this.globalservis.uploadEdit(this.idDetailFoto,this.jdlNote, this.isiNote,this.tglNote, this.nilaiNote);
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

  /*EditFoto(){
    
    this.globalservis.dtFotoBaru2 = [];
    this.globalservis.editFoto();
    //this.urlfoto = this.globalservis.dtFotoBaru[0].webviewPath;
    this.ganti = true;
  }*/

}
