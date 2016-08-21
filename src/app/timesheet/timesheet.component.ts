import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Timesheet } from '../models/timesheet.model';
import { TimeRecord } from '../models/time-record.model';
import { TimeRecordComponent } from './time-record/time-record.component';
import { TimesheetService } from '../shared/timesheet.service';
import { TimeRecordService } from '../shared/time-record.service';

import { Project } from '../models/project.model';
import { ProjectComponent } from '../project/project.component';
import { ProjectsService } from '../shared/projects.service';
import { Workpackage } from '../models/workpackage.model';
import { WorkpackageService } from '../shared/workpackage.service';
import { ProjectPipe } from '../shared/project.pipe';
import { WorkpackagePipe } from '../shared/workpackage.pipe';
import { TimeRecordPipe } from '../shared/time-record.pipe';


import 'moment/locale/de';
// import * as moment from 'moment';
import * as m3 from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-timesheet',
  templateUrl: 'timesheet.component.html',
  styleUrls: ['timesheet.component.css'],
  directives: [ TimeRecordComponent, ProjectComponent ],
  providers: [ TimesheetService, TimeRecordService, ProjectsService, WorkpackageService ],
  pipes: [ ProjectPipe, WorkpackagePipe, TimeRecordPipe ]
})
export class TimesheetComponent implements OnInit {

  private timesheet: Timesheet;
  private timeRecords: TimeRecord[];
  private timesheetProjects: Project[];
  private workpackages: Workpackage[];

  private weekNumber: number;
  private routerWeekNumber: number;
  private newWeekNumber: number;
  private routerWeekSet: boolean = false;

  private week: number;
  private year: number;
  private dataForTimesheet: boolean = false;

  private monday_work: string;
  private tuesday_work: string;
  private wednesday_work: string;
  private thursday_work: string;
  private friday_work: string;
  private total_work: string;

  private monday_total: string;
  private tuesday_total: string;
  private wednesday_total: string;
  private thursday_total: string;
  private friday_total: string;
  private total_week_time: string;

  private monday_diff: string;
  private tuesday_diff: string;
  private wednesday_diff: string;
  private thursday_diff: string;
  private friday_diff: string;

  private mondayIsPositiv: boolean = false;
  private tuesdayIsPositiv: boolean = false;
  private wednesdayIsPositiv: boolean = false;
  private thursdayIsPositiv: boolean = false;
  private fridayIsPositiv: boolean = false;
  private mondayIsNegative: boolean = false;
  private tuesdayIsNegative: boolean = false;
  private wednesdayIsNegative: boolean = false;
  private thursdayIsNegative: boolean = false;
  private fridayIsNegative: boolean = false;

  private monday_date: string;
  private tuesday_date: string;
  private wednesday_date: string;
  private thursday_date: string;
  private friday_date: String;

  private monday_time: string;
  private tuesday_time: string;
  private wednesday_time: string;
  private thursday_time: string;
  private friday_time: String;

