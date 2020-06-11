import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,

    ) {

    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log(this.registerForm.controls);
    this.authenticationService.register(this.f.email.value, this.f.password.value, this.f.password.value, this.f.firstName.value, this.f.lastName.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        // this.router.navigate([this.returnUrl]);
        this.showMsg('Register', data)
        setTimeout(() => {
          this.verifyMsg();
        }, 2100);
        // setTimeout(() => {
        //   this.router.navigate(['/login']);
        // }, 2100);
      },
      error => {
        this.error = error.Message;
        console.log(error);
      });
  }

  showMsg(title, msg): void {
    let timerInterval
    swal.fire({
      title: title,
      html: msg,
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
  verifyMsg() {
    swal.fire({
      title: 'Please submit your code',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      console.log('result', result)
      if(result.value) {
        this.authenticationService.verifyAccount(this.f.email.value, result.value).subscribe(res => console.log('res', res));
      } else {
        this.showMsg('Invalid', 'No code send');
      }
      // if (result.value) {
      //   swal.fire({
      //     title: `${result.value.login}'s avatar`,
      //     imageUrl: result.value.avatar_url
      //   })
      // }
    })
  }

}
