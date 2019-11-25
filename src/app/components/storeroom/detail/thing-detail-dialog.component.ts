import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FishingType } from 'src/app/core/interfaces/catching-type';
import { RodFormationType } from 'src/app/core/interfaces/fishing_tackle/rod';
import { ThingDetail } from 'src/app/core/models/thing-detail.model';
import { ThingType } from 'src/app/core/enums/thing-type';

@Component({
  selector: 'app-thing-detail-dialog',
  templateUrl: './thing-detail-dialog.component.html',
  styleUrls: ['./thing-detail-dialog.component.scss']
})
export class ThingDetailDialogComponent implements OnInit {
  catchingType: any = FishingType[this.data.fishingType];

  get editRoute() {
    if (this.data.type === ThingType.Rod) {
      return '/storeroom/edit-rod';
    }
    if (this.data.type === ThingType.Reel) {
      return '/storeroom/edit-reel';
    }
    if (this.data.type === ThingType.Wobbler) {
      return '/storeroom/edit-wobbler';
    }
    if (this.data.type === ThingType.Bait) {
      return '/storeroom/edit-wobbler';
    }
    return '';
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: ThingDetail) {  }

  ngOnInit() {
  }



}
