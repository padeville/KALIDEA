import { Directive, ElementRef } from '@angular/core';
import { User } from '../user/models/user';
import { UserService } from '../user/user.service';

@Directive({
  selector: '[appIfUser]',
})
export class IfUserDirective {
  el!: ElementRef;
  constructor(el: ElementRef, private userService: UserService) {
    this.el = el;

    userService.user$.subscribe((user) => {
      this.update(user);
    });
  }

  protected update(user: User | null): void {
    if (user) this.el.nativeElement.classList.remove('d-none');
    else this.el.nativeElement.classList.add('d-none');
  }
}
