import { Component, OnInit, Inject } from '@angular/core';
import { UserApp } from 'src/app/core/interfaces/user-app';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ReelService } from 'src/app/services/reel.service';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reel } from 'src/app/core/interfaces/fishing_tackle/reel';
import { ThingType } from 'src/app/core/enums/thing-type';

@Component({
  selector: 'app-add-or-edit-reel',
  templateUrl: './add-or-edit-reel.component.html',
  styleUrls: ['./add-or-edit-reel.component.scss']
})
export class AddOrEditReelComponent implements OnInit {
  id: any;
  userApp: UserApp;
  mainForm: FormGroup;
  imageUrl: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private reelService: ReelService,
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
        this.reelService.getById(this.id).subscribe(rod => {
          this.createForm(rod);

          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
        });
      }
  }

  ngOnInit() {
  }

  createForm(reel?: Reel) {
    if (reel) {
      this.mainForm = this.fb.group({
        name: [reel.name, Validators.required],
        description: [reel.description],
        imageUrl: [reel.imageUrl],
        price: [reel.price],
        weightG: [reel.weightG],
        // catchingType: [reel.catchingType.toString()]
      });
    } else {
      this.mainForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        imageUrl: [''],
        price: [''],
        weightG: ['']
      });
    }
  }

  onSubmitForm() {
    if (this.mainForm.valid) {
      this.spinner.show();
      const formModel = this.mainForm.value;
      const entityModel: Reel = {
        userId: this.userApp.id,
        name: formModel.name as string,
        description: formModel.description as string,
        imageUrl: this.imageUrl != null ? this.imageUrl : formModel.imageUrl,
        price: formModel.price as number,
        weightG: formModel.weightG as number,
        type: ThingType.Reel
        // catchingType: +formModel.catchingType
      };

      if (this.id) {
        entityModel.id = this.id;
        this.reelService.update(entityModel).then(() => {
          this.spinner.hide();
          this.snackBar.open(
            this.translate.instant('MESSAGE.UPDATED'),
            this.translate.instant('MESSAGE.TITLE')).afterDismissed().subscribe(() => {
            this.route.navigate(['/storeroom']);
          });
        }).catch(() => {this.spinner.hide(); });
      } else {
        this.reelService.add(entityModel).then(() => {
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
  public onchangedImage(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

}
