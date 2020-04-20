export class Calendar {
    public currentDate: Date;
    public selectedDate: Date;
    public currentYear: number;
    public currentMonth: number;
    public daysInMonthPerWeek: DaysInMonthPerWeekMap;
    public currentHour: number;
    public currentMin: number;
  }
  
interface DaysInMonthPerWeekMap {
[weekInYear: string]: Date[];
}
