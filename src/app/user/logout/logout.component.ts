import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass'],
})
export class LogoutComponent implements OnInit {
  userObserbable!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.userObserbable = this.userService
      .logout()
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return of(null);
        })
      )
      .subscribe((sucess) => {
        if (sucess) {
          this.router.navigate(['']);
        }
      });
  }

  ngOnDestroy(): void {
    this.userObserbable?.unsubscribe();
  }
}
