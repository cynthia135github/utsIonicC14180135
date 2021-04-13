import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalservisService } from '../services/globalservis.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  /*idDetailFoto = 0;
  urlfoto = "";

  
  jdlNote = "";
  isiNote = "";
  tglNote;
  nilaiNote = 0;

  constructor(public globalservis: GlobalservisService, public router: ActivatedRoute) {}

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

  }

  EditFoto(){

  }*/

}
