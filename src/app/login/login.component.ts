import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      alert('invalid');
      return;
    } else {
      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            // this.router.navigate([this.returnUrl]);
            this.router.navigate(['/dashboard']);
          },
          error => {
            console.log(error);
            this.error = error.error_description;
            this.loading = false;
          });
    }
  }

}
