import { Component, OnInit } from '@angular/core';
import { SpiningService } from 'src/app/services/spining.service';
import { SelectItem } from 'src/app/core/interfaces/select-item';
import { Thing } from 'src/app/core/interfaces/fishing_tackle/thing';
import { CatchingType } from 'src/app/core/interfaces/catching-type';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.component.html',
  styleUrls: ['./storeroom.component.scss']
})
export class StoreroomComponent implements OnInit {
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
  constructor(private spiningService: SpiningService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params.catchingType && params.catchingType as CatchingType) {
        this.fltCatchingType = params.catchingType;
      } else {
        this.fltCatchingType = CatchingType.All as number;
      }
    });
   }

  ngOnInit() {

    this.spiningService.getAllRods().subscribe(data => {
      //debugger; 
    });
  }

}
