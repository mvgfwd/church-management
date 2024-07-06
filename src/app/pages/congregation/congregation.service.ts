import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class CongregationService {
  // DUMMY DATA FUNCTION
  totalItems(): number {
    return this.PaginationCongregationList.data.length;
  }

  // DUMMY DATA
  PaginationCongregationList: PaginationResultDTO<CongregationDTO> = {
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
    this.PaginationCongregationList.data = [
      {
        id: 1,
        name: 'John Matthew S.Th',
        age: 67,
        birthDate: '1957-12-31',
        address: 'Jl. Poris no.34 RT01/RW01 Tangerang Sektor IV',
        phoneNumber: '081234567890',
      },
      {
        id: 2,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '1977-05-28',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
      },
      {
        id: 3,
        name: 'Filpus Lumoindong',
        age: 67,
        birthDate: '1957-12-31',
        address: 'Jl. Pesing no.34 RT01/RW01 Tangerang Sektor IV',
        phoneNumber: '081234567890',
      },
      {
        id: 4,
        name: 'Albert Sianpar',
        age: 23,
        birthDate: '1977-05-30',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
      },
      {
        id: 5,
        name: 'Sandro Mangunsong',
        age: 67,
        birthDate: '1957-10-31',
        address: 'Jl. Paris no.34 RT01/RW01 Tangerang Sektor IV',
        phoneNumber: '081234567890',
      },
      {
        id: 6,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '1977-05-28',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
      },
      {
        id: 7,
        name: 'John Matthew S.Th',
        age: 67,
        birthDate: '1957-12-31',
        address: 'Jl. Poris no.34 RT01/RW01 Tangerang Sektor IV',
        phoneNumber: '081234567890',
      },
      {
        id: 8,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '1977-05-28',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
      },
      {
        id: 9,
        name: 'John Matthew S.Th',
        age: 67,
        birthDate: '1957-12-31',
        address: 'Jl. Poris no.34 RT01/RW01 Tangerang Sektor IV',
        phoneNumber: '081234567890',
      },
      {
        id: 10,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '1977-10-28',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
      },
      {
        id: 11,
        name: 'Budiono Siregar',
        age: 67,
        birthDate: '1979-01-27',
        address: 'Jl. Indah no.34 RT01/RW01 Tangerang Sektor IV',
        phoneNumber: '081234567890',
      },
      {
        id: 12,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '1977-11-28',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
      },
    ];

    this.PaginationCongregationList.totalItems =
      this.PaginationCongregationList.data.length;

    this.PaginationCongregationList.lastPage = Math.ceil(
      this.PaginationCongregationList.data.length /
        this.PaginationCongregationList.totalItemsPerPage
    );

    this.PaginationCongregationList.currentPage ===
    this.PaginationCongregationList.lastPage
      ? (this.PaginationCongregationList.hasNext = false)
      : (this.PaginationCongregationList.hasNext = true);

    this.PaginationCongregationList.currentPage === 1
      ? (this.PaginationCongregationList.hasPrev = false)
      : (this.PaginationCongregationList.hasPrev = true);
  }

  getCongregationListObs(
    userReq: UserRequest
  ): Observable<PaginationResultDTO<CongregationDTO>> {
    // DUMMY PER-PAGE-AN
    const curPage = (this.PaginationCongregationList.currentPage =
      userReq.page!);
    userReq.page! > 1
      ? (this.PaginationCongregationList.hasPrev = true)
      : (this.PaginationCongregationList.hasPrev = false);
    userReq.page! === this.PaginationCongregationList.lastPage
      ? (this.PaginationCongregationList.hasNext = false)
      : (this.PaginationCongregationList.hasNext = true);
    this.PaginationCongregationList.lastPage = Math.ceil(
      this.PaginationCongregationList.data.length / userReq.size!
    );
    // DUMMY PERDATAAN
    const start = (curPage - 1) * userReq.size!;
    const end = start + userReq.size!;
    let data = this.PaginationCongregationList.data.slice(start, end);
    data = data.slice(0, userReq.size);
    return of({ ...this.PaginationCongregationList, data, curPage });
  }

  postCongregation(data: CongregationDTO): Observable<number> {
    const result = this.PaginationCongregationList.data.push({
      ...data,
      id: this.PaginationCongregationList.data.length + 1,
    });
    return of(result);
  }

  deleteCongregationById(
    id: number
  ): Observable<PaginationResultDTO<CongregationDTO>> {
    const index = this.PaginationCongregationList.data.findIndex(
      (e) => e.id === id
    );
    const spliced = this.PaginationCongregationList.data.splice(index, 1);
    const result = { ...this.PaginationCongregationList, spliced };
    return of(result);
  }

  putCongregtionById(
    data: CongregationDTO
  ): Observable<PaginationResultDTO<CongregationDTO>> {
    const index = this.PaginationCongregationList.data.findIndex(
      (e) => e.id === data.id
    );
    const updatedData = (this.PaginationCongregationList.data[index] = data);
    const result = { ...this.PaginationCongregationList, updatedData };
    return of(result);
  }
}