  constructor(private timesheetService: TimesheetService, private timeRecordService: TimeRecordService, private projectService: ProjectsService, private workpackageService: WorkpackageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  switchToPreviousWeek() {
    this.newWeekNumber = this.weekNumber - 1; 
    this.router.navigate(['/timesheet', this.newWeekNumber]);
  }

  switchToNextWeek() {
    this.newWeekNumber = this.weekNumber + 1; 
    this.router.navigate(['/timesheet', this.newWeekNumber]);
  }

  changeMinutes(day_time) {
    // console.log(`changeMinutes: day_time: ${day_time}`);
    let split = day_time.split(':');

    // console.log(split);

    if (split[1] == 30) {
      split[1] = 0.5;
    } else if (split[1] == 15) {
      split[1] = 0.25;
    } else if (split[1] == 45) {
      split[1] = 0.75;
    } else if (split[1] == 0) {
      split[1] = 0;
    } 
    // console.log(`changeMinutes: ${split[0]} + ${split[1]} = ${+split[0] + +split[1]}`);
    return +split[0] + +split[1];
  }

  changeBack(time) {
    // console.log(`changeBack: time: ${time}`);
    let split = time.toString().split('.');

    if(split[0].length == 1) {
      split[0] = '0'+ split[0];
    }

    if (split[1] != undefined){
      if (split[1] == '5') {
        split[1] = '30';
      } else if (split[1] == '25') {
        split[1] = '15';
      } else if (split[1] == '75') {
        split[1] = '45';
      } else if (split[1] == '0' || split[1] == '00') {
        split[1] = '00';
      }
      // console.log(`changeBack: ${split[0]} + ${split[1]} = ${split[0] + ':' + split[1]}`);
      return split[0] + ':' + split[1];
    } else {
      // console.log(`changeBack: ${split[0]} + ${split[1]} = ${split[0] + ':' + split[1]}`);
      return split[0] + ':00';
    }

  }

  recalcTotals(){
    // let mondays = document.getElementsByClassName('monday');

    // console.log(mondays);

    // for(var i=0; i<mondays.length; i++) {
    //   if (mondays[i].id = 'monday') {
    //     if (i=0) {
    //       this.monday_total = this.changeMinutes(mondays[i].nodeValue).toString();
    //     } else {
    //       this.monday_total = (+this.monday_total + +this.changeMinutes(mondays[i].nodeValue)).toString();
    //     }
    //   }
    // }
    // this.monday_total = this.changeBack(this.monday_total);

    // mondays.forEach()

    // console.log(`mondays: + ${mondays}`);

    this.total_week_time = '';

    this.monday_total = '';
    this.tuesday_total = '';
    this.wednesday_total = '';
    this.thursday_total = '';
    this.friday_total = '';

    this.timeRecords.forEach(element => {

      element.row_total = this.changeBack(this.changeMinutes(element.monday_time) + this.changeMinutes(element.tuesday_time) + this.changeMinutes(element.wednesday_time) + this.changeMinutes(element.thursday_time) + this.changeMinutes(element.friday_time)).toString();


      if (this.total_week_time !== '') {
        this.total_week_time = (+this.total_week_time + +this.changeMinutes(element.row_total)).toString();
        console.log(`this.total_week_time: ${this.total_week_time}`);
      } else {
        this.total_week_time = this.changeMinutes(element.row_total).toString();
        console.log(`this.total_week_time: ${this.total_week_time}`);
      }

      if (this.monday_total !== '' && this.tuesday_total !== '' && this.wednesday_total !== '' && this.thursday_total !== '' && this.friday_total !== '' ) {
          this.monday_total = (+this.monday_total + +this.changeMinutes(element.monday_time)).toString();
          this.tuesday_total = (+this.tuesday_total + +this.changeMinutes(element.tuesday_time)).toString();
          this.wednesday_total = (+this.wednesday_total + +this.changeMinutes(element.wednesday_time)).toString();
          this.thursday_total = (+this.thursday_total + +this.changeMinutes(element.thursday_time)).toString();
          this.friday_total = (+this.friday_total + +this.changeMinutes(element.friday_time)).toString();
        } else {
          this.monday_total = this.changeMinutes(element.monday_time).toString();
          this.tuesday_total = this.changeMinutes(element.tuesday_time).toString();
          this.wednesday_total = this.changeMinutes(element.wednesday_time).toString();
          this.thursday_total = this.changeMinutes(element.thursday_time).toString();
          this.friday_total = this.changeMinutes(element.friday_time).toString();
        }

    });

    this.total_week_time = this.changeBack(this.total_week_time);
    console.log(`this.total_week_time: FINAL: ${this.total_week_time}`);
      this.monday_total = this.changeBack(this.monday_total);
      this.tuesday_total = this.changeBack(this.tuesday_total);
      this.wednesday_total = this.changeBack(this.wednesday_total);
      this.thursday_total = this.changeBack(this.thursday_total);
      this.friday_total = this.changeBack(this.friday_total);



  }

  setPositiveNegativeClass(diff_value){
    let negativeSymbol:string = '-';
    let positive: boolean;
    let negative: boolean;

    // console.log(`pos neg class: indexOf(${diff_value}) = ${diff_value.indexOf(negativeSymbol)}`);

    if (diff_value.indexOf(negativeSymbol) != -1) {
      positive = false;
      negative = true;
    }
    let classes = {
      positive: positive, //true
      negative: negative, //false
    };
    return classes; 
  }

  currentTimeCalculated() {
    this.monday_time = this.changeBack(this.changeMinutes(this.timesheet.monday_start) + this.changeMinutes(this.monday_total));
    this.tuesday_time = this.changeBack(this.changeMinutes(this.timesheet.tuesday_start) + this.changeMinutes(this.tuesday_total));
    this.wednesday_time = this.changeBack(this.changeMinutes(this.timesheet.wednesday_start) + this.changeMinutes(this.wednesday_total));
    this.thursday_time = this.changeBack(this.changeMinutes(this.timesheet.thursday_start) + this.changeMinutes(this.thursday_total));
    this.friday_time = this.changeBack(this.changeMinutes(this.timesheet.friday_start) + this.changeMinutes(this.friday_total));

    console.log(`currentTimeCalculated: monday_time: ${this.monday_time}`);
  }

  calcDifferences() {
    // this.monday_diff = (this.changeMinutes(this.monday_total) - this.changeMinutes(this.monday_work)).toString();
    // this.tuesday_diff = (this.changeMinutes(this.tuesday_total) - this.changeMinutes(this.tuesday_work)).toString();
    // this.wednesday_diff = (this.changeMinutes(this.wednesday_total) - this.changeMinutes(this.wednesday_work)).toString();
    // this.thursday_diff = (this.changeMinutes(this.thursday_total) - this.changeMinutes(this.thursday_work)).toString();
    // this.friday_diff = (this.changeMinutes(this.friday_total) - this.changeMinutes(this.friday_work)).toString();
    this.monday_diff = this.changeBack(this.changeMinutes(this.monday_total) - this.changeMinutes(this.monday_work));
    this.tuesday_diff = this.changeBack(this.changeMinutes(this.tuesday_total) - this.changeMinutes(this.tuesday_work));
    this.wednesday_diff = this.changeBack(this.changeMinutes(this.wednesday_total) - this.changeMinutes(this.wednesday_work));
    this.thursday_diff = this.changeBack(this.changeMinutes(this.thursday_total) - this.changeMinutes(this.thursday_work));
    this.friday_diff = this.changeBack(this.changeMinutes(this.friday_total) - this.changeMinutes(this.friday_work));

    // checkPositiveNegative
    let negativeSymbol:string = '-';

    // console.log(`pos neg class: indexOf(${this.monday_diff}) = ${this.monday_diff.indexOf(negativeSymbol)}`)
    // console.log(`pos neg class: indexOf(${this.tuesday_diff}) = ${this.tuesday_diff.indexOf(negativeSymbol)}`)
    // console.log(`pos neg class: indexOf(${this.wednesday_diff}) = ${this.wednesday_diff.indexOf(negativeSymbol)}`)
    // console.log(`pos neg class: indexOf(${this.thursday_diff}) = ${this.thursday_diff.indexOf(negativeSymbol)}`)
    // console.log(`pos neg class: indexOf(${this.friday_diff}) = ${this.friday_diff.indexOf(negativeSymbol)}`)

    let positivString:string = '00:00';

    if (this.monday_diff.indexOf(negativeSymbol) != -1) {
      this.mondayIsNegative = true;
    } else if (this.monday_diff === positivString) {
      this.mondayIsPositiv = true;
    }
    if (this.tuesday_diff.indexOf(negativeSymbol) != -1) {
      this.tuesdayIsNegative = true;
    } else if (this.tuesday_diff === positivString) {
      this.tuesdayIsPositiv = true;
    }
    if (this.wednesday_diff.indexOf(negativeSymbol) != -1) {
      this.wednesdayIsNegative = true;
    } else if (this.wednesday_diff === positivString) {
      this.wednesdayIsPositiv = true;
    }
    if (this.thursday_diff.indexOf(negativeSymbol) != -1) {
      this.thursdayIsNegative = true;
    } else if (this.thursday_diff === positivString) {
      this.thursdayIsPositiv = true;
    }
    if (this.friday_diff.indexOf(negativeSymbol) != -1) {
      this.fridayIsNegative = true;
    } else if (this.friday_diff === positivString) {
      this.fridayIsPositiv = true;
    }

  }

  calcWork() {
    this.monday_work = this.changeBack(this.changeMinutes(this.timesheet.monday_end) - this.changeMinutes(this.timesheet.monday_start) - this.changeMinutes(this.timesheet.monday_break));
    this.tuesday_work = this.changeBack(this.changeMinutes(this.timesheet.tuesday_end) - this.changeMinutes(this.timesheet.tuesday_start) - this.changeMinutes(this.timesheet.tuesday_break));
    this.wednesday_work = this.changeBack(this.changeMinutes(this.timesheet.wednesday_end) - this.changeMinutes(this.timesheet.wednesday_start) - this.changeMinutes(this.timesheet.wednesday_break));
    this.thursday_work = this.changeBack(this.changeMinutes(this.timesheet.thursday_end) - this.changeMinutes(this.timesheet.thursday_start) - this.changeMinutes(this.timesheet.thursday_break));
    this.friday_work = this.changeBack(this.changeMinutes(this.timesheet.friday_end) - this.changeMinutes(this.timesheet.friday_start) - this.changeMinutes(this.timesheet.friday_break));
        
    this.total_work = this.changeBack(this.changeMinutes(this.monday_work) + this.changeMinutes(this.tuesday_work) + this.changeMinutes(this.wednesday_work) + this.changeMinutes(this.thursday_work) + this.changeMinutes(this.friday_work));

    console.warn(`Timesheet Component: this.monday_work ${this.monday_work}`);
    console.warn(`Timesheet Component: this.total_work ${this.total_work}`);
    console.warn(`Timesheet Component: this.timesheet.monday_start ${this.timesheet.monday_start}`);
  }

  recalcThings(item) {
    // console.info(`recalcThings() using event: ${JSON.stringify(event)}`);
    console.info(`recalcThings() using ngModel: ${JSON.stringify(item)}`);
    this.recalcTotals();
    this.calcWork();
    this.calcDifferences();
    this.currentTimeCalculated();
  }

  initTimeSheet(weekNumber) {
    this.timesheetService.getTimeSheetByWeekId(weekNumber).subscribe(data => {
      console.log(data);
      if (Object.keys(data).length == 0) {
        console.log(`no data for timesheet, creating week`);
        this.timesheetService.createTimeSheetByWeekId(weekNumber).subscribe(data => {
          this.timesheet = data;
          this.calcWork();
          this.initTimeSheetRecords(this.weekNumber);
        });
      } else {
        this.timesheet = data;
        this.calcWork();
        this.initTimeSheetRecords(this.weekNumber);
      }
    });
  }

  initTimeSheetRecords(weekNumber) {
    this.timeRecordService.getTimeRecordByWeekId(weekNumber).subscribe(data => {
      console.log(data);
      if (Object.keys(data).length == 0) {
        console.log(`no data for timerecord, creating week`);
        this.timeRecords = undefined;
        this.timesheetProjects = undefined;
        this.monday_total = '00:00';
        this.tuesday_total = '00:00';
        this.wednesday_total = '00:00';
        this.thursday_total = '00:00';
        this.friday_total = '00:00';
        this.total_week_time = '00:00';

        this.calcDifferences();
        this.currentTimeCalculated();

      } else {

        this.timeRecords = data;
        // console.log(`Timesheet Component: this.timeRecords: ${JSON.stringify(this.timeRecords)}`);

        let ArrayOfProjects = [];
        let ArrayOfWorkpackages = [];

        this.total_week_time = '';
        this.monday_total = '';

        this.timeRecords.forEach((element) => {

          element.row_total = (this.changeMinutes(element.monday_time) + this.changeMinutes(element.tuesday_time) + this.changeMinutes(element.wednesday_time) + this.changeMinutes(element.thursday_time) + this.changeMinutes(element.friday_time)).toString();

          if (this.total_week_time !== '') {
            this.total_week_time = (+this.total_week_time + +element.row_total).toString();
          } else {
            this.total_week_time = element.row_total.toString();
          }
    
          if (this.monday_total !== '' && this.tuesday_total !== '' && this.wednesday_total !== '' && this.thursday_total !== '' && this.friday_total !== '' ) {
            this.monday_total = (+this.monday_total + +this.changeMinutes(element.monday_time)).toString();
            this.tuesday_total = (+this.tuesday_total + +this.changeMinutes(element.tuesday_time)).toString();
            this.wednesday_total = (+this.wednesday_total + +this.changeMinutes(element.wednesday_time)).toString();
            this.thursday_total = (+this.thursday_total + +this.changeMinutes(element.thursday_time)).toString();
            this.friday_total = (+this.friday_total + +this.changeMinutes(element.friday_time)).toString();
          } else {
            this.monday_total = this.changeMinutes(element.monday_time).toString();
            this.tuesday_total = this.changeMinutes(element.tuesday_time).toString();
            this.wednesday_total = this.changeMinutes(element.wednesday_time).toString();
            this.thursday_total = this.changeMinutes(element.thursday_time).toString();
            this.friday_total = this.changeMinutes(element.friday_time).toString();
          }

          element.row_total = this.changeBack(element.row_total);

          if (ArrayOfProjects.indexOf(element.projectId) != 0 ) {
            ArrayOfProjects.push( { 'id' : element.projectId } );
          }

        });

        this.total_week_time = this.changeBack(this.total_week_time);
        this.monday_total = this.changeBack(this.monday_total);
        this.tuesday_total = this.changeBack(this.tuesday_total);
        this.wednesday_total = this.changeBack(this.wednesday_total);
        this.thursday_total = this.changeBack(this.thursday_total);
        this.friday_total = this.changeBack(this.friday_total);

        /*
        ** Calc things on the sheet
        */
        this.calcDifferences();
        this.currentTimeCalculated();
        
        this.projectService.getProjectsById(ArrayOfProjects).subscribe(data => { this.timesheetProjects = data; });
      }
      
    });
  }

  startComponent() {

    console.log(`setting date that is not used`);
    let date = new Date();

    console.log(`update week and year`);
    if (this.routerWeekSet) {
      this.weekNumber = this.routerWeekNumber;
      this.week = parseInt(this.weekNumber.toString().substr(4, 2));
      this.year = parseInt(this.weekNumber.toString().substr(0, 4));
    } else {
      this.weekNumber = parseInt(moment().year().toString() + moment().isoWeek().toString());
      this.week = moment().isoWeek();
      this.year = moment().year(); 
    }

    console.log(`Week: ${this.week}, Year: ${this.year}`);

    this.monday_date = moment().year(this.year).isoWeek(this.week).day('monday').format('DD.MM.');
    this.tuesday_date = moment().year(this.year).isoWeek(this.week).day('tuesday').format('DD.MM.');
    this.wednesday_date = moment().year(this.year).isoWeek(this.week).day('wednesday').format('DD.MM.');
    this.thursday_date = moment().year(this.year).isoWeek(this.week).day('thursday').format('DD.MM.');
    this.friday_date = moment().year(this.year).isoWeek(this.week).day('friday').format('DD.MM.');
 
    // this.monday_date = moment(date).startOf('isoweek').toDate();
    // console.log(`monday_date: ${this.monday_date}`);
    // this.monday_date = moment(date).day('monday').toDate().toLocaleDateString('de-DE','dd.MM.YYYY');

    // console.log(`monday_date: ${this.monday_date}`);

    this.initTimeSheet(this.weekNumber);

  }

  update(timesheet) {

    this.timesheetService.updateTimesheet(timesheet).subscribe(data => this.timesheet = data);

    if (this.timesheet = timesheet) {
      console.log(`timesheet: both timesheets are the same after put;`);
    } else {
      console.warn(`timesheet: both timesheetss are NOT the same after put;`);
    }
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.routerWeekNumber = Number.parseInt(params['weekId']); 
      if (!isNaN(this.routerWeekNumber)) {
        this.routerWeekSet = true; 
        console.log(`checking router params: have been set: ${this.routerWeekSet} | routerWeekNumber: ${this.routerWeekNumber}`);
      } else {
        this.routerWeekSet = false;
        console.log(`checking router params: have been set: ${this.routerWeekSet} | routerWeekNumber: ${this.routerWeekNumber}`);
      }
      this.startComponent();
    });

  }

}
