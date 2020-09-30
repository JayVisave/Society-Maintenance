import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService } from '../global.service';
//import jsPDF from 'jspdf';
import { UserDetails } from '../models/userDetails.model';
// import { database } from 'firebase';
// import { UserDetails } from '../models/userDetails.model';
// import { mapToMapExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userDetails: any;
  sum: number;
  bills: any;
  societyDetails: any;
  parkingNumber: number;
  nocGenerated: number;
  hasComplaints: number;
  isCommercial: string;
  isOwner: string;
  typeUser: number;
  catUser: number;
  todaysmonth: string;
  todaysyear: string;
  todaysmonthNumber: number;
  // userDetailsConverter= {
  //   toFirestore: function(userD) {
  //       return {
  //           name: userD.name,
  //           state: city.state,
  //           country: city.country
  //           }
  //   },
  //   fromFirestore: function(snapshot, options){
  //       const data = snapshot.data(options);
  //       return new (data.name, data.state, data.country)
  //   }
  // }
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fireStore: AngularFirestore,
     ) {}
  ngOnInit() {
      this.getUserDetails(event);
    }
 // ionViewWillEnter(){}
  async getUserDetails(event){
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{

      this.nocGenerated = 0;
      this.hasComplaints = 0;
      // var day = generationDate.getDay();
      GlobalService.userId = await get('userId');
      console.log('Global ' +  GlobalService.userId);

      // this.fireStore.firestore.collection('comments').doc('').get().then(snapshot => {
      //   snapshot.docs.forEach(doc => {
      //     const comment = doc.data()
      //     comment.userRef.get().then(snap => {
      //       comment.user = snap.data()
      //       this.comments.push(comment)
      //     })
      //   })
      // })

      this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get()
      .then(doc => {
        console.log('Document data:', doc.data()['societyName']);
        this.parkingNumber =  doc.data()['parkingVehicles'];
        this.isCommercial = doc.data()['isCommercial'];
        this.isOwner = doc.data()['isOwner'];

        // const comment = doc.data();   // get data in result variable
        // this.items = JSON.stringify(comment); // then convert data to json string
        // console.log("Items "+this.items);
        // this.allData = JSON.parse(this.items); // parse json data and pass json string
        // console.log("all data "+this.allData["isCommercial"]); // got result of particular string
        //map(data=>{});
        this.userDetails =  [doc.data()].map(e => {
          return{
            name: e['name'],
            sname: e['societyName'],
            parking: e['parkingVehicles'],

          };
        });
        console.log('Outside :', this.userDetails['sname']);
        // console.log("Outside :",this.userDetails.sname);
        // this.userDetails.sname = JSON.stringify(doc.data()["isCommercial"]);
        //  console.log("Outside :",this.userDetails.sname); // got result of particular string
        // this.userDetails.name = this.allData["name"];
        // this.userDetails.parking = this.allData["parkingVehicles"];
        });

      this.fireStore.firestore.collection('society').doc('sFxpx7WgYy9ojV4pzgvJ').get()
      .then(doc => {
        // tslint:disable-next-line: prefer-const
        var generationDate = new Date();
        this.todaysyear = generationDate.getFullYear().toString();
        this.todaysmonth = generationDate.toLocaleString('default', { month: 'short' });
        this.todaysmonthNumber = generationDate.getMonth();
        // tslint:disable-next-line: triple-equals
        if (this.isCommercial == 'true'){
          this.catUser = doc.data()['commercial'];
        }
        else{
          this.catUser = doc.data()['normal'];
        }
        if (this.isOwner == 'true'){
          this.typeUser = doc.data()['owner'];
        }
        else{
          this.typeUser = doc.data()['tenant'];
        }
        this.sum = this.typeUser + this.catUser + doc.data()['water'] + doc.data()['structure'] + doc.data()['complaint'] + doc.data()['parking'] + doc.data()['noc'] + doc.data()['event'] + doc.data()['interest'];
        this.societyDetails =  [doc.data()].map(e => {
          return{
            type: this.typeUser,
            category : this.catUser,
            water : e['water'],
            struct: e['structure'],
            parking : e['parking'] *  this.parkingNumber,
            complaint : e['complaint'] * this.hasComplaints,
            noc : e['noc'] * this.nocGenerated,
            interest : e['interest'],
            sname : e['name'],
            event : e['event'],
            billsum : this.sum,
            month: this.todaysmonth,
            year: this.todaysyear,
            monthNumber: this.todaysmonthNumber,
          };

        });
        // tslint:disable-next-line: max-line-length
        this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('bills').doc(this.todaysmonth + ' ' + this.todaysyear).set({...this.societyDetails[0]});
        // tslint:disable-next-line: max-line-length
        this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('bills', ref => ref.orderBy('monthNumber', 'desc')).snapshotChanges().subscribe( data => {
          this.bills = data.map(e => {
            console.log('Type ' + e.payload.doc.data()['type']);
            return{
            type: e.payload.doc.data()['type'],
            category : e.payload.doc.data()['category'],
            water : e.payload.doc.data()['water'],
            struct: e.payload.doc.data()['struct'],
            parking : e.payload.doc.data()['parking'],
            complaint : e.payload.doc.data()['complaint'],
            noc : e.payload.doc.data()['noc'],
            interest : e.payload.doc.data()['interest'],
            sname : e.payload.doc.data()['sname'],
            event : e.payload.doc.data()['event'],
            billsum :  e.payload.doc.data()['billsum'],
            month:  e.payload.doc.data()['month'],
            year:  e.payload.doc.data()['year'],
          };
          });
        });

        //let sum = this.bills.reduce((acc, cur) => acc + cur, 0);
        // console.log("pasking : " + this.parkingNumber);

        // this.bills.map(data=>{
        //   console.log("pasking : "+data["parking"])
        //   data["parking"] = data["parking"]+100;
        //   console.log("pasking : "+data["parking"])
        // })


        });






         // this.allData.forEach(e=>{
        //   console.log("Gotten data ",e);
        // }
        // );

        // this.items = JSON.stringify(this.result); // then convert data to json string
        // console.log(this.items);
        // this.allData = JSON.parse(this.items); // parse json data and pass json string
        // console.log(this.allData['Message']); // got result of particular string
      // });

      // .then(function(doc){
      //   if (doc.exists) {
      //     console.log("Document data:", doc.data());
      //     userDetails = doc.data;
      // } else {
      //     // doc.data() will be undefined in this case
      //     console.log("No such document!");
      // }
      // });
      // this.fireStore.collection("userDetails").doc(GlobalService.userId).
      // .snapshotChanges().subscribe(data=>{
      //   this.userDetails = data.payload
      // });


      // this.fireStore.collection("userDetails").doc(GlobalService.userId).snapshotChanges().subscribe(database=>{
      //   this.userDetails = database.payload.data;
      //   console.log(database.payload.data);
      // });
      // this.fireStore.collection("userDetails").doc(GlobalService.userId).snapshotChanges().subscribe(data => {
        // this.userDetails = data.map(e => {
        //   return{
        //     id: e.payload.doc.id,
        //     name: e.payload.doc.data()["name"],
        //     sname: e.payload.doc.data()["societyName"],
        //     parking: e.payload.doc.data()["parkingVehicles"],
        //   }
      //   })
      // });
      (await loader).dismiss();
    }
    catch (e){
      this.showToast(e);
    }
    setTimeout(() => {

      event.target.complete();
    }, 1000);

  }

  downloadPDF(userDetails: UserDetails)
  {
    this.showToast('Download pdf option will be available soon');
    // const doc = new jsPDF();
    // const specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // };

    // const pdfTable = this.pdfTable.nativeElement;

    // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    //   width: 190,
    //   'elementHandlers': specialElementHandlers
    // });

    // doc.save('tableToPdf.pdf');
  }

  showToast(message: string){
    this.toastCtrl.create({message: message, duration: 3000, }).then(toastData => toastData.present());
  }
}
