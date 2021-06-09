import { Component, OnInit } from '@angular/core';
import { get, GlobalService, set } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Visitor } from '../models/visitor.model';
import { File, FileEntry } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-society-admin-tab1',
  templateUrl: './society-admin-tab1.page.html',
  styleUrls: ['./society-admin-tab1.page.scss'],
})
export class SocietyAdminTab1Page implements OnInit {
  users: any;
  visitor = {} as Visitor;
  societyNames: any;
  public societyName: string;
  file: File;
  uploadProgress = 0;
  id: string;
  base64Image: string;

  constructor(
    private camera: Camera,
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
  async takePhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.showToast('Photo Captured Successfully!');
    }, (err) => {
      // Handle error
      console.error(err);
    });
  }
  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }
  async getUserDetails() {

    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try {


      // var day = generationDate.getDay();
      GlobalService.userId = await get('userId');
      GlobalService.societyId = await get('societyID');
      console.log('Global ' + GlobalService.societyId);
      this.visitor.society = GlobalService.societyId;

      this.fireStore.collection('society').doc(GlobalService.societyId).collection('users').snapshotChanges().subscribe(data => {
        this.users = data.map(e => {
          // console.log('Type ' + e.payload.doc.data()['type']);
          this.societyName = e.payload.doc.data()['societyName'];
          return {
            name: e.payload.doc.data().name,
            id: e.payload.doc.data().u_id,
            flat: e.payload.doc.data().flatNumber,
            wing: e.payload.doc.data().wing,

          };
        });
      });
      (await loader).dismiss();
    }
    catch (e) {
      this.showToast(e);
    }
    setTimeout(() => {


    }, 1000);

  }


  async uploadFile(f: FileEntry) {
    if (this.formValidation(f)) {
      let loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();
      try {

        this.id = this.fireStore.createId();
        this.visitor.f_id = 'none';

        if (f != null) {
          this.uploadProfileImage(this.id, true);
        }
        else {
          this.uploadProfileImage(this.id, false);
        }
        this.visitor.status = 'Pending';
        
        let date: Date = new Date();
        console.log('hours' + date.getDate() );
        console.log('minutes' + date.getMinutes() );
        this.visitor.time = (date.getHours() >= 12) ? (date.getHours()-12 + ':' + date.getMinutes() + ' PM') : (date.getHours() + ':' + date.getMinutes() + ' AM');
        console.log('full time ' + this.visitor.time)
        console.log('string time ' + date.toDateString());
        this.visitor.date = date.getDate()+' '+date.toLocaleString('default', { month: 'short' })+' '+date.getFullYear();

        this.visitor.req_id = this.id;
        console.log("This id ", this.visitor.society);
        this.fireStore.collection('society').doc(this.visitor.society).collection('users').doc(this.visitor.user).collection('visitors').doc(this.id).set({ ...this.visitor });
        this.fireStore.collection('userDetails').doc(this.visitor.user).collection('visitors').doc(this.id).set({ ...this.visitor });
        this.fireStore.collection('society').doc(this.visitor.society).collection('visitors').doc(this.id).set({ ...this.visitor });
        this.showToast('Uploading Details...');
      }
      catch (e) {
        console.log(e);
        this.showToast(e);
      }
      (await loader).dismiss();
      this.visitor.name = "";
      this.visitor.phone = "";
      this.visitor.reason = "";
    }
  }
  async uploadProfileImage(id: string, opt: boolean) {

    if (opt) {
      const ext = this.file.name.split('.').pop();
      this.visitor.f_id = id + "." + ext;
      const fileName = id + "." + ext;
      const filePath = 'VisitorPhotos/' + fileName;
      const task = this.storage.upload(filePath, this.file);
      task.percentageChanges().subscribe(changes => {
        this.uploadProgress = changes;
      });
      task.then(async res => {
        this.showToast('Request Sent Successfully!');
      });
    }
    else {
      const file: any = this.base64ToImage(this.base64Image);
      const ext = 'png';
      this.visitor.f_id = id + "." + ext;
      const fileName = id + "." + ext;
      const filePath = 'VisitorPhotos/' + fileName;

      const task = this.storage.upload(filePath, file);

      task.percentageChanges().subscribe(changes => {
        this.uploadProgress = changes;
      });
      task.then(async res => {
        this.showToast('Request Sent Successfully!');
      

      });
      
    }



    // let fileRef =  this.storage.storage.ref('VisitorPhotos/' + id + ".jpg");
    // fileRef.put(this.file).then(function(snapshot) {
    //   console.log('Uploaded a blob or file!');
    // });
  }

  changeListener($event): void {
    this.file = $event.target.files[0];
  }
  formValidation(f: FileEntry) {

    if (!this.visitor.name) {
      this.showToast('Please provide your name.');
      return false;
    }
    if (!this.visitor.phone) {
      this.showToast('Please provide your phone number.');
      return false;
    }
    if (!this.visitor.reason) {
      this.showToast('Please provide reason of your visit.');
      return false;
    }
    if (f != null) {
      const ext = f.toString().split('.').pop();
      if (ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
        return true;
      }
      else {
        this.showToast("Invalid file type.");
        return false;
      }
    }

    return true;
  }


  async getData(){
    let date: Date = new Date();
    console.log('date ' + date.getDate() );
    console.log('month ' + date.toLocaleString('default', { month: 'short' }));
    console.log('year ' + date.getFullYear() );
    console.log('string time ' + date.toDateString());
    GlobalService.userId = await get('userId');
    console.log("ID ", GlobalService.userId);
    GlobalService.userCode = await get('userCode');
    console.log("CODE ", GlobalService.userCode);
    this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get()
      .then(doc => {
        set('societyID', doc.data()['societyID']);
        this.visitor.society = doc.data()['societyID'];

      });
  }
  //GlobalService.userId = await get('userId'); # Society Admin id
  //GlobalService.userCode = await get('userCode');  # Society Code for accessing society
  //this.fireStore.firestore.collection('societyCodes').doc(GlobalService.userCode).get().then(doc => {}); # get society id
  showToast(message: string) {
    this.toastCtrl.create({ message, duration: 3000, }).then(toastData => toastData.present());
  }
}
