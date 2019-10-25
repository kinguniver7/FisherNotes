import { Component, OnInit } from '@angular/core';
import { SpinningService } from 'src/app/services/spinning.service';
import { SelectItem } from 'src/app/core/interfaces/select-item';
import { Thing } from 'src/app/core/interfaces/fishing_tackle/thing';
import { CatchingType } from 'src/app/core/interfaces/catching-type';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Rod } from 'src/app/core/interfaces/fishing_tackle/rod';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RodService } from 'src/app/services/rod.service';
import { UserService } from 'src/app/services/user.service';
import { UserApp } from 'src/app/core/interfaces/user-app';
import { Reel } from 'src/app/core/interfaces/fishing_tackle/reel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReelService } from 'src/app/services/reel.service';
import { WobblerService } from 'src/app/services/wobbler.service';
import { Wobbler } from 'src/app/core/interfaces/fishing_tackle/spining/wobbler';

@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.component.html',
  styleUrls: ['./storeroom.component.scss']
})
export class StoreroomComponent implements OnInit {
  rods: Rod[];
  reels: Reel[];
  wobblers: Wobbler[];
  data: any;
  // SPINNERS
  ID_SPINNER_RODS = 'spinnerRods';
  ID_SPINNER_REELS = 'spinnerReels';
  ID_SPINNER_WOBBLERS = 'spinnerWobblers';

  userApp: UserApp;

  filterPanelOpenState = false;
  fltGroups: SelectItem[] = [
    {value: '-1', text: 'All'},
    {value: 'rod', text: 'Rod'},
    {value: 'reel', text: 'Reel'},
    {value: 'wobbler', text: 'Wobbler'}
  ];
  fltGroupsSelected = this.fltGroups[0].value;

  paramCatchingType: Observable<CatchingType>;
  fltCatchingType: CatchingType;

  allThinks: Thing[] = [];
  constructor(
    userService: UserService,

    public rodService: RodService,
    public reelService: ReelService,
    public wobblerService: WobblerService,

    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.userApp = userService.getCurrentUser();

      this.route.queryParams.subscribe(params => {
        if (params.catchingType && params.catchingType as CatchingType) {
          this.fltCatchingType = params.catchingType;
        } else {
          this.fltCatchingType = CatchingType.All as number;
        }
      });
   }

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
    this.wobblerService.getAll(this.userApp.id).subscribe(data => {
      this.wobblers = data;
      this.spinner.hide(this.ID_SPINNER_WOBBLERS);
    }, () => {
      this.spinner.hide(this.ID_SPINNER_WOBBLERS);
    });
  }
  runSpinners() {
    this.spinner.show(this.ID_SPINNER_RODS).finally(() => {
      this.spinner.show(this.ID_SPINNER_REELS);
      this.spinner.show(this.ID_SPINNER_WOBBLERS);
    });
  }
}
