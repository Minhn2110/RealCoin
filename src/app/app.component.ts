import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Coin-dashboard';
  headerFooter: any;
  constructor(private router: Router,) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.headerFooter = (event.url == '/login' || event.url == '/register' || event.url == '**');
      }
    });
  }
}
