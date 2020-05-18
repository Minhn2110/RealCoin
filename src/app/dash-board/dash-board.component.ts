import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { fakeData, fakeData2 } from './data';
import swal from 'sweetalert2';

declare var paypal;
// declare var swal;
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
  coinData: any;

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  vipAccount = {
    price: 70,
    description: 'Vip Account',
  };


  testprice: any;
  count: number;
  constructor(
    private firestore: AngularFirestore,
  ) {
    const coinRef = firestore.collection("coins");

    console.log(fakeData2);
    // if (fakeData2) {
    //   if (fakeData2.data.length > 0) {
    //     fakeData2.data.forEach(row => {
    //       coinRef.doc(row.name).set(row);
    //     });
    //   }
    // }
  }

  ngOnInit(): void {
    this.count = 0;
    this.get();
    // this.change();
    this.integratePaypal();
  }
  get(): void {
    this.firestore.collection("coins").valueChanges().subscribe(response => {
      if (response) {
        this.count++;
        this.coinData = response;
        console.log('new', this.coinData);
        // Update Status coin
        console.log(this.count);
        if (this.count > 2) {
          this.coinData.forEach((element): any => {
            if (element.priceUsd > element.prevPrice) {
              this.firestore.collection("coins").doc(element.name).update({ check: 'increase' });
            } else {
              this.firestore.collection("coins").doc(element.name).update({ check: 'decrease' });
            }
          });
        }
      }
    });
  }
  change(): void {
    setInterval(() => {
      console.log('run');
      const updateRandom = this.getRndInteger(0, fakeData2.data.length);
      this.firestore.collection("coins").doc(fakeData2.data[updateRandom].name).update({ prevPrice: fakeData2.data[updateRandom].priceUsd })
      this.firestore.collection("coins").doc(fakeData2.data[updateRandom].name).update({ priceUsd: this.getRndInteger(100, 10000) })
    }, 1500)
  }
  integratePaypal(): void {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.vipAccount.description,
                amount: {
                  currency_code: 'USD',
                  value: this.vipAccount.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.showMsg();
          console.log('paypal', order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
  showMsg(): void {
    let timerInterval
    swal.fire({
      title: 'Payment Successful !!!',
      html: 'This message will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        swal.showLoading()
        timerInterval = setInterval(() => {
          const content = swal.getContent();
          if (content) {
            const b = content.querySelector('b');
            if (b) {
              b.textContent = swal.getTimerLeft().toString();
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
