import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nearestDays'
})

export class NearestDaysPipe implements PipeTransform {

  transform(value: string): string {
    
    /*-----------------------for day-month offsets---------------------*/

    // console.log(value)

    const 
    date = new Date(value),
    today = new Date(), 
    tommorow = new Date(),
    yesterday = new Date();

    tommorow.setDate(today.getDate() + 1);
    yesterday.setDate(today.getDate() - 1);

    const [thisDay,thisMonth,thisYear] = [today.getDate(),today.getMonth(),today.getFullYear()]
    const [tDay, tMonth, tYear] = [tommorow.getDate(),tommorow.getMonth(), tommorow.getFullYear()]
    const [yDay, yMonth, yYear] = [yesterday.getDate(),yesterday.getMonth(), yesterday.getFullYear()]
    const [day,month,year] = [date.getDate(),date.getMonth(),date.getFullYear()];
    

    if(day === thisDay && month === thisMonth && year === thisYear){
      return 'Today';
    }
    else if(day === tDay && month === tMonth && year === tYear ){
      return 'Tommorow'
    }
    else if(day === yDay && month === yMonth && year === yYear){
      return 'Yesterday'
    }
    else return value;
  }

}
