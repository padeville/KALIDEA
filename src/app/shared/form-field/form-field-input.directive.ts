import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'app-form-field input[title]',
})
export class FormFieldInputDirective {
  constructor(el: ElementRef) {
    el.nativeElement.classList.add(['form-control', 'rounded-right']);
  }
}
