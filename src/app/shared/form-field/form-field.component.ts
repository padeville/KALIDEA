import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormFildInputDirective } from '../form-fild-input.directive';
import { FormFieldInputDirective } from './form-field-input.directive';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.sass'],
})
export class FormFieldComponent implements OnInit {
  @ViewChildren (FormFildInputDirective) formFieldDirective!: FormFildInputDirective;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.formFieldDirective)
    this.formFieldDirective
  }
}
