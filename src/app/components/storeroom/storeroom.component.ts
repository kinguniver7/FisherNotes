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

@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.component.html',
  styleUrls: ['./storeroom.component.scss']
})
export class StoreroomComponent implements OnInit {
  rods: Rod[];
  data: any;

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
    private userService: UserService,
    public rodService: RodService,
    private route: ActivatedRoute,
    private loaderService: LoaderService) {

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
    this.loaderService.show();
    this.rodService.getAllRods(this.userApp.id).subscribe(data => {
      this.rods = data;
      this.loaderService.hide();
    }, () => {this.loaderService.hide(); });
  }
}
