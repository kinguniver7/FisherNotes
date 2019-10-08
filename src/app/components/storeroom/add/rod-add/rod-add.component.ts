import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ThingType } from 'src/app/core/enums/thing-type';

@Component({
  selector: 'app-rod-add',
  templateUrl: './rod-add.component.html',
  styleUrls: ['./rod-add.component.scss']
})
export class RodAddComponent implements OnInit {
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  onSubmitRodForm(){
    let t = this.rodForm;
    debugger;
  }

}
