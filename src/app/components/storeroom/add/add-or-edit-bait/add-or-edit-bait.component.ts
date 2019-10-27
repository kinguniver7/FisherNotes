import { Component, OnInit, Inject } from '@angular/core';
import { UserApp } from 'src/app/core/interfaces/user-app';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaitService } from 'src/app/services/bait.service';
import { Bait } from 'src/app/core/interfaces/fishing_tackle/bait';
import { ThingType } from 'src/app/core/enums/thing-type';
import { FishingType } from 'src/app/core/interfaces/catching-type';

@Component({
  selector: 'app-add-or-edit-bait',
  templateUrl: './add-or-edit-bait.component.html',
  styleUrls: ['./add-or-edit-bait.component.scss']
})
export class AddOrEditBaitComponent implements OnInit {

  id: any;
  userApp: UserApp;
  mainForm: FormGroup;

  fishingTypes = FishingType;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private baitService: BaitService,
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
        this.baitService.getById(this.id).subscribe(rod => {
          this.createForm(rod);

          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
        });
      }
  }

  ngOnInit() {
  }

  createForm(bait?: Bait) {
    if (bait) {
      this.mainForm = this.fb.group({
        name: [bait.name, Validators.required],
        description: [bait.description],
        imageUrl: [bait.imageUrl],
        price: [bait.price],
        weightG: [bait.weightG],
        fishingType: [bait.fishingType ? bait.fishingType.toString() : '']
      });
    } else {
      this.mainForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        imageUrl: [''],
        price: [''],
        weightG: [''],
        fishingType: ['']
      });
    }
  }

  onSubmitForm() {
    if (this.mainForm.valid) {
      this.spinner.show();
      const formModel = this.mainForm.value;
      const entityModel: Bait = {
        userId: this.userApp.id,
        name: formModel.name as string,
        description: formModel.description as string,
        imageUrl: formModel.imageUrl as string,
        price: formModel.price as number,
        weightG: formModel.weightG as number,
        type: ThingType.Bait,
        fishingType: +formModel.fishingType
      };

      if (this.id) {
        entityModel.id = this.id;
        this.baitService.update(entityModel).then(() => {
          this.spinner.hide();
          this.snackBar.open(
            this.translate.instant('MESSAGE.UPDATED'),
            this.translate.instant('MESSAGE.TITLE')).afterDismissed().subscribe(() => {
            this.route.navigate(['/storeroom']);
          });
        }).catch(() => {this.spinner.hide(); });
      } else {
        this.baitService.add(entityModel).then(() => {
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
