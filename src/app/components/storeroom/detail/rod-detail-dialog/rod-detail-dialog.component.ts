import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Thing } from 'src/app/core/interfaces/fishing_tackle/thing';

@Component({
  selector: 'app-rod-detail-dialog',
  templateUrl: './rod-detail-dialog.component.html',
  styleUrls: ['./rod-detail-dialog.component.scss']
})
export class RodDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Thing) { debugger; }

  ngOnInit() {
  }

}
