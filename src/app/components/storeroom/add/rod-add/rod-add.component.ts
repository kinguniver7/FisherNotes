import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ThingType } from 'src/app/core/enums/thing-type';
import { CatchingType } from 'src/app/core/interfaces/catching-type';
import { RodService } from 'src/app/services/rod.service';
import { Rod } from 'src/app/core/interfaces/fishing_tackle/rod';

@Component({
  selector: 'app-rod-add',
  templateUrl: './rod-add.component.html',
  styleUrls: ['./rod-add.component.scss']
})
export class RodAddComponent implements OnInit {
  catchingTypes = CatchingType;
  rodForm = this.fb.group({
    name: [''],
    description: [''],
    image: [''],
    price: [''],
    weightG: [''],
    type: [ThingType.Rod],
    sections: [''],
    testOfBaitG: [''],
    testOfFishingLineLb: [''],
    formationType: [''],
    catchingType: ['']
  });

  constructor(private fb: FormBuilder, private rodService: RodService) { }

  ngOnInit() {
  }
  onSubmitRodForm() {
    /* if (this.rodForm.valid) {
      const model: Rod = {
        name:"",

      }; */
      //this.rodService.addRod(model)
    //}
  }

}
