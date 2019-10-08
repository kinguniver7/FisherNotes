import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Reel } from 'src/app/core/interfaces/fishing_tackle/reel';

@Component({
  selector: 'app-reel-detail-dialog',
  templateUrl: './reel-detail-dialog.component.html',
  styleUrls: ['./reel-detail-dialog.component.scss']
})
export class ReelDetailDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReelDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Reel) { }

  ngOnInit() {
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }

}
