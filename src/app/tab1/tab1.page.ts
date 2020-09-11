import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService } from '../global.service';
// import { database } from 'firebase';
// import { UserDetails } from '../models/userDetails.model';
// import { mapToMapExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  userDetails: any;
  sum: number;
  bills: any;
  items: any;
  result: JSON;
  allData: any;
   comments= [];
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

  ionViewWillEnter(){}

  async getUserDetails(){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    try{
  
      GlobalService.userId = await get("userId");
      console.log("Global "+  GlobalService.userId);
      // this.fireStore.firestore.collection('comments').doc('').get().then(snapshot => {
      //   snapshot.docs.forEach(doc => {
      //     const comment = doc.data()
      //     comment.userRef.get().then(snap => {
      //       comment.user = snap.data()
      //       this.comments.push(comment)
      //     })
      //   })
      // })

      this.fireStore.firestore.collection("bills").doc("HhBYfdGHu0rlFLBEEBTm").get()
      .then(doc=>{
        this.sum = doc.data()["type"] + doc.data()["category"] + doc.data()["water"] + doc.data()["structure"] + doc.data()["complaint"] + doc.data()["parking"] + doc.data()["noc"] + doc.data()["event"] + doc.data()["interest"]
        this.bills =  [doc.data()].map(e => {
          return{
            type: e["type"],
            category : e["category"],
            water : e["water"],
            struct: e["structure"],
            parking : e["parking"],
            complaint : e["complaint"],
            noc : e["noc"],
            interest : e["interest"],
            sname : e["name"],
            event : e["event"],
            billsum : this.sum,
          }
        });
        //let sum = this.bills.reduce((acc, cur) => acc + cur, 0);
        console.log("Soluchan : "+this.sum);
        });

      this.fireStore.firestore.collection("userDetails").doc(GlobalService.userId).get()
      .then(doc=>{
        console.log("Document data:", doc.data()["societyName"]);
        // const comment = doc.data();   // get data in result variable
        // this.items = JSON.stringify(comment); // then convert data to json string
        // console.log("Items "+this.items); 
        // this.allData = JSON.parse(this.items); // parse json data and pass json string
        // console.log("all data "+this.allData["isCommercial"]); // got result of particular string
        //map(data=>{});
        this.userDetails =  [doc.data()].map(e => {
          return{
            name: e["name"],
            sname: e["societyName"],
            parking: e["parkingVehicles"],
          }
        });
        // console.log("Outside :",this.userDetails.sname);
        // console.log("Outside :",this.userDetails.sname);
        // this.userDetails.sname = JSON.stringify(doc.data()["isCommercial"]);
        //  console.log("Outside :",this.userDetails.sname); // got result of particular string
        // this.userDetails.name = this.allData["name"];
        // this.userDetails.parking = this.allData["parkingVehicles"];
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
    catch(e){
      this.showToast(e);
    }
    
  }
  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }
}
