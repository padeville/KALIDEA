import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

interface Table {
  rows: number;
  cols: number;
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass'],
})
export class NewComponent implements OnInit {
  tableForm!: FormGroup;
  table: Array<Array<string>> = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  minVal(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let val: number = control.value;
      return val > min ? { number: true } : null;
    };
  }

  ngOnInit(): void {
    this.tableForm = new FormGroup({
      rows: new FormControl(3, [Validators.required, this.minVal(1)]),
      cols: new FormControl(6, [Validators.required, this.minVal(1)]),
    });

    this.tableForm.valueChanges.subscribe((val: Table) => {
      this.drawGrid(val);
    });
  }

  drawGrid(val: Table): void {
    this.table = [];

    for (let i = 0; i < val.rows; i++ ) {
      this.table.push([])
      for (let j = 0; j < val.cols; j++) {
        this.table[i].push('')
      }
    }
    this.changeDetectorRef.detectChanges()
  }

  get rows() {
    return this.tableForm.get('rows')!;
  }
  get cols() {
    return this.tableForm.get('cols')!;
  }
}
