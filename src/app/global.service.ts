import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

const { Storage } = Plugins;

export async function set(key: string, value: any): Promise<void> {
  await Storage.set({
    key: key,
    value: JSON.stringify(value)
  });
}

export async function get(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}

export async function remove(key: string): Promise<void> {
  await Storage.remove({
    key: key
  });
}

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  public static userId;
  complaintRef: AngularFireObject<any>;

  
//   constructor(name, state, country) {
//     this.name = name;
//     this.state = state;
//     this.country = country;
//   }
//   toString() {
//     return this.name + ", " + this.state + ", " + this.country;
//   }
// }

// Firestore data converter
// var cityConverter = {
//   toFirestore: function (city) {
//     return {
//       name: city.name,
//       state: city.state,
//       country: city.country,
//     };
//   },
//   fromFirestore: function (snapshot, options) {
//     const data = snapshot.data(options);
//     return new City(data.name, data.state, data.country);
//   },



};
