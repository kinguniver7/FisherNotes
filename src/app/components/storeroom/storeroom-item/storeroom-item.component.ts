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


@Component({
  selector: 'app-storeroom-item',
  templateUrl: './storeroom-item.component.html',
  styleUrls: ['./storeroom-item.component.scss']
})
export class StoreroomItemComponent implements OnInit {
  @Input() thing: any = {};
  dialogWidth: '640px';
  constructor(public dialog: MatDialog,
              private rodService: RodService,
              private loaderService: LoaderService,
              private translate: TranslateService) { }

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
          this.rodService.removeRod(this.thing.id).then(()=>{
            this.loaderService.hide();
          }).catch(() => {this.loaderService.hide(); });
         };
        break;
      case ThingType.Reel:
          removeThingHandler = () => {console.log('Remove reel'); };
          break;
      case ThingType.Wobbler:
          removeThingHandler = () => {console.log('Remove wobbler'); };
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
