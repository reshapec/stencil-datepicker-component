import { Component, Prop, State, h } from '@stencil/core';
import { Days } from '../../../contants/days';
import { Months } from '../../../contants/months';
import { Calendar } from '../../../contants/calendar';

import moment from 'moment';

const weekDay = {
  Su: '日',
  Mo: '一',
  Tu: '二',
  We: '三',
  Th: '四',
  Fr: '五',
  Sa: '六'
};

@Component({
  tag: 'app-datepicker',
  styleUrl: 'app-datepicker.less',
  shadow: true
})
export class AwDatepickerComponent {

  @Prop() public minYear: number = 1919;
  @Prop() public maxYear: number = 2119;
  @Prop() public minHour: number = 0;
  @Prop() public maxHour: number = 23;
  @Prop() public minMin: number = 0;
  @Prop() public maxMin: number = 59;

  @State() public calendar: Calendar = {
    currentDate: new Date(),
    selectedDate: new Date(),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    daysInMonthPerWeek: this.getDaysInMonthPerWeek(new Date().getFullYear(), new Date().getMonth(), new Date().getHours(), new Date().getMinutes()),
    currentHour: new Date().getHours(),
    currentMin: new Date().getMinutes(),
  };

  constructor() {
    this.calendar = {
      ...this.calendar,
      daysInMonthPerWeek: this.getDaysInMonthPerWeek(this.calendar.currentYear, this.calendar.currentMonth, this.calendar.currentHour, this.calendar.currentMin)};
  }

  public getDaysInMonth(year: number, month: number, hour: number, minute: number) {
    const date = new Date(year, month, 1, hour, minute);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  public getDaysInMonthPerWeek(year: number, month: number, hour: number, minute: number) {
    const daysInMonthPerWeek = this.getDaysInMonth(year, month, hour, minute).reduce((previousDates, currentDate) => {
      const yearWeek = year + '-' + moment(currentDate).week();
      if (typeof previousDates[yearWeek] === 'undefined') {
        previousDates[yearWeek] = [];
      }
      previousDates[yearWeek].push(currentDate);
      return previousDates;
    }, {});
    return daysInMonthPerWeek;
  }

  public isEqualDate(firstDate: Date, secondDate: Date) {
    firstDate.setHours(0, 0, 0, 0);
    const cloneDate = new Date(secondDate);
    cloneDate.setHours(0, 0, 0, 0);
    return firstDate.getTime() === cloneDate.getTime();
  }

  public getDateClasses(date: Date) {
    if (this.isEqualDate(this.calendar.currentDate, date)) {
      return 'date current';
    }

    if (this.isEqualDate(this.calendar.selectedDate, date)) {
      return 'date active';
    }
  }

  public setDate(date) {
    this.calendar = {
      ...this.calendar,
      selectedDate: date
    };
  }

  public setYear(year: number) {
    this.calendar = {
      ...this.calendar,
      currentYear: year,
      daysInMonthPerWeek: this.getDaysInMonthPerWeek(year, this.calendar.currentMonth, this.calendar.currentHour, this.calendar.currentMin)
    };
  }

  public setMonth(month: number) {
    this.calendar = {
      ...this.calendar,
      currentMonth: month,
      daysInMonthPerWeek: this.getDaysInMonthPerWeek(this.calendar.currentYear, month, this.calendar.currentHour, this.calendar.currentMin)
    };
  }

  public setHour(hour: number) {
    this.calendar = {
      ...this.calendar,
      currentHour: hour,
      daysInMonthPerWeek: this.getDaysInMonthPerWeek(this.calendar.currentYear, this.calendar.currentMonth, hour, this.calendar.currentMin)
    };
  }

  public setMinute(minute: number) {
    this.calendar = {
      ...this.calendar,
      currentMin: minute,
      daysInMonthPerWeek: this.getDaysInMonthPerWeek(this.calendar.currentYear, this.calendar.currentMonth, this.calendar.currentHour, minute)
    };
  }

  public render() {
    console.log('000', Object.keys(weekDay));
    console.log('111this.calendar.selectedDate is ?', this.calendar.selectedDate);
    console.log('222this.calendar.selectedDate is ?', this.calendar.selectedDate.getTime());
    return (
      <div class='aw-datepicker'>
        <div class='calendar'>
          <div class='row header center'>
            <div class='year'>
              {this.calendar.currentYear === this.minYear ? '' : <i onClick={() => this.setYear(this.calendar.currentYear - 1)}>&#60;</i>}
              {this.calendar.currentYear}
              {this.calendar.currentYear === this.maxYear ? '' : <i onClick={() => this.setYear(this.calendar.currentYear + 1)}>&#62;</i>}
            </div>
            <div class='selected-date'>
              {this.calendar.selectedDate.toString().substr(0, 25)}
            </div>
            <div class='month'>
              {this.calendar.currentMonth === Months.Jan ? '' : <i onClick={() => this.setMonth(this.calendar.currentMonth - 1)}>&#60;</i>}
              {Months[this.calendar.currentMonth]}
              {this.calendar.currentMonth === Months.Dec ? '' : <i onClick={() => this.setMonth(this.calendar.currentMonth + 1)}>&#62;</i>}
            </div>
            <div class='hour'>
              {this.calendar.currentHour === this.minHour ? '' : <i onClick={() => this.setHour(this.calendar.currentHour - 1)}>&#60;</i>}
              {this.calendar.currentHour}
              {this.calendar.currentHour === this.maxHour ? '' : <i onClick={() => this.setHour(this.calendar.currentHour + 1)}>&#62;</i>}
            </div>
            <div class='min'>
              {this.calendar.currentMin === this.minMin ? '' : <i onClick={() => this.setMinute(this.calendar.currentMin - 1)}>&#60;</i>}
              {this.calendar.currentMin}
              {this.calendar.currentMin === this.maxMin ? '' : <i onClick={() => this.setMinute(this.calendar.currentMin + 1)}>&#62;</i>}
            </div>
          </div>
          <div class='row'>
            {Object.keys(weekDay).map((day)=>(<div class='column'>{weekDay[day]}</div>))}
          </div>
          {Object.keys(this.calendar.daysInMonthPerWeek).map((key) => {
            const days = this.calendar.daysInMonthPerWeek[key];
            let dayCount = 0;
            return (
              <div class='row'>
                { Days.getValues().map((dayKey) => {
                  if (days[dayCount] && dayKey === days[dayCount].getDay()) {
                    const date = days[dayCount];
                    ++dayCount;
                    return (
                      <div class='column'>
                       <p class={this.getDateClasses(date)} onClick={() => this.setDate(date)}>
                         {date.getDate()}
                       </p>
                      </div>
                    );
                  }
                  return  <div class='column'/>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
