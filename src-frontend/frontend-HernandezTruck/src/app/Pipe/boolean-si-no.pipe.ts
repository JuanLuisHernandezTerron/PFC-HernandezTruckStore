import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanSiNo'
})
export class BooleanSiNoPipe implements PipeTransform {
  transform(value: any): any {
    return value ? 'Si' : 'No';;
  }

}
