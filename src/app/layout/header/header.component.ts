import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  isUser: boolean;
  name: string;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.isUser = false;
    let currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    if (currentUser) {
      this.isUser = true;
      this.name = currentUser.userName;
    } 
    console.log('header', currentUser);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
