import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FishingType } from 'src/app/core/interfaces/catching-type';
import { Rod, RodFormationType } from 'src/app/core/interfaces/fishing_tackle/rod';

@Component({
  selector: 'app-rod-detail-dialog',
  templateUrl: './rod-detail-dialog.component.html',
  styleUrls: ['./rod-detail-dialog.component.scss']
})
export class RodDetailDialogComponent implements OnInit {
  catchingType: any = FishingType[this.data.fishingType];
  formationType: any = RodFormationType[this.data.formationType];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Rod) {  }

  ngOnInit() {
  }

}
