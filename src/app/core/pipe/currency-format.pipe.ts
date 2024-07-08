import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) return '';

    // Format the number with dot as thousand separator
    const formattedNumber = value.toLocaleString('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    // Prepend 'Rp' to the formatted number
    return 'Rp' + formattedNumber;
  }

}