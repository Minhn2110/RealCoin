import { Component, OnInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { fakeData, fakeData2 } from './data';
import swal from 'sweetalert2';
import { DashboardService } from '../_services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var paypal;
// declare var swal;
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  coinData: any;
  coinDataNew: any;

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  vipAccount = {
    price: 70,
    description: 'Vip Account',
  };


  count: number;
  countSingle: number;
  bch: any;
  isBchUpdate: boolean;

  coinsDoc: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private firestore: AngularFirestore,
  ) {
    const coinRef = firestore.collection("coins");

    // console.log(fakeData2);
    // if (fakeData2) {
    //   if (fakeData2.data.length > 0) {
    //     fakeData2.data.forEach(row => {
    //       coinRef.doc(row.name).set(row);
    //     });
    //   }
    // }
  }

  ngOnInit(): void {
    this.testApi();
    this.count = 0;
    this.countSingle = 0;
    this.get();
    // this.change();
    this.integratePaypal();
    this.getCoinDocs();

    this.getDataEachCoin('BCH', this.bch, this.isBchUpdate);
  }
  async getCoinDocs() {
    const events = await this.firestore.collection('Coins')
    events.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // this.coinsDoc.push({ id: doc.id, ...doc.data() })
        this.coinsDoc.push(doc.id)
      })
      console.log('bbb', this.coinsDoc)
    })
  }
  createDynamicVariable() {

  }
  getDataEachCoin(coinsDoc, coinName, coinFlag) {
    this.firestore.collection("Coins").doc(coinsDoc).valueChanges().subscribe(data => {
      coinName = data;
      // console.log('bch', this.bch);
      this.countSingle++;
      if (this.countSingle >= 2) {
        coinFlag = true;
        setTimeout(() => {
          coinFlag = false;
        }, 600);
        // console.log('bch', bch);
      }
    })
  }
  get(): void {
    this.firestore.collection("CoinCap").valueChanges().subscribe((response): any => {
      this.coinDataNew = response;
      // console.log('new res', response);
      // console.log("old data", this.coinData);
      if (this.coinData && this.coinData.length > 0) {
        this.coinDataNew.forEach(elementNew => {
          this.coinData.forEach(elementOld => {
            if (elementNew.Symbol === elementOld.Symbol) {
              if (elementNew.Price !== elementOld.Price) {
                elementOld.isActive = true;
                setTimeout(() => {
                  elementOld.isActive = false;
                }, 600);
                console.log('a');
              }
              if (elementNew.Price > elementOld.Price) {
                elementOld.check = true;
              }
            }
          });
        });
      }

      if (response) {
        this.count++;
        setTimeout(() => {
          this.coinData = response;
        }, 400);
        // this.removeClassActive();
        // Update Status coin
        console.log(this.count);
        // if (this.count > 2) {
        //   this.coinData.forEach((element): any => {
        //     if (element.priceUsd > element.prevPrice) {
        //       this.firestore.collection("coins").doc(element.name).update({ check: 'increase' });
        //     } else {
        //       this.firestore.collection("coins").doc(element.name).update({ check: 'decrease' });
        //     }
        //   });
        // }
        // this.coinData.forEach((element): any => {
        //   if (element.Price > element.HighPrice) {
        //     this.firestore.collection("coins").doc(element.name).update({ check: 'increase' });
        //   } else {
        //     this.firestore.collection("coins").doc(element.name).update({ check: 'decrease' });
        //   }
        // });
      }
    });
  }
  removeClassActive() {
    this.coinData.forEach(e => {
      e.isActive = false;
    })
  }
  change(): void {
    setInterval(() => {
      console.log('run');
      const updateRandom = this.getRndInteger(0, fakeData2.data.length);
      this.firestore.collection("coins").doc(fakeData2.data[updateRandom].name).update({ prevPrice: fakeData2.data[updateRandom].priceUsd })
      this.firestore.collection("coins").doc(fakeData2.data[updateRandom].name).update({ priceUsd: this.getRndInteger(100, 10000) })
    }, 500)
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
  testApi() {
    this.dashboardService.getMemberHousehold(1).subscribe(data => console.log(data));
  }
  changeData(e) {
    console.log(e);
  }

}
