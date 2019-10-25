import { Component, OnInit, Inject } from '@angular/core';
import { UserApp } from 'src/app/core/interfaces/user-app';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { WobblerService } from 'src/app/services/wobbler.service';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Wobbler, WobblerFloatType } from 'src/app/core/interfaces/fishing_tackle/spining/wobbler';
import { ThingType } from 'src/app/core/enums/thing-type';
import { LengthType } from 'src/app/core/enums/length-type';

@Component({
  selector: 'app-wobbler-add-or-edit',
  templateUrl: './wobbler-add-or-edit.component.html',
  styleUrls: ['./wobbler-add-or-edit.component.scss']
})
export class WobblerAddOrEditComponent implements OnInit {

  id: any;
  userApp: UserApp;
  mainForm: FormGroup;

  wobblerFloatType = WobblerFloatType;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private wobblerService: WobblerService,
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) public data: any,
    private route: Router,
    private spinner: NgxSpinnerService,
    activateRoute: ActivatedRoute
  ) {
      this.userApp = this.userService.getCurrentUser();
      this.createForm();
      this.id = activateRoute.snapshot.params.id;
      if (this.id) {
        this.spinner.show();
        this.wobblerService.getById(this.id).subscribe(rod => {
          this.createForm(rod);

          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
        });
      }
  }

  ngOnInit() {
  }

  createForm(wobbler?: Wobbler) {
    if (wobbler) {
      this.mainForm = this.fb.group({
        name: [wobbler.name, Validators.required],
        description: [wobbler.description],
        imageUrl: [wobbler.imageUrl],
        price: [wobbler.price],
        weightG: [wobbler.weightG],

        length: [wobbler.length],
        divesFrom: [wobbler.divesFrom],
        divesTo: [wobbler.divesTo],
        floatType: [wobbler.floatType.toString()]
        // catchingType: [reel.catchingType.toString()]
      });
    } else {
      this.mainForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        imageUrl: [''],
        price: [''],
        weightG: [''],

        length: [''],
        divesFrom: [''],
        divesTo: [''],
        floatType: ['']
      });
    }
  }

  onSubmitForm() {
    if (this.mainForm.valid) {
      this.spinner.show();
      const formModel = this.mainForm.value;
      const entityModel: Wobbler = {
        userId: this.userApp.id,
        name: formModel.name as string,
        description: formModel.description as string,
        imageUrl: formModel.imageUrl as string,
        price: formModel.price as number,
        weightG: formModel.weightG as number,
        type: ThingType.Reel,
        length: formModel.length as number,
        lengthType: LengthType.mm,
        divesFrom: formModel.divesFrom as number,
        divesTo: formModel.divesTo as number,
        floatType: +formModel.floatType
        // catchingType: +formModel.catchingType
      };

      if (this.id) {
        entityModel.id = this.id;
        this.wobblerService.update(entityModel).then(() => {
          this.spinner.hide();
          this.snackBar.open(
            this.translate.instant('MESSAGE.UPDATED'),
            this.translate.instant('MESSAGE.TITLE')).afterDismissed().subscribe(() => {
            this.route.navigate(['/storeroom']);
          });
        }).catch(() => {this.spinner.hide(); });
      } else {
        this.wobblerService.add(entityModel).then(() => {
          this.spinner.hide();
          this.snackBar.open(
            this.translate.instant('MESSAGE.ADDED'),
            this.translate.instant('MESSAGE.TITLE')).afterDismissed().subscribe(() => {
            this.route.navigate(['/storeroom']);
          });
        }).catch(() => {this.spinner.hide(); });
      }
    } else {
      // show messsage
      this.snackBar.open(
        this.translate.instant('ERROR.FORM_NOT_VALIDATE'),
        this.translate.instant('ERROR.TITLE'));
    }
  }

}
