import { Component, OnInit } from '@angular/core';
import { get, GlobalService } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Visitor } from '../models/visitor.model';
import { File, FileEntry } from '@ionic-native/file';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {


  visitors: any;
  downloadUrl: Observable<string | null>;
  constructor( private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,) { }

  ngOnInit() {
  }

  

}
