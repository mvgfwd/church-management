import { Injectable } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
import { OutcomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';

Injectable();
export class OutcomeService {
  PaginationOutcomeList: PaginationResultDTO<OutcomeDTO> = {
    currentPage: 1,
    totalItems: 2,
    lastPage: 2,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [
      {
        outcomeId: 1,
        outcomeDeposit: '1023000',
        dateOutcome: new Date('2024-11-17'),
      },
      {
        outcomeId: 2,
        outcomeBuilding: '1170000',
        dateOutcome: new Date('2024-11-30'),
      },
      {
        outcomeId: 3,
        outcomeOperational: '800000',
        dateOutcome: new Date('2024-12-01'),
      },
      {
        outcomeId: 4,
        outcomeEvent: '1100000',
        outcomeBuilding: '500000',
        dateOutcome: new Date('2024-12-31'),
      },
    ],
  };

  getOutcomeList(): Observable<PaginationResultDTO<OutcomeDTO>> {
    return of(this.PaginationOutcomeList);
  }

  getOutcomeListDetail(str: string): Observable<PaginationResultDTO<OutcomeDTO>>{
    switch(str){
      case 'All Category':
        return of(this.PaginationOutcomeList);
      case 'Deposit': 
        const resDep = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter(item => 
              item.hasOwnProperty('outcomeDeposit')
            )
        };
        return of(resDep);
      case 'Pembangunan':
        const resBuild = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter(item => 
              item.hasOwnProperty('outcomeBuilding')
            )
        };
        return of(resBuild)
      case 'Diakonia':
        const resDiakonia = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter(item => 
              item.hasOwnProperty('outcomeDiakonia')
            )
        };
        return of(resDiakonia);
      case 'Pelayanan':
        const resGuest = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter(item => 
              item.hasOwnProperty('outcomeGuest')
            )
        };
        return of(resGuest);
      case 'Operasional':
        const resOperational = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter(item => 
              item.hasOwnProperty('outcomeOperational')
            )
        };
        return of(resOperational);
      case 'Acara':
        const resEvent = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter(item => 
              item.hasOwnProperty('outcomeEvent')
            )
        };
        return of(resEvent);
      case 'Lainnya':
        const resOther = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter(item => 
              item.hasOwnProperty('outcomeOther')
            )
        };
        return of(resOther);
      default:
        return of(this.PaginationOutcomeList)
    }
  }

  countOutcomeByCategory(cat: string): number {
    let nominal = 0;
    switch (cat) {
      case 'All Category':
        of(this.PaginationOutcomeList)
          .pipe(
            map((x) => {
              x.data.forEach((outcome) => {
                if (outcome.outcomeBuilding) {
                  nominal += parseInt(outcome.outcomeBuilding);
                }
                if (outcome.outcomeDeposit) {
                  nominal += parseInt(outcome.outcomeDeposit);
                }
                if (outcome.outcomeDiakonia) {
                  nominal += parseInt(outcome.outcomeDiakonia);
                }
                if (outcome.outcomeEvent) {
                  nominal += parseInt(outcome.outcomeEvent);
                }
                if (outcome.outcomeGuest) {
                  nominal += parseInt(outcome.outcomeGuest);
                }
                if (outcome.outcomeOperational) {
                  nominal += parseInt(outcome.outcomeOperational);
                }
                if (outcome.outcomeOther) {
                  nominal += parseInt(outcome.outcomeOther);
                }
              });
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Pembangunan':
        of(this.PaginationOutcomeList)
          .pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('outcomeBuilding')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.outcomeBuilding!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Deposit':
        of(this.PaginationOutcomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('outcomeDeposit')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.outcomeDeposit!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Pelayanan':
        of(this.PaginationOutcomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('outcomeGuest')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.outcomeGuest!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Operasional':
        of(this.PaginationOutcomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('outcomeOperational')
              );
              nominal = res.reduce(
                (bf, aft) => bf + +aft.outcomeOperational!,
                0
              );
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Acara':
        of(this.PaginationOutcomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('outcomeEvent')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.outcomeEvent!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Diakonia':
        of(this.PaginationOutcomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('outcomeDiakonia')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.outcomeDiakonia!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      case 'Lainnya':
        of(this.PaginationOutcomeList)
          ?.pipe(
            map((incRes) => {
              const res = incRes.data.filter((item) =>
                item.hasOwnProperty('outcomeOther')
              );
              nominal = res.reduce((bf, aft) => bf + +aft.outcomeOther!, 0);
            })
          )
          .pipe(take(1))
          .subscribe();
        break;
      default:
        break;
    }
    return nominal;
  }
}
