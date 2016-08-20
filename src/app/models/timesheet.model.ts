export class Timesheet {
  constructor(
    public id: number,
    public weekId: number,
    public weekend_work: boolean,
    public monday_start: string,
    public monday_end: string = monday_start,
    public monday_break: string = monday_start,
    public tuesday_start: string = monday_start,
    public tuesday_end: string = monday_start,
    public tuesday_break: string = monday_start,
    public wednesday_start: string = monday_start,
    public wednesday_end: string = monday_start,
    public wednesday_break: string = monday_start,
    public thursday_start: string = monday_start,
    public thursday_end: string = monday_start,
    public thursday_break: string = monday_start,
    public friday_start: string = monday_start,
    public friday_end: string = monday_start,
    public friday_break: string = monday_start,
    public saturday_start: string = monday_start,
    public saturday_end: string = monday_start,
    public saturday_break: string = monday_start,
    public sunday_start: string = monday_start,
    public sunday_end: string = monday_start,
    public sunday_break: string = monday_start
  ) {  }
}