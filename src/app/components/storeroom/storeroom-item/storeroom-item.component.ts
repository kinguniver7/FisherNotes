import { Component, OnInit, Input } from '@angular/core';
import { Thing } from 'src/app/core/interfaces/fishing_tackle/thing';
import { MatDialog } from '@angular/material/dialog';
import { ThingType } from 'src/app/core/enums/thing-type';
import { RodDetailDialogComponent } from '../detail/rod-detail-dialog/rod-detail-dialog.component';
import { ReelDetailDialogComponent } from '../detail/reel-detail-dialog/reel-detail-dialog.component';
import { WobblerDetailDialogComponent } from '../detail/wobbler-detail-dialog/wobbler-detail-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { RodService } from 'src/app/services/rod.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ReelService } from 'src/app/services/reel.service';
import { WobblerService } from 'src/app/services/wobbler.service';
import { ThingDetailDialogComponent } from '../detail/thing-detail-dialog.component';
import { ThingDetail } from 'src/app/core/models/thing-detail.model';


@Component({
  selector: 'app-storeroom-item',
  templateUrl: './storeroom-item.component.html',
  styleUrls: ['./storeroom-item.component.scss']
})
export class StoreroomItemComponent implements OnInit {
  @Input() thing: any = {};
  dialogWidth: '340px';
  type = ThingType;
  constructor(public dialog: MatDialog,
              private rodService: RodService,
              private reelService: ReelService,
              private wobblerService: WobblerService,
              private loaderService: LoaderService,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  openDetailsDialog(): void {
    const opt = {
      width: this.dialogWidth,
      data: this.thing,
      maxHeight: '90vh'
    }
    this.dialog.open(ThingDetailDialogComponent, opt);
    return;
    // TODO:REMOVE
    switch (this.thing.type) {
      case ThingType.Rod:
          this.dialog.open(RodDetailDialogComponent, opt);
          break;
      case ThingType.Reel:
          this.dialog.open(ThingDetailDialogComponent, opt);
          break;
      case ThingType.Wobbler:
          this.dialog.open(WobblerDetailDialogComponent, opt);
          break;
      default:
        break;
    }

  }
/**
 * Відкрити вікно для видалення речі.
 * Вішаємо подію на кнопку видалення
 */
  openRemoveItemDialog(): void {
    let removeThingHandler: any;
    
    switch (this.thing.type) {
      case ThingType.Rod:
        removeThingHandler = () => {
          this.loaderService.show();
          this.rodService.removeRod(this.thing.id).then(() => {
            this.loaderService.hide();
          }).catch(() => {this.loaderService.hide(); });
        };
        break;
      case ThingType.Reel:
        removeThingHandler = () => {
          this.loaderService.show();
          this.reelService.remove(this.thing.id).then(() => {
            this.loaderService.hide();
          }).catch(() => {this.loaderService.hide(); });
        };
        break;
      case ThingType.Wobbler:
        removeThingHandler = () => {
          this.loaderService.show();
          this.wobblerService.remove(this.thing.id).then(() => {
            this.loaderService.hide();
          }).catch(() => {this.loaderService.hide(); });
        };
        break;
      default:
          removeThingHandler += () => {console.log('Remove default'); };
          break;
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.translate.instant('GENERAL.CONFIRM_DELETE'),
        okHandler: removeThingHandler
      }
    });
  }


}
