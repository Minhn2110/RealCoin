import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import {fakeData} from './data';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  places$: any;
  firestorePlacesCollection: any;
  items: any;
  title: any;
  previousData: any;
  data: any;

  testprice: any;
  constructor(
    private firestore: AngularFirestore,
  ) {
    // this.items = firestore.collection('/coins').snapshotChanges().subscribe(data => console.log(data));

    var citiesRef = firestore.collection("cities");

    // citiesRef.doc("Bitcoin").set(fakeData);


    // var docRef = this.firestore.collection("cities").doc("SF");
    var docRef = this.firestore.collection("cities");



    // docRef.get().toPromise().then(function (doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });

    // console.log('asd', firestore.collection("cities").doc("SF").valueChanges().subscribe(data => console.log(data)))
    // console.log('asd', firestore.collection("cities").valueChanges().subscribe(data => console.log(data)))

    // firestore.collection("cities").doc("SF").snapshotChanges().subscribe((data) => console.log(data));
  }
  check: boolean;

  ngOnInit(): void {
    this.get();
    this.change();
    this.check = false;

    // console.log('a', this.items);
    // this.firestorePlacesCollection  = this.db.collection('testsmartfund');
    // console.log('db', this.db.('testsmartfund'));
    //   this.places$ = this.firestorePlacesCollection.snapshotChanges().pipe(
    //    map(actions => {
    //      console.log(actions);
    //     // return actions.map(p => {
    //     //   const place = p.payload.doc;
    //     //   const id = place.id;
    //     //   return { id, ...place.data() } as Place;
    //     // });
    //   })
    // );
  }
  get(): void {
    this.firestore.collection("cities").doc('Bitcoin').valueChanges().subscribe(response => {
      if(response) {
        this.previousData = JSON.parse(JSON.stringify(response));
        console.log('prev', this.previousData);
        this.data = response;
        console.log('new', this.data);
        this.testprice = this.data.priceUsd;
        console.log(this.testprice);
        if (this.data.priceUsd > this.data.prevPrice) {
          this.check = true;
        } else {
          this.check = false;
        }
      }
    })
  }
  change(): void {
    setInterval(() => {
      console.log('run');
      // this.firestore.collection("cities").doc('Bitcoin').update({prevPrice: this.testprice})
      // this.firestore.collection("cities").doc('Bitcoin').update({priceUsd: this.getRndInteger(9000, 10000)})
    }, 2500)
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

}
