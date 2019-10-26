import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/core/interfaces/select-item';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-add-bait',
  templateUrl: './dialog-add-bait.component.html',
  styleUrls: ['./dialog-add-bait.component.scss']
})
export class DialogAddBaitComponent implements OnInit {

  VAL_BAIT = 'bait';
  VAL_WOBBLER = 'wobbler';

  favoriteBait: string = this.VAL_BAIT;
  typesBait: SelectItem[] = [
    {value: this.VAL_BAIT, text: this.translate.instant('BAIT.TITLE')},
    {value: this.VAL_WOBBLER, text: this.translate.instant('WOBBLER.TITLE')}
  ];
  constructor(private route: Router,  private translate: TranslateService) { }

  ngOnInit() {
  }

  navigateToAddBait() {
    this.route.navigate(['/storeroom/add-' + this.VAL_BAIT]);
    /* if (this.favoriteBait === this.VAL_BAIT) {
      this.route.navigate(['/storeroom/add-bait']);
    } else if (this.favoriteBait === this.VAL_WOBBLER) {
      this.route.navigate(['/storeroom/add-wobbler']);
    } */
  }

}
