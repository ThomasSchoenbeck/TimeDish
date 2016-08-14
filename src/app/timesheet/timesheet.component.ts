import { Component, OnInit } from '@angular/core';

import { Timesheet } from '../models/timesheet.model';
import { TimeRecord } from '../models/time-record.model';
import { TimeRecordComponent } from './time-record/time-record.component';
import { TimesheetService } from '../shared/timesheet.service';

import { Project } from '../models/project.model';
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
  directives: [ TimeRecordComponent ],
  providers: [ TimesheetService, ProjectsService, WorkpackageService ],
  pipes: [ ProjectPipe, WorkpackagePipe, TimeRecordPipe ]
})
export class TimesheetComponent implements OnInit {

  private timesheet: Timesheet;
  private timeRecords: TimeRecord[];
  private projects: Project[];
  private workpackages: Workpackage[];

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

  constructor(private timesheetService: TimesheetService, private projectService: ProjectsService, private workpackageService: WorkpackageService) { }

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

  recalcMondayTotal(){
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

    console.log(`pos neg class: indexOf(${this.monday_diff}) = ${this.monday_diff.indexOf(negativeSymbol)}`)
    console.log(`pos neg class: indexOf(${this.tuesday_diff}) = ${this.tuesday_diff.indexOf(negativeSymbol)}`)
    console.log(`pos neg class: indexOf(${this.wednesday_diff}) = ${this.wednesday_diff.indexOf(negativeSymbol)}`)
    console.log(`pos neg class: indexOf(${this.thursday_diff}) = ${this.thursday_diff.indexOf(negativeSymbol)}`)
    console.log(`pos neg class: indexOf(${this.friday_diff}) = ${this.friday_diff.indexOf(negativeSymbol)}`)

    let positivString:string = '00:00';

    if (this.monday_diff.indexOf(negativeSymbol) != -1) {
      this.mondayIsNegative = true;
    }
    if (this.monday_diff === positivString) {
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
        this.recalcMondayTotal();
  this.calcWork();
  this.calcDifferences();
  this.currentTimeCalculated();
}

  ngOnInit() {

    let date = new Date();

    let currentThursday = new Date(date.getTime() + (3-((date.getDay()+6) % 7 )) * 86400000);

    let yearOfThursday = currentThursday.getFullYear();

    let firstThursday = new Date(new Date(yearOfThursday, 0, 4).getTime() +(3-((new Date(yearOfThursday, 0, 4).getDay()+6) % 7)) * 86400000);

    let weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);

    console.log(`Timesheet Component: Date: ${date}`);
    console.log(`Timesheet Component: currentThursday ${currentThursday}`);
    console.log(`Timesheet Component: yearOfThursday ${yearOfThursday}`);
    console.log(`Timesheet Component: firstThursday ${firstThursday}`);
    console.log(`Timesheet Component: weekNumber ${weekNumber}`);

    this.monday_date = moment(date).startOf('isoweek').format('DD.MM.');
    this.tuesday_date = moment(date).startOf('isoweek').day('tuesday').format('DD.MM.');
    this.wednesday_date = moment(date).startOf('isoweek').day('wednesday').format('DD.MM.');
    this.thursday_date = moment(date).startOf('isoweek').day('thursday').format('DD.MM.');
    this.friday_date = moment(date).startOf('isoweek').day('friday').format('DD.MM.');
    // this.monday_date = moment(date).startOf('isoweek').toDate();
    // console.log(`monday_date: ${this.monday_date}`);
    // this.monday_date = moment(date).day('monday').toDate().toLocaleDateString('de-DE','dd.MM.YYYY');

    console.log(`monday_date: ${this.monday_date}`);

    this.timesheetService.getTimeSheetByWeekId(weekNumber).subscribe(data => {
      this.timesheet = data;
      // console.log(`Timesheet Component: this.timesheet: ${JSON.stringify(this.timesheet)}`);

      let monday_start = new Date('01/01/2017 ' + this.timesheet.monday_start).getHours() + new Date('01/01/2017 ' + this.timesheet.monday_start).getMinutes();
      console.log(`monday_end: hours: ${new Date('01/01/2017 ' + this.timesheet.monday_end).getHours()}`);
      console.log(`monday_end: minutes: ${new Date('01/01/2017 ' + this.timesheet.monday_end).getMinutes()}`);
      let monday_end = new Date('01/01/2017 ' + this.timesheet.monday_end).getHours();
      let monday_break = new Date('01/01/2017 ' + this.timesheet.monday_break).getHours();

      console.log(`monday_total: end(${monday_end}) - start(${monday_start}) - break(${monday_break}) =  ${monday_end - monday_start - monday_break}`)

      console.log(`changing time to string: monday_start: ${this.changeMinutes(this.timesheet.monday_start)}`);
      console.log(`changing time to string: monday_end: ${this.changeMinutes(this.timesheet.monday_end)}`);
      console.log(`changing time to string: monday_break: ${this.changeMinutes(this.timesheet.monday_break)}`);

      console.log(`calc time from number: ${this.changeMinutes(this.timesheet.monday_end) - this.changeMinutes(this.timesheet.monday_start) - this.changeMinutes(this.timesheet.monday_break)}`);

      console.log(`calc monday_total: ${this.changeBack(this.changeMinutes(this.timesheet.monday_end) - this.changeMinutes(this.timesheet.monday_start) - this.changeMinutes(this.timesheet.monday_break))}`);

      // this.monday_total = (monday_end - monday_start - monday_break).toString();
      // if (+this.monday_total % 1 != 0) {
      //   this.monday_total = this.monday_total + ':00';
      // } else {
      //   this.monday_total = this.monday_total + '';
      // }

      this.calcWork();

      // this.monday_work = this.changeBack(this.changeMinutes(this.timesheet.monday_end) - this.changeMinutes(this.timesheet.monday_start) - this.changeMinutes(this.timesheet.monday_break));
      // this.tuesday_work = this.changeBack(this.changeMinutes(this.timesheet.tuesday_end) - this.changeMinutes(this.timesheet.tuesday_start) - this.changeMinutes(this.timesheet.tuesday_break));
      // this.wednesday_work = this.changeBack(this.changeMinutes(this.timesheet.wednesday_end) - this.changeMinutes(this.timesheet.wednesday_start) - this.changeMinutes(this.timesheet.wednesday_break));
      // this.thursday_work = this.changeBack(this.changeMinutes(this.timesheet.thursday_end) - this.changeMinutes(this.timesheet.thursday_start) - this.changeMinutes(this.timesheet.thursday_break));
      // this.friday_work = this.changeBack(this.changeMinutes(this.timesheet.friday_end) - this.changeMinutes(this.timesheet.friday_start) - this.changeMinutes(this.timesheet.friday_break));
      
      // this.total_work = this.changeBack(
      //   this.changeMinutes(this.monday_work) + this.changeMinutes(this.tuesday_work) + this.changeMinutes(this.wednesday_work)
      //   + this.changeMinutes(this.thursday_work) + this.changeMinutes(this.friday_work)
      // );

      // console.warn(`Timesheet Component: this.monday_work ${this.monday_work}`);
      // console.warn(`Timesheet Component: this.total_work ${this.total_work}`);
      // console.warn(`Timesheet Component: this.timesheet.monday_start ${this.timesheet.monday_start}`);

    })

    this.timesheetService.getTimeRecordByWeekId(weekNumber).subscribe(data => {
      this.timeRecords = data;
      // console.log(`Timesheet Component: this.timeRecords: ${JSON.stringify(this.timeRecords)}`);

      let ArrayOfProjects = [];
      let ArrayOfWorkpackages = [];

      this.total_week_time = '';
      this.monday_total = '';

      this.timeRecords.forEach((element) => {
        // console.log(`Timesheet Component: this.timeRecords forEach(): element.projectId: ${element.projectId} && element.workpackageId: ${element.workpackageId}`);


        // console.log(`Calc: ${this.changeMinutes(element.monday_time) + this.changeMinutes(element.tuesday_time) + this.changeMinutes(element.wednesday_time) + this.changeMinutes(element.thursday_time) + this.changeMinutes(element.friday_time)}`);

        element.row_total = (this.changeMinutes(element.monday_time) + this.changeMinutes(element.tuesday_time) + this.changeMinutes(element.wednesday_time) + this.changeMinutes(element.thursday_time) + this.changeMinutes(element.friday_time)).toString();
        // console.log(`element.row_total: ${element.row_total} and as string: ${element.row_total.toString()}`);

        // console.log(`Timesheet Component: this.total_week_time: before: ${this.total_week_time}`);
        if (this.total_week_time !== '') {
          this.total_week_time = (+this.total_week_time + +element.row_total).toString();
        } else {
          this.total_week_time = element.row_total.toString();
        }
        // console.log(`Timesheet Component: this.total_week_time: after: ${this.total_week_time}`);

        // console.log(`Timesheet Component: this.monday_total: before: ${this.monday_total}`);
        // console.log(`element.monday_time: ${element.monday_time}`);
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
        // console.log(`Timesheet Component: this.monday_total: after: ${this.monday_total}`);

        // this.monday_total = this.changeBack(this.monday_total);
        element.row_total = this.changeBack(element.row_total);

        // console.log(`Timesheet Component: projectId(${element.projectId}) IndexOf: ${ArrayOfProjects.indexOf(element.projectId)}`);
        if (ArrayOfProjects.indexOf(element.projectId) != 0 ) {
          ArrayOfProjects.push( { 'id' : element.projectId } );
        }

        // console.log(`Timesheet Component: workpackage IndexOf: ${ArrayOfProjects.indexOf(element.workpackageId)}`);
        // if (ArrayOfProjects.indexOf(element.workpackageId) != 0 ) {
        //   ArrayOfWorkpackages.push( { 'id' : element.workpackageId } );
        // }

      }
      );

      this.total_week_time = this.changeBack(this.total_week_time);
      this.monday_total = this.changeBack(this.monday_total);
      this.tuesday_total = this.changeBack(this.tuesday_total);
      this.wednesday_total = this.changeBack(this.wednesday_total);
      this.thursday_total = this.changeBack(this.thursday_total);
      this.friday_total = this.changeBack(this.friday_total);

      /*
      ** Calc things on the sheet
      */
      // this.calcMondayWorkTotal();
      this.calcDifferences();
      this.currentTimeCalculated();
      //if this takes longer than projects, template will run into an undefined error
      // this.workpackageService.getWorkpackagesById(ArrayOfWorkpackages).subscribe(data => {
      //   this.workpackages = data;
        // console.log(`Timesheet Component: this.workpackage: ${JSON.stringify(this.workpackages)}`);
        
        this.projectService.getProjectsById(ArrayOfProjects).subscribe(data => {
          this.projects = data;
          // console.log(`Timesheet Component: this.projects: ${JSON.stringify(this.projects)}`);
        });
      // });
      
    });


  }

}
