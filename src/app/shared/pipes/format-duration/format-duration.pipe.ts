import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.trunc(value);
    const minutes = Math.round((value % 1) * 60);
    let output = '';

    if (hours > 0) {
      output += hours + ' hrs ';
    }

    if (minutes > 0) {
      output += minutes + ' min';
    }

    return output;
  }

}
