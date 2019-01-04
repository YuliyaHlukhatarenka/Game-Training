import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'selection-value-dialog',
  templateUrl: 'selection-value-dialog.component.html',
  styleUrls: ['selection-value-dialog.component.css']
})
export class SelectionValueDialogComponent {
  public selectedValue = 0;

  public constructor(
    public dialogRef: MatDialogRef<SelectionValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public openOkClick(): void {
    this.dialogRef.close(this.selectedValue);
  }

  public onChangeValue(selectionValue: any): void {
    this.selectedValue = this.data[selectionValue.target.value].value;
  }
}
