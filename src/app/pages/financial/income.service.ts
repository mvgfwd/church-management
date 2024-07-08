import { Injectable } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
import { IncomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

Injectable();
export class IncomeService {
  PaginationIncomeList: PaginationResultDTO<IncomeDTO> = {
    currentPage: 1,
    totalItems: 0,
    lastPage: 0,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [],
  };

    // CONSTRUCTOR FOR DUMMY DATA SUPPORT
    constructor() {
      this.PaginationIncomeList.data = [
      {
        incomeId: 1,
        incomeGive: '1000000',
        incomeBuilding: '400000',
        description: 'No Name',
        dateIncome: '16-11-2024',
      },
      {
        incomeId: 2,
        incomeBuilding: '1200000',
        incomeTenth: '180000',
        description: 'Andreas Dolok Saribu',
        dateIncome: '29-11-2024',
      },
      {
        incomeId: 3,
        incomeService: '800000',
        description: 'Linggom Marbun',
        dateIncome: '28-12-2024',
      },
      {
        incomeId: 5,
        incomeOther: '50000',
        incomeTenth: '1500000',
        description: 'Partopak Holit',
        dateIncome: '31-12-2024',
      },
      {
        incomeId: 6,
        incomeTenth: '1110000',
        incomeBuilding: '2000000',
        description: 'Juang M. Pasaribu',
        dateIncome: '31-12-2024',
      },
      {
        incomeId: 7,
        incomeService: '500000',
        incomeTenth: '1000000',
        description: 'Simon Cibro',
        dateIncome: '17-08-2024',
      },
      {
        incomeId: 8,
        incomeService: '1550000',
        incomeTenth: '2500000',
        description: 'Okto Siburian',
        dateIncome: '28-09-2024',
      },
      {
        incomeId: 9,
        incomeGive: '2100000',
        incomeTenth: '1110000',
        incomeBuilding: '500000',
        description: 'Evan Manalu',
        dateIncome: '10-10-2024',
      },
      {
        incomeId: 10,
        incomeGive: '1000000',
        incomeTenth: '2300000',
        description: 'Munir Siregar',
        dateIncome: '31-12-2024',
      },
      {
        incomeId: 11,
        incomeGive: '100000',
        incomeTenth: '2110000',
        description: 'Tomson Barus',
        dateIncome: '20-12-2024',
      },
      {
        incomeId: 12,
        incomeService: '1200000',
        incomeTenth: '1090000',
        incomeDonate: '10000',
        description: 'Raja Nainggolan',
        dateIncome: '25-12-2024',
      },
      {
        incomeId: 13,
        incomeOther: '1700000',
        incomeTenth: '1110000',
        incomeDonate: '10000',
        description: 'Inang Panjaitan',
        dateIncome: '23-12-2024',
      },
      {
        incomeId: 14,
        incomeOther: '1800000',
        incomeTenth: '1210000',
        incomeDonate: '100000',
        description: 'Giat J. Sagala',
        dateIncome: '23-12-2024',
      },
      ]
      this.PaginationIncomeList.totalItems = this.PaginationIncomeList.data.length;

      this.PaginationIncomeList.lastPage = Math.ceil(
        this.PaginationIncomeList.data.length /
          this.PaginationIncomeList.totalItemsPerPage
      );
  
      this.PaginationIncomeList.currentPage === this.PaginationIncomeList.lastPage
        ? (this.PaginationIncomeList.hasNext = false)
        : (this.PaginationIncomeList.hasNext = true);
  
      this.PaginationIncomeList.currentPage === 1
        ? (this.PaginationIncomeList.hasPrev = false)
        : (this.PaginationIncomeList.hasPrev = true);
    }

  getIncomeList(userReq: UserRequest): Observable<PaginationResultDTO<IncomeDTO>> {
    // DUMMY PER-PAGE-AN
    const curPage = (this.PaginationIncomeList.currentPage = userReq.page!);
    userReq.page! > 1
      ? (this.PaginationIncomeList.hasPrev = true)
      : (this.PaginationIncomeList.hasPrev = false);
    userReq.page! === this.PaginationIncomeList.lastPage
      ? (this.PaginationIncomeList.hasNext = false)
      : (this.PaginationIncomeList.hasNext = true);
    this.PaginationIncomeList.lastPage = Math.ceil(
      this.PaginationIncomeList.data.length / userReq.size!
    );
    // DUMMY PERDATAAN
    const start = (curPage - 1) * userReq.size!;
    const end = start + userReq.size!;
    let data = this.PaginationIncomeList.data.slice(start, end);
    return of({ ...this.PaginationIncomeList, data, curPage });
  }

  postIncomeData(form: IncomeDTO): Observable<number> {
    const res = this.PaginationIncomeList.data.push({
      ...form,
      incomeId: this.PaginationIncomeList.data.length + 1,
    });
    return of(res);
  }

  getIncomeListDetail(userReq: UserRequest, str: string): Observable<PaginationResultDTO<IncomeDTO>> {
    // DUMMY PER-PAGE-AN
    const curPage = (this.PaginationIncomeList.currentPage = userReq.page!);
    userReq.page! > 1
      ? (this.PaginationIncomeList.hasPrev = true)
      : (this.PaginationIncomeList.hasPrev = false);
    userReq.page! === this.PaginationIncomeList.lastPage
      ? (this.PaginationIncomeList.hasNext = false)
      : (this.PaginationIncomeList.hasNext = true);
    this.PaginationIncomeList.lastPage = Math.ceil(
      this.PaginationIncomeList.data.length / userReq.size!
    );
    // DUMMY PERDATAAN
    const start = (curPage - 1) * userReq.size!;
    const end = start + userReq.size!;
    switch (str) {
      case 'All Category':
        return of({ ...this.PaginationIncomeList });
      case 'Persembahan':
        const resGive = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeGive')
          ).slice(start, end),
        };
        return of({ ...resGive });
      case 'Perpuluhan':
        const resTenth = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeTenth')
            ).slice(start, end),
          };
          // let data = this.PaginationIncomeList.data.slice(start, end);
        return of({ ...resTenth });
      case 'Pembangunan':
        const resBuilding = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeBuilding')
          ).slice(start, end),
        };
        return of({ ...resBuilding });
      case 'Service':
        const resService = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeService')
          ).slice(start, end),
        };
        return of({ ...resService });
      case 'Donasi':
        const resDonate = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeDonate')
          ).slice(start, end),
        };
        return of({ ...resDonate });
      case 'Lainnya':
        const resOther = {
          ...this.PaginationIncomeList,
          data: this.PaginationIncomeList.data.filter((item) =>
            item.hasOwnProperty('incomeOther')
          ).slice(start, end),
        };
        return of({ ...resOther });
      default:
        return of({ ...this.PaginationIncomeList});
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
