import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  profileForm!: FormGroup;
  userObserbable!: Subscription;
  loading: boolean = false;

  credentialError = false;
  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
  onSubmit() {
    this.loading = true;

    this.userObserbable = this.userService
      .login(this.profileForm.value)
      .pipe(
        finalize(() => (this.loading = false)),
        catchError((err) => {
          this.credentialError = true;
          console.log('Handling error locally and rethrowing it...', err);
          return of(null);
        })
      )
      .subscribe((user) => {
        if (user !== null) {
          this.router.navigate(['']);
        }
      });
  }

  get email() {
    return this.profileForm.get('email')!;
  }
  get password() {
    return this.profileForm.get('password')!;
  }

  ngOnDestroy(): void {
    this.userObserbable?.unsubscribe();
  }
}
