import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Workpackage } from '../models/workpackage.model';
import { WorkpackageService } from '../shared/workpackage.service';

@Component({
  moduleId: module.id,
  selector: 'workpackage',
  templateUrl: 'workpackage.component.html',
  styleUrls: ['workpackage.component.css'],
  providers: [ WorkpackageService ]
})
export class WorkpackageComponent implements OnInit {

  private workpackages: Workpackage[];
  private errorMessage: string;
  @Output() addToTimesheet = new EventEmitter<any>();

  constructor(private workpackageService: WorkpackageService) { }

  addWorkpackageToTimesheet(workpackage) {
    this.addToTimesheet.emit(workpackage);
  }

  getWorkpackages() {
    this.workpackageService.getWorkpackages()
                     .subscribe(
                       data =>  {
                         this.workpackages = data;
                        },
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getWorkpackages();
  }

}