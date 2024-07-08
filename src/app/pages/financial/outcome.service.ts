import { Injectable } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
import { OutcomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

Injectable();
export class OutcomeService {
  PaginationOutcomeList: PaginationResultDTO<OutcomeDTO> = {
    currentPage: 1,
    totalItems: 0,
    lastPage: 0,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [],
  };

  constructor() {
    this.PaginationOutcomeList.data = [
      {
        outcomeId: 1,
        outcomeDeposit: '1023000',
        dateOutcome: '17-11-2024',
      },
      {
        outcomeId: 2,
        outcomeBuilding: '1170000',
        dateOutcome: '30-11-2024',
      },
      {
        outcomeId: 3,
        outcomeOperational: '800000',
        dateOutcome: '01-12-2024',
      },
      {
        outcomeId: 4,
        outcomeEvent: '1100000',
        outcomeBuilding: '500000',
        dateOutcome: '31-12-2024',
      },
    ];
    this.PaginationOutcomeList.totalItems =
      this.PaginationOutcomeList.data.length;

    this.PaginationOutcomeList.lastPage = Math.ceil(
      this.PaginationOutcomeList.data.length /
        this.PaginationOutcomeList.totalItemsPerPage
    );

    this.PaginationOutcomeList.currentPage ===
    this.PaginationOutcomeList.lastPage
      ? (this.PaginationOutcomeList.hasNext = false)
      : (this.PaginationOutcomeList.hasNext = true);

    this.PaginationOutcomeList.currentPage === 1
      ? (this.PaginationOutcomeList.hasPrev = false)
      : (this.PaginationOutcomeList.hasPrev = true);
  }

  // getOutcomeList(
  //   userReq: UserRequest
  // ): Observable<PaginationResultDTO<OutcomeDTO>> {
  //   // DUMMY PER-PAGE-AN
  //   const curPage = (this.PaginationOutcomeList.currentPage = userReq.page!);
  //   userReq.page! > 1
  //     ? (this.PaginationOutcomeList.hasPrev = true)
  //     : (this.PaginationOutcomeList.hasPrev = false);
  //   userReq.page! === this.PaginationOutcomeList.lastPage
  //     ? (this.PaginationOutcomeList.hasNext = false)
  //     : (this.PaginationOutcomeList.hasNext = true);
  //   this.PaginationOutcomeList.lastPage = Math.ceil(
  //     this.PaginationOutcomeList.data.length / userReq.size!
  //   );
  //   // DUMMY PERDATAAN
  //   const start = (curPage - 1) * userReq.size!;
  //   const end = start + userReq.size!;
  //   let data = this.PaginationOutcomeList.data.slice(start, end);
  //   return of({ ...this.PaginationOutcomeList, data, curPage });
  // }

  postOutcomeData(form: OutcomeDTO): Observable<number> {
    const res = this.PaginationOutcomeList.data.push({
      ...form,
      outcomeId: this.PaginationOutcomeList.data.length + 1,
    });
    return of(res);
  }

  getOutcomeListDetail(
    userReq: UserRequest,
    str: string
  ): Observable<PaginationResultDTO<OutcomeDTO>> {
    const start = (userReq.page! - 1) * userReq.size!;
    const end = start + userReq.size!;
    switch (str) {
      case 'All Category':
        return of(this.PaginationOutcomeList);
      case 'Deposit':
        const resDep = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter((item) =>
            item.hasOwnProperty('outcomeDeposit')
          ),
        };
        resDep.totalItems = resDep.data.length;
        resDep.lastPage = Math.ceil(resDep.data.length / userReq.size!);
        resDep.currentPage = userReq.page!;
        userReq.page! > 1 ? (resDep.hasPrev = true) : (resDep.hasPrev = false);
        userReq.page! === resDep.lastPage || resDep.lastPage === 0
          ? (resDep.hasNext = false)
          : (resDep.hasNext = true);
        return of({ ...resDep, data: resDep.data.slice(start, end) });
      case 'Pembangunan':
        const resBuild = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter((item) =>
            item.hasOwnProperty('outcomeBuilding')
          ),
        };
        resBuild.totalItems = resBuild.data.length;
        resBuild.lastPage = Math.ceil(resBuild.data.length / userReq.size!);
        resBuild.currentPage = userReq.page!;
        userReq.page! > 1
          ? (resBuild.hasPrev = true)
          : (resBuild.hasPrev = false);
        userReq.page! === resBuild.lastPage || resBuild.lastPage === 0
          ? (resBuild.hasNext = false)
          : (resBuild.hasNext = true);
        return of({ ...resBuild, data: resBuild.data.slice(start, end) });
      case 'Diakonia':
        const resDiakonia = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter((item) =>
            item.hasOwnProperty('outcomeDiakonia')
          ),
        };
        resDiakonia.totalItems = resDiakonia.data.length;
        resDiakonia.lastPage = Math.ceil(
          resDiakonia.data.length / userReq.size!
        );
        resDiakonia.currentPage = userReq.page!;
        userReq.page! > 1
          ? (resDiakonia.hasPrev = true)
          : (resDiakonia.hasPrev = false);
        userReq.page! === resDiakonia.lastPage || resDiakonia.lastPage === 0
          ? (resDiakonia.hasNext = false)
          : (resDiakonia.hasNext = true);
        return of({ ...resDiakonia, data: resDiakonia.data.slice(start, end) });
      case 'Pelayanan':
        const resGuest = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter((item) =>
            item.hasOwnProperty('outcomeGuest')
          ),
        };
        resGuest.totalItems = resGuest.data.length;
        resGuest.lastPage = Math.ceil(resGuest.data.length / userReq.size!);
        resGuest.currentPage = userReq.page!;
        userReq.page! > 1
          ? (resGuest.hasPrev = true)
          : (resGuest.hasPrev = false);
        userReq.page! === resGuest.lastPage || resGuest.lastPage === 0
          ? (resGuest.hasNext = false)
          : (resGuest.hasNext = true);
        return of({ ...resGuest, data: resGuest.data.slice(start, end) });
      case 'Operasional':
        const resOperational = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter((item) =>
            item.hasOwnProperty('outcomeOperational')
          ),
        };
        resOperational.totalItems = resOperational.data.length;
        resOperational.lastPage = Math.ceil(
          resOperational.data.length / userReq.size!
        );
        resOperational.currentPage = userReq.page!;
        userReq.page! > 1
          ? (resOperational.hasPrev = true)
          : (resOperational.hasPrev = false);
        userReq.page! === resOperational.lastPage ||
        resOperational.lastPage === 0
          ? (resOperational.hasNext = false)
          : (resOperational.hasNext = true);
        return of({
          ...resOperational,
          data: resOperational.data.slice(start, end),
        });
      case 'Acara':
        const resEvent = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter((item) =>
            item.hasOwnProperty('outcomeEvent')
          ),
        };
        resEvent.totalItems = resEvent.data.length;
        resEvent.lastPage = Math.ceil(resEvent.data.length / userReq.size!);
        resEvent.currentPage = userReq.page!;
        userReq.page! > 1
          ? (resEvent.hasPrev = true)
          : (resEvent.hasPrev = false);
        userReq.page! === resEvent.lastPage || resEvent.lastPage === 0
          ? (resEvent.hasNext = false)
          : (resEvent.hasNext = true);
        return of({ ...resEvent, data: resEvent.data.slice(start, end) });
      case 'Lainnya':
        const resOther = {
          ...this.PaginationOutcomeList,
          data: this.PaginationOutcomeList.data.filter((item) =>
            item.hasOwnProperty('outcomeOther')
          ),
        };
        resOther.totalItems = resOther.data.length;
        resOther.lastPage = Math.ceil(resOther.data.length / userReq.size!);
        resOther.currentPage = userReq.page!;
        userReq.page! > 1
          ? (resOther.hasPrev = true)
          : (resOther.hasPrev = false);
        userReq.page! === resOther.lastPage || resOther.lastPage === 0
          ? (resOther.hasNext = false)
          : (resOther.hasNext = true);
        return of({ ...resOther, data: resOther.data.slice(start, end) });
      default:
        return of(this.PaginationOutcomeList);
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
