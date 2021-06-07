import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[toto]',
})
export class FormFieldInputDirective {
  constructor(el: ElementRef) {
    console.log('el', el)
    el.nativeElement.classList.add(['form-control', 'rounded-right']);
  }
}
