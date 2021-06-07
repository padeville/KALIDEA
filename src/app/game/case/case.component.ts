import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.sass'],
})
export class CaseComponent implements OnInit {
  @Input() color!: string;
  @Output() colorChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  changeColor(): void {
    let newColor = prompt('insert color');
    if (newColor) this.colorChange.emit(newColor);
  }
}
