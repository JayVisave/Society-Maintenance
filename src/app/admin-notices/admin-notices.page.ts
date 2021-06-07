import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notice } from '../models/notice.model';
import { get, GlobalService, set } from '../global.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { File, FileEntry } from '@ionic-native/file';

@Component({
  selector: 'app-admin-notices',
  templateUrl: './admin-notices.page.html',
  styleUrls: ['./admin-notices.page.scss'],
})
export class AdminNoticesPage implements OnInit {
  minDate: String = new Date().toISOString();
  generationDate: string;
  notice = {} as Notice;
  uploadProgress = 0;
  file: File;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private fireStore: AngularFirestore,

    private storage: AngularFireStorage,

  ) { }
  ngOnInit() {
    // this.getComplaints(event);

  }

  // async getComplaints(event){
  //   let loader = this.loadingCtrl.create({
  //     message: 'Please wait...'
  //   });
  //   (await loader).present();
  //   try{
  //     GlobalService.userId = await get('userId');
  //     GlobalService.societyId = await get('societyID');
  //     console.log('Global '+  GlobalService.userId);
  //     console.log('Global '+  GlobalService.societyId);
  //     this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('Complaint').snapshotChanges().subscribe( data=>{
  //        this.complaints = data.map(e=>{
  //         console.log('Type '+e.payload.doc.data()['type']);
  //         return{
  //           comp_type: e.payload.doc.data()['comp_type'],
  //           issue: e.payload.doc.data()['issue'],
  //           isSolved: e.payload.doc.data()['isSolved'],
  //         }
  //       })
  //      })
  //    }
  //    catch(e)
  //    {
  //      this.showToast(e);
  //    }
  //   (await loader).dismiss();
  // }

  async file_Notice(notice: Notice, f: FileEntry) {
    // console.log('Try ',f.nativeURL)
    // return;
    if (this.formValidation(f)) {

      let loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();
      try {


        this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get()
          .then(doc => {
            console.log('Document data:', doc.data()['societyID']);
            set('societyID', doc.data()['societyID']);
            // const comment = doc.data();   // get data in result variable
            // this.items = JSON.stringify(comment); // then convert data to json string
            // console.log("Items "+this.items);
            // this.allData = JSON.parse(this.items); // parse json data and pass json string
            // console.log("all data "+this.allData["isCommercial"]); // got result of particular string
            //map(data=>{});
          });
        this.generationDate = Date.now().toString();
        GlobalService.userId = await get('userId');
        GlobalService.societyId = await get('societyID');
        console.log('Global 1' + GlobalService.userId);
        console.log('Global 2' + GlobalService.societyId);
        this.notice.u_id = GlobalService.userId;
        this.notice.n_id = this.fireStore.createId();
        this.notice.date = notice.date;
        this.notice.desc = notice.desc;
        this.notice.title = notice.title;
        this.notice.type = notice.type;
        this.notice.f_id = 'none';
        if (f != null) {
          const fileId = this.fireStore.createId();
          this.uploadNotice(fileId);
          console.log('File entry 2 ', f.toString().split('.').pop());
          const ext = f.toString().split('.').pop();
          this.notice.f_id = fileId + "." + ext;
          console.log('ext',ext)
        
        }
        
        this.fireStore.collection('society').doc(GlobalService.societyId).collection('Notices').doc(this.notice.n_id).set({ ...this.notice });
        notice.date = "";
        notice.desc = "";
        notice.title = "";
        notice.type = "";
        // f=null;
        // f.fullPath = "";

      }

      //console.log('name '+ this.name);


      //this.fireStore.collection('society').doc(GlobalService.societyId).collection('users').doc(GlobalService.userId).collection('Complaint').doc(this.complaint.c_id).set({...this.complaint});    
      // const increment = firebase.firestore.FieldValue.increment(1);
      // this.fireStore.collection('userDetails').doc(GlobalService.userId).update({"no_of_comp": increment});
      // this.fireStore.collection('society').doc(GlobalService.societyId).collection('users').doc(GlobalService.userId).update({"no_of_com": increment});
      // this.showToast('Your complaint was filed successfully.');


      catch (e) {
        console.log(e);
        this.showToast(e);

      }
      (await loader).dismiss();
    }


  }
  changeListener($event): void {
    this.file = $event.target.files[0];
  }
  async uploadNotice(id: string) {
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try {
      this.showToast('Uploading File...Please Wait!');
      console.log('Name ', this.file.name);
      console.log('ext ', this.file.name.split('.').pop());
      const ext = this.file.name.split('.').pop();
      this.notice.f_id = id + "." + ext;
      // let fileRef =  this.storage.storage.ref('societyNoticesMedia/' + id +"."+ ext);
      // this.uploadProgress= fileRef.put(this.file).snapshot.bytesTransferred.;

      // fileRef.put(this.file).then(function(snapshot) {

      //   console.log('Uploaded a blob or file!');
      // });
      const fileName = id + "." + ext;
      const filePath = 'societyNoticesMedia/' + fileName;
      // const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      task.percentageChanges().subscribe(changes => {
        this.uploadProgress = changes;
      });
      task.then(async res => {
        this.showToast('File Upload Finished!');
      });
    }
    catch (e) {
      console.log(e);
      this.showToast(e);

    }
    (await loader).dismiss();


  }
  // getMimeType(fileExt) {

  //   if (fileExt == 'jpg') return { type: 'image/jpg' };
  //   // else if (fileExt == 'pdf') return { type: 'media/pdf' };
  // }
  formValidation(f: FileEntry) {
    if (!this.notice.title) {
      this.showToast('Please provide title for your notice.');
      return false;
    }
    if (!this.notice.date) {
      this.showToast('Please provide date for your notice.');
      return false;
    }
    if (!this.notice.desc) {
      this.showToast('Please provide description for notice.');
      return false;
    }
    if (!this.notice.type) {
      this.showToast('Select type of notice.');
      return false;
    }
    const ext = f.toString().split('.').pop();
    if(ext=='pdf' || ext=='jpg' || ext=='jpeg' || ext=='png'){
      return true;
    }
    else{
      this.showToast("Invalid file type.");
      return false;
    }
  }
  showToast(message: string) {
    this.toastCtrl.create({ message: message, duration: 3000, }).then(toastData => toastData.present());
  }


}
