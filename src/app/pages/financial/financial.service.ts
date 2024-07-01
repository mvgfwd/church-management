import { Injectable } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
import { IncomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';

Injectable();
export class FinancialService {
  PaginationIncomeList: PaginationResultDTO<IncomeDTO> = {
    currentPage: 1,
    totalItems: 2,
    lastPage: 2,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [
      {
        incomeId: 1,
        incomeGive: '1000000',
        dateIncome: new Date('2024-11-16'),
      },
      {
        incomeId: 2,
        incomeBuilding: '1200000',
        dateIncome: new Date('2024-11-29'),
      },
      {
        incomeId: 3,
        incomeService: '800000',
        dateIncome: new Date('2024-12-28'),
      },
      {
        incomeId: 4,
        incomeGive: '1700000',
        dateIncome: new Date('2024-12-31'),
      },
    ],
  };

  getIncomeList(): Observable<PaginationResultDTO<IncomeDTO>> {
    return of(this.PaginationIncomeList);
  }

  countIncomeByCategory(cat: string): number {
    let nominal = 0;
    // this.incomeList
    //   ?.pipe(
    //     map((x) => {
    //       x.data.map((inc) => console.log(inc));
    //     })
    //   )
    //   .pipe(take(1))
    //   .subscribe();
    switch (cat) {
      case 'All Category':
        break;
      case 'Persembahan':
        of(this.PaginationIncomeList)
          .pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('incomeGive')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.incomeGive!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Pembangunan':
        of(this.PaginationIncomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('incomeBuilding')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.incomeBuilding!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Perpuluhan':
        of(this.PaginationIncomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('incomeTenth')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.incomeTenth!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      default:
        console.log('default');
    }
    return nominal;
  }
}
