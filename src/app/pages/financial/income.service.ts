import { Injectable } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
import { IncomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';

Injectable();
export class IncomeService {
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
        incomeBuilding: '400000',
        dateIncome: '16-11-2024',
      },
      {
        incomeId: 2,
        incomeBuilding: '1200000',
        incomeTenth: '180000',
        dateIncome: '29-11-2024',
      },
      {
        incomeId: 3,
        incomeService: '800000',
        dateIncome: '28-12-2024',
      },
      {
        incomeId: 4,
        incomeGive: '1700000',
        incomeTenth: '1110000',
        incomeDonate: '10000',
        description: 'Partopak Na Holit',
        dateIncome: '31-12-2024',
      },
    ],
  };

  getIncomeList(): Observable<PaginationResultDTO<IncomeDTO>> {
    return of(this.PaginationIncomeList);
  }

  postIncomeData(form: IncomeDTO): Observable<number> {
    const res = this.PaginationIncomeList.data.push({
      ...form,
      incomeId: this.PaginationIncomeList.data.length + 1,
    });
    console.log('res', this.PaginationIncomeList);
    return of(res);
  }

  getIncomeListDetail(str: string): Observable<PaginationResultDTO<IncomeDTO>> {
    switch (str) {
      case 'All Category':
        return of(this.PaginationIncomeList);
      case 'Persembahan':
        const resGive = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeGive')
          ),
        };
        return of(resGive);
      case 'Perpuluhan':
        const resTenth = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeTenth')
          ),
        };
        return of(resTenth);
      case 'Pembangunan':
        const resBuilding = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeBuilding')
          ),
        };
        return of(resBuilding);
      case 'Service':
        const resService = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeService')
          ),
        };
        return of(resService);
      case 'Donasi':
        const resDonate = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeDonate')
          ),
        };
        return of(resDonate);
      case 'Lainnya':
        const resOther = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeOther')
          ),
        };
        return of(resOther);
      default:
        return of(this.PaginationIncomeList);
    }
  }

  countIncomeByCategory(cat: string): number {
    let nominal = 0;
    switch (cat) {
      case 'All Category':
        of(this.PaginationIncomeList)
          .pipe(
            map((x) => {
              x.data.forEach((income) => {
                if (income.incomeGive) {
                  nominal += parseInt(income.incomeGive, 10);
                }
                if (income.incomeBuilding) {
                  nominal += parseInt(income.incomeBuilding, 10);
                }
                if (income.incomeService) {
                  nominal += parseInt(income.incomeService, 10);
                }
                if (income.incomeDonate) {
                  nominal += parseInt(income.incomeDonate, 10);
                }
                if (income.incomeTenth) {
                  nominal += parseInt(income.incomeTenth, 10);
                }
                if (income.incomeOther) {
                  nominal += parseInt(income.incomeOther, 10);
                }
              });
            })
          )
          .pipe(take(1))
          .subscribe();
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
      case 'Service':
        of(this.PaginationIncomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('incomeService')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.incomeService!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Donasi':
        of(this.PaginationIncomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('incomeDonate')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.incomeDonate!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Lainnya':
        of(this.PaginationIncomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('incomeOther')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.incomeOther!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      default:
    }
    return nominal;
  }
}
