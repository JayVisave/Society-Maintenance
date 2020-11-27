import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService, set } from '../global.service';
import {HttpClient} from '@angular/common/http';
import { UserDetails } from '../models/userDetails.model';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  public extraDetails ={} as any;
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
  dataStore: any;
  public logoData: string | ArrayBuffer;
  pdfObj: any;
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
    private http: HttpClient,
    private fileOpener: FileOpener,
    private plt: Platform,
  
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
        this.nocGenerated = doc.data()['no_of_noc'];
        this.hasComplaints = doc.data()['no_of_comp'];
        this.isCommercial = doc.data()['isCommercial'];
        this.isOwner = doc.data()['isOwner'];

        this.extraDetails.name =  doc.data()['name'];
        this.extraDetails.flat =  doc.data()['flatNumber'];   
        this.extraDetails.wing =  doc.data()['wing'];
        set('societyID',doc.data()['societyID']);

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
        console.log('Outside :', this.userDetails[0]['sname']);
        // console.log("Outside :",this.userDetails.sname);
        // this.userDetails.sname = JSON.stringify(doc.data()["isCommercial"]);
        //  console.log("Outside :",this.userDetails.sname); // got result of particular string
        // this.userDetails.name = this.allData["name"];
        // this.userDetails.parking = this.allData["parkingVehicles"];
        });
        GlobalService.societyId  = await get('societyID');
      this.fireStore.firestore.collection('society').doc(GlobalService.societyId).get()
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
            // complaint : e.payload.doc.data()['complaint'],
            noc : e.payload.doc.data()['noc'],
            interest : e.payload.doc.data()['interest'],
            sname : e.payload.doc.data()['sname'],
            event : e.payload.doc.data()['event'],
            billsum : e.payload.doc.data()['type']+ e.payload.doc.data()['category']+ e.payload.doc.data()['water']+ e.payload.doc.data()['struct']+e.payload.doc.data()['parking']  + e.payload.doc.data()['noc'] + e.payload.doc.data()['interest'] ,
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

  downloadPDF(month: string, year: string)
  {
    // var generationDate = new Date();
    // this.todaysyear = generationDate.getFullYear().toString();
    // this.todaysmonth = generationDate.toLocaleString('default', { month: 'short' });
    this.todaysyear = year;
    this.todaysmonth = month;
    console.log("got data "+ month + "  year" + year);
    var billID = this.todaysmonth + ' ' + this.todaysyear;
    console.log("Bill id" + billID);
    this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).collection('bills').doc(billID).get().then(data => {
      this.dataStore = [data.data()].map(e => {
        console.log('Herererererer ' + e['type']);
        return{
        type: e['type'],
        category : e['category'],
        water : e['water'],
        struct: e['struct'],
        parking : e['parking'],
        //complaint : e['complaint'],
        noc : e['noc'],
        interest : e['interest'],
        sname : e['sname'],
        event : e['event'],
        billsum :  e['type']+e['category']+e['water']+e['struct']+e['parking']+e['noc']+e['interest'],
        month:  e['month'],
        year:  e['year'],
      };
      
      });
      console.log("In fetch "+ this.dataStore['sname']);
      this.loadLogo();
      this.createPDF(this.dataStore);
      this.downloadPDFFile();
    });

  }

  loadLogo(){
    this.http.get('https://image.shutterstock.com/image-vector/hi-hello-banner-speech-bubble-260nw-1505210795.jpg', {responseType: 'blob'})
    .subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () =>{
        this.logoData = reader.result;
      }
      reader.readAsDataURL(res);
    })
  }
  createPDF(data: any){
   
    console.log("In crreate "+ data[0]['sname']);
    //let logo = {image: this.logoData};
    const docDefinition = {
      watermark: {text: 'Society Maintenance', color: 'green', opacity :0.1, bold:true},
      content:[
        {
          columns: [
            //logo,
            {
              text: new Date().toTimeString(),
              alignment: 'right'
            }
          ]
        },
        {text: data[0]['sname']+' Maintenance Bill' , style: 'header'},
        {
          columns:[
            {
              width:'50%',
              text:'Name - Flat',
              style:'subheader'
            },
            {
              width:'50%',
              text:'Month - Year',
              style:'subheader'
            },
          ]
        },
        {
          columns:[
            {
              width:'50%',
              text:  this.extraDetails.name + " "+ this.extraDetails.wing + "-"+this.extraDetails.flat,
            },
            {
              width:'50%',
              text: [data[0]['month'] ," - " ,data[0]['year']],
            }
          ]
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 'auto'],
            body: [
              [{text:'Details' ,style:'tableHeader'},{text:'Price' ,style:'tableHeader'}],
              ['Type Bill', {text: data[0]['type']}],
              ['Category Bill', {text: data[0]['category'] }],
              ['Water Bill', {text: data[0]['water']}],
              ['Strut. M.', {text: data[0]['struct'] }],
              ['Parking Bill', {text: data[0]['parking'] }],
              ['Society Events', {text: data[0]['event']}],
              ['NOC Filing', {text: data[0]['noc'] }],
              ['Interest Bill', {text: data[0]['interest'] }],
              [{text: 'Total Bill' , style: 'tableHeader'}, {text: data[0]['billsum'],style: 'tableHeader' }],
            ]
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0,15,0,0]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0,15,0,0]
        },
        tableExample: {
          margin: [0, 15, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    }

    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj)
  }
  downloadPDFFile(){
    // if(this.plt.is('cordova')){

    // }
   // else{
      this.pdfObj.download();
    //}
  }

  showToast(message: string){
    this.toastCtrl.create({message: message, duration: 3000, }).then(toastData => toastData.present());
  }
}
