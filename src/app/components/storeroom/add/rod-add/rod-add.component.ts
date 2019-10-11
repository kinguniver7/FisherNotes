import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ThingType } from 'src/app/core/enums/thing-type';
import { CatchingType } from 'src/app/core/interfaces/catching-type';
import { RodService } from 'src/app/services/rod.service';
import { Rod, RodFormationType } from 'src/app/core/interfaces/fishing_tackle/rod';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rod-add',
  templateUrl: './rod-add.component.html',
  styleUrls: ['./rod-add.component.scss']
})
export class RodAddComponent implements OnInit {
  catchingTypes = CatchingType;
  formationType = RodFormationType;
  rodForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rodService: RodService,
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) public data: any,
    private route: Router) { this.createForm(); }

  createForm() {
    this.rodForm = this.fb.group({
      name: [''],
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

  ngOnInit() {
  }
  onSubmitRodForm() {
    if (this.rodForm.valid) {
      const formModel = this.rodForm.value;
      const rodModel: Rod = {
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
      
      this.rodService.addRod(rodModel).then(() => {
        this.snackBar.open('Added!', 'Message').afterDismissed().subscribe(() => {
          this.route.navigate(['/storeroom']);
        });
      });
    }
  }

}
