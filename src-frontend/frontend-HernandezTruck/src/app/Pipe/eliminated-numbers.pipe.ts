import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eliminatedNumbers'
})
export class EliminatedNumbersPipe implements PipeTransform {

  transform(value: any): any {
    let valor = value.toString().substring(0,3);
    return valor;
  }
}
