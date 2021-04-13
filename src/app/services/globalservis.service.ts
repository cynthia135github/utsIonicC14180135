import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { CameraPhoto, CameraResultType, CameraSource, Filesystem, FilesystemDirectory, Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

const { Camera, Storage } = Plugins;

export interface Photo{

  filePath: string; 
  webviewPath: string; 
  dataImage : File;
}

export interface DataNote{
  judul : string,
  isi: string,
  tgl : Date,
  nilai : number,
  urlfoto : string,
  namafoto : string 
}

@Injectable({
  providedIn: 'root'
})
export class GlobalservisService {

  //Foto Captured
  public dtFotoBaru : Photo[] = [];

  public dataUpload: DataNote[] = [];

  public refNotesColl;

  constructor(public firestorage: AngularFireStorage, public afs : AngularFirestore, private toastCtrl : ToastController) { }

  public loadAllFromFirebase(){
   this.getNotes().subscribe(res => {
     this.refNotesColl = res;
     this.dataUpload = [];
     res.forEach(element => {
       var el = (element.payload.doc.data() as DataNote); 
       this.dataUpload.unshift(el);
       console.log(el.judul);
     });
   }); 
 
}

  getNotes(){
    return this.afs.collection("NotesData").snapshotChanges();
  }


  public async addFoto(){
    this.dtFotoBaru = [];

    //Utk Buka Camera lalu ambil Foto
    const Foto = await Camera.getPhoto({
      resultType : CameraResultType.Uri,
      source : CameraSource.Camera,
      quality : 100
    });
    console.log(Foto);

    const fileBaru = await this.saveFotoBaru(Foto);

    this.dtFotoBaru.unshift(fileBaru);

  }

  private async readAsBase64(foto : CameraPhoto){
    
    const response = await fetch(foto.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
    
  }

  convertBlobToBase64 = (blob : Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async saveFotoBaru(foto : CameraPhoto){
    const base64Data = await this.readAsBase64(foto);

    const randomIdImage = Math.random().toString(36).substring(2, 8);
    const fileName = `${new Date().getTime()}_${randomIdImage}.jpeg`;

    const simpanFileFoto = await Filesystem.writeFile({
      path : fileName,
      data : base64Data,
      directory : FilesystemDirectory.Data
    });

    const response = await fetch(foto.webPath);
    const blob = await response.blob();
    const dataFoto = new File([blob], foto.path, {type : "image/jpeg"})

    return{
      filePath : fileName,
      webviewPath : foto.webPath,
      dataImage : dataFoto
    }
  }

  public async uploadAll(judul, isi, nilai){

    // ---------------UPLOAD FOTO-----------------
    const namaFilenya = this.dtFotoBaru[0].filePath;
    const pathFilenya = `images/${namaFilenya}`;

    const FilePhotonya = this.dtFotoBaru[0].dataImage;

    var imgurl = "";
    var namafile = "";
    var tglNote = new Date();

    await this.firestorage.upload(pathFilenya, FilePhotonya). then((result) => {
      result.ref.getDownloadURL().then((url) => {
        
        imgurl = url;
        console.log("img urlnya: "+ url);

        var arrnamafile = result.ref.fullPath.split("/"); 
        namafile= arrnamafile[arrnamafile.length - 1]; 
        console.log("nama filenya dr storage =>"+namafile);

        //---------------UPLOAD DATA NOTE BARU-----------------
        var judulkembar = false;

        this.getNotes().subscribe(res => {
          res.forEach(element => {
            var el = (element.payload.doc.data() as DataNote); 
            
            if(el.judul == judul){
              judulkembar = true;
            }
          });

          if(judulkembar == false){
            this.afs.collection("NotesData").doc(judul).set({
              judul : judul,
              isi   : isi,
              tgl   : tglNote,
              nilai : nilai,
              urlfoto   : imgurl,
              namafoto  : namafile
            });
  
            this.presentToastSukses();
  
          }
          else{
            this.presentToastJudulKembar();
          }
        }); 

        /*this.dataUpload.forEach(itemref => {
          if(itemref.judul == judul){
            judulkembar = true;
          }
        });*/
  
        
      });
    });
  }

  async presentToastJudulKembar() {
    let toast = await this.toastCtrl.create({
      message: 'Judul Tidak Boleh Kembar !',
      duration: 3000,
      position: 'top',
      color: "danger"
    });
  
  
    toast.present();
  }

  async presentToastSukses() {
    let toast = await this.toastCtrl.create({
      message: 'Note Berhasil Disimpan',
      duration: 3000,
      position: 'top',
      color: "success"
    });
  
  
    toast.present();
  }
}
