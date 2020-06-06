import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,

    ) {

    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    alert('a');
    console.log(this.registerForm.controls);
    this.authenticationService.register(this.f.email.value, this.f.password.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        // this.router.navigate([this.returnUrl]);
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      });
  }

}
