import { Component, OnInit } from '@angular/core';
import { SpinningService } from 'src/app/services/spinning.service';
import { SelectItem } from 'src/app/core/interfaces/select-item';
import { Thing } from 'src/app/core/interfaces/fishing_tackle/thing';
import { FishingType } from 'src/app/core/interfaces/catching-type';
import { ActivatedRoute } from '@angular/router';
import { Observable, zip, forkJoin } from 'rxjs';
import { Rod } from 'src/app/core/interfaces/fishing_tackle/rod';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RodService } from 'src/app/services/rod.service';
import { UserService } from 'src/app/services/user.service';
import { UserApp } from 'src/app/core/interfaces/user-app';
import { Reel } from 'src/app/core/interfaces/fishing_tackle/reel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReelService } from 'src/app/services/reel.service';
import { WobblerService } from 'src/app/services/wobbler.service';
import { Wobbler } from 'src/app/core/interfaces/fishing_tackle/spinning/wobbler';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBaitComponent } from './add/dialog-add-bait/dialog-add-bait.component';
import { Bait } from 'src/app/core/interfaces/fishing_tackle/bait';
import { BaitService } from 'src/app/services/bait.service';
import { ThingType } from 'src/app/core/enums/thing-type';
import { TranslateService } from '@ngx-translate/core';

import {MatChipInputEvent} from '@angular/material/chips';
import { ThingDetail } from 'src/app/core/models/thing-detail.model';


@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.component.html',
  styleUrls: ['./storeroom.component.scss']
})
export class StoreroomComponent implements OnInit {
  get fltGroupsSelectedText() {
    return this.fltGroups.find(c => c.value === this.fltGroupsSelected).text;
  }
  constructor(
    userService: UserService,
    private translate: TranslateService,

    public rodService: RodService,
    public reelService: ReelService,
    public wobblerService: WobblerService,
    public baitService: BaitService,

    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) {

      this.userApp = userService.getCurrentUser();

      this.route.queryParams.subscribe(params => {
        if (params.catchingType && params.catchingType as FishingType) {
          this.fltCatchingType = params.catchingType;
        } else {
          this.fltCatchingType = FishingType.All as number;
        }
      });
   }
  rods: Rod[];
  reels: Reel[];
  //wobblers: Wobbler[];
  baits: Thing[];
  data: any;
  // SPINNERS
  ID_SPINNER_RODS = 'spinnerRods';
  ID_SPINNER_REELS = 'spinnerReels';
  ID_SPINNER_BAITS = 'spinnerBaits';

  userApp: UserApp;

  filterPanelOpenState = false;
  fltGroups: SelectItem[] = [
    {value: 'all', text: 'All'},
    {value: ThingType.Rod.toString(), text: this.translate.instant('ROD.TITLE')},
    {value: ThingType.Reel.toString(), text: this.translate.instant('REEL.TITLE')},
    {value: ThingType.Bait.toString(), text: this.translate.instant('BAIT.TITLE')}
  ];
  fltGroupsSelected = this.fltGroups[0].value;

  paramCatchingType: Observable<FishingType>;
  fltCatchingType: FishingType;
  thingType = ThingType;

  allThinks: Thing[] = [];

  ngOnInit() {
    this.runSpinners();
    // load rods
    this.rodService.getAllRods(this.userApp.id).subscribe(data => {
      this.rods = data;
      this.spinner.hide(this.ID_SPINNER_RODS);
    }, () => {
      this.spinner.hide(this.ID_SPINNER_RODS);
    });

    // load reels
    this.reelService.getAll(this.userApp.id).subscribe(data => {
      this.reels = data;
      this.spinner.hide(this.ID_SPINNER_REELS);
    }, () => {
      this.spinner.hide(this.ID_SPINNER_REELS);
    });
    // load wobblers
    zip(this.wobblerService.getAll(this.userApp.id), this.baitService.getAll(this.userApp.id)).subscribe((data) => {
      data.forEach(el => {
        const item = el as undefined as Thing[];
        if (this.baits === null || !this.baits) {
          this.baits = item;
        } else {
          this.baits = this.baits.concat(item);
        }
      });
      this.spinner.hide(this.ID_SPINNER_BAITS);
    });
  }
  runSpinners() {
    this.spinner.show(this.ID_SPINNER_RODS).finally(() => {
      this.spinner.show(this.ID_SPINNER_REELS);
      this.spinner.show(this.ID_SPINNER_BAITS);
    });
  }

  openDialogAddBait() {
    this.dialog.open(DialogAddBaitComponent, {
      width: '240px'
    });
  }
  // FILTERS EVENTS
  cleareGroup(): void {
    this.fltGroupsSelected = this.fltGroups[0].value;
  }

  ConevrtThingToDetail(item: any) {
    // tslint:disable:max-line-length
    const thingDetailModel = item as ThingDetail;
    if (item.type === ThingType.Rod) {
      thingDetailModel.specifications = [
        {title: this.translate.instant('THING.FORM.FISHINGTYPE_PLACEHOLDER'), value: item.fishingType},
        {title: this.translate.instant('THING.FORM.WEIGHT_PLACEHOLDER'), value: item.weightG},
        {title: this.translate.instant('ROD.FORM.TESTOFBAIT_PLACEHOLDER'), value: item.testOfBaitG},
        {title: this.translate.instant('ROD.FORM.TESTOFFISHINGLINE_PLACEHOLDER'), value: item.testOfFishingLineLb},
        {title: this.translate.instant('ROD.FORM.SECTIONS_PLACEHOLDER'), value: item.sections},
        {title: this.translate.instant('ROD.FORM.FORMATIONTYPE_PLACEHOLDER'), value: item.formationType}
      ];
      return thingDetailModel;
    }
    if (item.type === ThingType.Reel) {
      thingDetailModel.specifications = [{title: this.translate.instant('THING.FORM.WEIGHT_PLACEHOLDER'), value: item.weightG}];
      return thingDetailModel;
    }
    if (item.type === ThingType.Wobbler) {
      return thingDetailModel;
    }
    if (item.type === ThingType.Bait) {
      return thingDetailModel;
    }
    return thingDetailModel;

  }
}
