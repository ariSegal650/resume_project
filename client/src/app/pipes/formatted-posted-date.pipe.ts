import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedPostedDate'
})
export class FormattedPostedDatePipe implements PipeTransform {

  transform(str:string): string {
    const postedDate = new Date(str);
  
    // Calculate the current date
    const currentDate = new Date();
  
    // Calculate the difference in months
    const diffMonths = currentDate.getMonth() - postedDate.getMonth() +
      (currentDate.getFullYear() - postedDate.getFullYear()) * 12;
  
    // Format the result based on the difference
    if (diffMonths < 1) {
      return "less than a month ago";
    } else {
      return `before ${diffMonths} months`;
    }  }

}
