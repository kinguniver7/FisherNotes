import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ThingType } from 'src/app/core/enums/thing-type';
import { CatchingType } from 'src/app/core/interfaces/catching-type';
import { RodService } from 'src/app/services/rod.service';
import { Rod, RodFormationType } from 'src/app/core/interfaces/fishing_tackle/rod';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { UserApp } from 'src/app/core/interfaces/user-app';

@Component({
  selector: 'app-rod-add',
  templateUrl: './rod-add.component.html',
  styleUrls: ['./rod-add.component.scss']
})
export class RodAddComponent implements OnInit {
  // ID for edit thing
  id: any;
  userApp: UserApp;
  catchingTypes = CatchingType;
  formationType = RodFormationType;
  rodForm: FormGroup;

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
debugger;
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

  createForm(rod?: Rod) {
    if (rod) {
      this.rodForm = this.fb.group({
        name: [rod.name, Validators.required],
        description: [rod.description],
        imageUrl: [rod.imageUrl],
        price: [rod.price],
        weightG: [rod.weightG],
        sections: [rod.sections],
        testOfBaitG: [rod.testOfBaitG],
        testOfFishingLineLb: [rod.testOfFishingLineLb],
        formationType: [rod.formationType.toString()],
        catchingType: [rod.catchingType.toString()]
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
        formationType: [''],
        catchingType: ['']
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
        imageUrl: formModel.imageUrl as string,
        price: formModel.price as number,
        weightG: formModel.weightG as number,
        type: ThingType.Rod,
        sections: formModel.sections as number,
        testOfBaitG: formModel.testOfBaitG as number,
        testOfFishingLineLb: formModel.testOfFishingLineLb as number,
        formationType: +formModel.formationType,
        catchingType: +formModel.catchingType
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

}
