import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ThingType } from 'src/app/core/enums/thing-type';
import { FishingType } from 'src/app/core/interfaces/catching-type';
import { RodService } from 'src/app/services/rod.service';
import { Rod, RodFormationType } from 'src/app/core/interfaces/fishing_tackle/rod';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { UserApp } from 'src/app/core/interfaces/user-app';
import { Thing } from 'src/app/core/interfaces/fishing_tackle/thing';
import { LengthType } from 'src/app/core/enums/length-type';

@Component({
  selector: 'app-add-or-edit-rod',
  templateUrl: './add-or-edit-rod.component.html',
  styleUrls: ['./add-or-edit-rod.component.scss']
})
export class AddOrEditRodComponent implements OnInit {
  // ID for edit thing
  id: any;
  userApp: UserApp;
  fishingTypes = FishingType;
  lengthTypes = LengthType;
  formationType = RodFormationType;
  rodForm: FormGroup;
  imageUrl: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private rodService: RodService,
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) public data: any,
    private route: Router,
    private loaderService: LoaderService,
    activateRoute: ActivatedRoute) {
      this.userApp = this.userService.getCurrentUser();
      this.createForm();
      this.id = activateRoute.snapshot.params.id;
      if (this.id) {
        this.loaderService.show();
        this.rodService.getRodById(this.id).subscribe(rod => {
          this.createForm(rod);

          this.loaderService.hide();
        }, (error) => {
          this.loaderService.hide();
        });
      }
    }

  createForm(thing?: Rod) {
    if (thing) {
      this.rodForm = this.fb.group({
        name: [thing.name, Validators.required],
        description: [thing.description],
        imageUrl: [thing.imageUrl],
        price: [thing.price],
        weightG: [thing.weightG],
        sections: [thing.sections],
        testOfBaitG: [thing.testOfBaitG],
        testOfFishingLineLb: [thing.testOfFishingLineLb],
        length: [thing.length],
        lengthType: [thing.lengthType ? thing.lengthType.toString() : ''],
        formationType: [thing.formationType ? thing.formationType.toString() : ''],
        fishingType: [thing.fishingType ? thing.fishingType.toString() : '']
      });
    } else {
      this.rodForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        imageUrl: [''],
        price: [''],
        weightG: [''],
        sections: [''],
        testOfBaitG: [''],
        testOfFishingLineLb: [''],
        length: [''],
        lengthType: [''],
        formationType: [''],
        fishingType: ['']
      });
    }
  }

  ngOnInit() {
  }
  onSubmitRodForm() {
    if (this.rodForm.valid) {
      this.loaderService.show();
      const formModel = this.rodForm.value;
      const rodModel: Rod = {
        userId: this.userApp.id,
        name: formModel.name as string,
        description: formModel.description as string,
        imageUrl: this.imageUrl != null ? this.imageUrl : formModel.imageUrl,
        price: formModel.price as number,
        weightG: formModel.weightG as number,
        type: ThingType.Rod,
        sections: formModel.sections as number,
        testOfBaitG: formModel.testOfBaitG as number,
        testOfFishingLineLb: formModel.testOfFishingLineLb as number,
        length: formModel.length,
        lengthType: +formModel.lengthType,
        formationType: +formModel.formationType,
        fishingType: +formModel.fishingType
      };

      if (this.id) {
        rodModel.id = this.id;
        this.rodService.updateRod(rodModel).then(() => {
          this.loaderService.hide();
          this.snackBar.open(
            this.translate.instant('MESSAGE.UPDATED'),
            this.translate.instant('MESSAGE.TITLE')).afterDismissed().subscribe(() => {
            this.route.navigate(['/storeroom']);
          });
        }).catch(() => {this.loaderService.hide(); });
      } else {
        this.rodService.addRod(rodModel).then(() => {
          this.loaderService.hide();
          this.snackBar.open(
            this.translate.instant('MESSAGE.ADDED'),
            this.translate.instant('MESSAGE.TITLE')).afterDismissed().subscribe(() => {
            this.route.navigate(['/storeroom']);
          });
        }).catch(() => {this.loaderService.hide(); });
      }
    } else {
      // show messsage
      this.snackBar.open(
        this.translate.instant('ERROR.FORM_NOT_VALIDATE'),
        this.translate.instant('ERROR.TITLE'));
    }
  }

  public onchangedImage(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

}
