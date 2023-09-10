import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatYear'
})
export class FormatYearPipe implements PipeTransform {

  transform(num: number): string {
    let year = 0;
    if (num > 11) {
      year = num / 12;
      return ` ${year} year`
    }
    return ` ${num} month`
    

  }

}
