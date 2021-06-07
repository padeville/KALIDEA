import { Directive, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: 'app-form-field input[title]',
})
export class FormFildInputDirective {
  el!: ElementRef;
  controle!: FormGroup;
  constructor(private _el: ElementRef) {
    _el.nativeElement.classList.add('form-control', 'rounded-right');
    this.el = _el;
  }
}
