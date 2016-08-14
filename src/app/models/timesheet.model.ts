export class Timesheet {
  constructor(
    public weekId: number,
    public weekend_work: boolean,
    public monday_start: string,
    public monday_end: string,
    public monday_break: string,
    public tuesday_start: string,
    public tuesday_end: string,
    public tuesday_break: string,
    public wednesday_start: string,
    public wednesday_end: string,
    public wednesday_break: string,
    public thursday_start: string,
    public thursday_end: string,
    public thursday_break: string,
    public friday_start: string,
    public friday_end: string,
    public friday_break: string,
    public saturday_start: string,
    public saturday_end: string,
    public saturday_break: string,
    public sunday_start: string,
    public sunday_end: string,
    public sunday_break: string
  ) {  }
}