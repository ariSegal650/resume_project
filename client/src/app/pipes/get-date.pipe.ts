import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDate'
})
export class GetDatePipe implements PipeTransform {

  transform(date: Date): string {
    var kl =date;
  
    if (kl.getDate() != 16) {
    
      return (1 + kl.getMonth()).toString() + "/" + kl.getFullYear().toString();
    }
    else{
      return ''
    }
  }

}
