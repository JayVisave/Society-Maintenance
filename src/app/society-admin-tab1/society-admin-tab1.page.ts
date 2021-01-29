import { Component, OnInit } from '@angular/core';
import { get, GlobalService } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Visitor } from '../models/visitor.model';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-society-admin-tab1',
  templateUrl: './society-admin-tab1.page.html',
  styleUrls: ['./society-admin-tab1.page.scss'],
})
export class SocietyAdminTab1Page implements OnInit {
  users: any;
  visitor={} as Visitor;
  societyNames : any;
  public societyName : string;

  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;

  fileName:string;
  fileSize:number;

  isUploading:boolean;
  isUploaded:boolean;

  UploadedFileURL: Observable<string>;

  images: Observable<MyData[]>;

  private imageCollection: AngularFirestoreCollection<MyData>;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
  ) { 
    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = fireStore.collection<MyData>('visitorImages');
    this.images = this.imageCollection.valueChanges();
    
  }

  ngOnInit() {
    this.getData();
    this.getSocietyDetails(event);
    console.log("Page initialized ");
  }
  
  async getSocietyDetails(event){
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{
    this.fireStore.collection('society').snapshotChanges().subscribe(data => {
      this.societyNames = data.map(e=>{
        return{
          name: e.payload.doc.data()['name'],
          wings: e.payload.doc.data()['wings'],
          flats: e.payload.doc.data()['flatsPerWing'],
          id: e.payload.doc.data()['id']
        }
      })
    });
    (await loader).dismiss();
  }
  catch (e){
    this.showToast(e);
  }
  setTimeout(() => {

    event.target.complete();
  }, 1000);
  }

  async getUserDetails(tempID : any){
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{


      // var day = generationDate.getDay();
      GlobalService.userId = await get('userId');
      console.log('Global ' +  GlobalService.userId);


    this.fireStore.collection('society').doc(tempID).collection('users').snapshotChanges().subscribe( data => {
    this.users = data.map(e => {
     // console.log('Type ' + e.payload.doc.data()['type']);
     this.societyName = e.payload.doc.data()['societyName'];
      return{
      name: e.payload.doc.data().name,
      id: e.payload.doc.data().u_id,
      flat: e.payload.doc.data().flatNumber,
      wing: e.payload.doc.data().wing,

    };
    });
  });
      (await loader).dismiss();
    }
    catch (e){
      this.showToast(e);
    }
    setTimeout(() => {

      
    }, 1000);

  }

  // async visitRequest(guest : Visitor)
  // {
  //   const loader = this.loadingCtrl.create({
  //     message: 'Please wait...'
  //   });
  //   (await loader).present();
  //   try{
  //     // const userid = guest.user;
  //   this.uploadFile() 
      
  //   }
  //   catch (e){
  //     this.showToast(e);
  //   }
  //   setTimeout(() => {}, 1000);
  // }


  async uploadFile(event: FileList, guest: Visitor)
  {
    console.log(this.visitor.name);
    console.log(this.visitor.user);
    this.fireStore.collection('society').doc(this.visitor.society).collection('users').doc(this.visitor.user).collection('visitors').doc(this.visitor.user).set({...this.visitor});
    this.fireStore.collection('userDetails').doc(this.visitor.user).collection('visitors').doc(this.visitor.user).set({...this.visitor});
    this.showToast('Request sent.');
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
     }
    
    this.isUploading = true;
    this.isUploaded = false;

    this.fileName = file.name;

    const path = `visitorImages/${ this.visitor.user}_${file.name}`;

    const fileRef = this.storage.ref(path);

    this.task = this.storage.upload(path, file);

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
      )
      this.showToast('Image uploaded.');
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    // const id = this.fireStore.createId();


    //Set document id with value in database
    this.imageCollection.doc(this.visitor.user).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  

  async getData(){
    GlobalService.userId = await get('userId');
    console.log("ID ",GlobalService.userId);
    GlobalService.userCode = await get('userCode');
    console.log("CODE ",GlobalService.userCode);

  }
  //GlobalService.userId = await get('userId'); # Society Admin id
  //GlobalService.userCode = await get('userCode');  # Society Code for accessing society
  //this.fireStore.firestore.collection('societyCodes').doc(GlobalService.userCode).get().then(doc => {}); # get society id
  showToast(message: string){
    this.toastCtrl.create({message, duration: 3000, }).then(toastData => toastData.present());
  }
}
