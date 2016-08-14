import * as moment from 'moment';

export class TimeRecord {
  constructor(
    public id: number,
    public weekId: number,
    public projectId: number,
    public workpackageId: number,
    public monday_time: string,
    public tuesday_time: string,
    public wednesday_time: string,
    public thursday_time: string,
    public friday_time: string,
    public saturday_time: string,
    public sunday_time: string,
    public row_total: string
  ) { 
    let formatTime = "hh:mm" ;

    console.log(`TimeRecord Constructor: moment(time): monday + tuesday: ${moment(this.monday_time, formatTime)} + ${moment(this.tuesday_time, formatTime)}`);
    // this.row_total = (moment(monday_time, formatTime).add(
                // moment(tuesday_time, formatTime),"hours")).toString();
                //  +
                // moment(wednesday_time, formatTime) +
                // moment(thursday_time, formatTime) +
                // moment(friday_time, formatTime)).toString();
   }
}