import { Component, OnInit } from '@angular/core';
import { get, GlobalService } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Visitor } from '../models/visitor.model';
import { File, FileEntry } from '@ionic-native/file';


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
  file: File;
  uploadProgress = 0;
  id: string;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
  ) { 
  }

  ngOnInit() {
    this.getData();
    this.getUserDetails();
    console.log("Page initialized ");
  }
  
  async getUserDetails(){
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{


      // var day = generationDate.getDay();
      GlobalService.userId = await get('userId');
      GlobalService.societyId = await get('societyID');
      console.log('Global ' + GlobalService.societyId);


    this.fireStore.collection('society').doc(GlobalService.societyId).collection('users').snapshotChanges().subscribe( data => {
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


  async uploadFile(f: FileEntry)
  {
    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();
      try{
        this.id = this.fireStore.createId();
        this.visitor.f_id = 'none';
        
        if (f != null) {
        const fileId = this.fireStore.createId();
        this.uploadProfileImage(fileId);
        }
        this.visitor.status ='Pending';
        this.visitor.req_id = this.id;
        this.fireStore.collection('society').doc(this.visitor.society).collection('users').doc(this.visitor.user).collection('visitors').doc(this.id).set({...this.visitor});
        this.fireStore.collection('userDetails').doc(this.visitor.user).collection('visitors').doc(this.id).set({...this.visitor});
        this.fireStore.collection('society').doc(this.visitor.society).collection('visitors').doc(this.id).set({...this.visitor});
        this.showToast('Request sent.');
      }
      catch(e){
        console.log(e);
        this.showToast(e);
      }
      (await loader).dismiss();
    }
  }
  uploadProfileImage(id: string){
    const ext = this.file.name.split('.').pop();
    this.visitor.f_id = id + "." + ext;
    const fileName = id + "." + ext;
    const filePath = 'VisitorPhotos/' + fileName;
    const task = this.storage.upload(filePath, this.file);
    task.percentageChanges().subscribe(changes => {
      this.uploadProgress = changes;
    });
    task.then(async res => {
      this.showToast('Photo Upload Finished!');
    });
    // let fileRef =  this.storage.storage.ref('VisitorPhotos/' + id + ".jpg");
    // fileRef.put(this.file).then(function(snapshot) {
    //   console.log('Uploaded a blob or file!');
    // });
  }

  changeListener($event) : void {
    this.file = $event.target.files[0];
  }
  formValidation(){
    if(!this.visitor.name){
      this.showToast('Please provide your name.');
      return false;
    }
    if(!this.visitor.phone){
      this.showToast('Please provide your phone number.');
      return false;
    }
    if(!this.visitor.reason){
      this.showToast('Please provide reason of your visit.');
      return false;
    }
    return true;
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
