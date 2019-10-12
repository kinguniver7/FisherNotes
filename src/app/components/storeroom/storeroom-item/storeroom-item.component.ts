import { Component, OnInit, Input } from '@angular/core';
import { Thing } from 'src/app/core/interfaces/fishing_tackle/thing';
import { MatDialog } from '@angular/material/dialog';
import { ThingType } from 'src/app/core/enums/thing-type';
import { RodDetailDialogComponent } from '../detail/rod-detail-dialog/rod-detail-dialog.component';
import { ReelDetailDialogComponent } from '../detail/reel-detail-dialog/reel-detail-dialog.component';
import { WobblerDetailDialogComponent } from '../detail/wobbler-detail-dialog/wobbler-detail-dialog.component';


@Component({
  selector: 'app-storeroom-item',
  templateUrl: './storeroom-item.component.html',
  styleUrls: ['./storeroom-item.component.scss']
})
export class StoreroomItemComponent implements OnInit {
  @Input() thing: any = {};
  dialogWidth: '400px';
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDetailsDialog(): void {
    // TODO:REMOVE
    switch (this.thing.type) {
      case ThingType.Rod:
          this.dialog.open(RodDetailDialogComponent, {
            width: this.dialogWidth,
            data: this.thing
          });
          break;
      case ThingType.Reel:
          this.dialog.open(ReelDetailDialogComponent, {
            width: this.dialogWidth,
            data: this.thing
          });
          break;
      case ThingType.Wobbler:
          this.dialog.open(WobblerDetailDialogComponent, {
            width: this.dialogWidth,
            data: this.thing
          });
          break;
      default:
        break;
    }

  }

}
