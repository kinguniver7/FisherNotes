import { Component, OnInit } from '@angular/core';
import { SpiningService } from 'src/app/services/spining.service';

@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.component.html',
  styleUrls: ['./storeroom.component.scss']
})
export class StoreroomComponent implements OnInit {

  allThinks: any;
  constructor(private spiningService: SpiningService) { }

  ngOnInit() {
    this.spiningService.getAllRods().subscribe(data => {
      debugger;
    });
  }

}
