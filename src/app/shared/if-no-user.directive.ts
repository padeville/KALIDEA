import { Directive } from '@angular/core';
import { User } from '../user/models/user';
import { IfUserDirective } from './if-user.directive';

@Directive({
  selector: '[appIfNoUser]'
})
export class IfNoUserDirective extends IfUserDirective {

  protected update(user: User | null): void {
    if (user) this.el.nativeElement.classList.add('d-none');
    else this.el.nativeElement.classList.remove('d-none');
  }
}
