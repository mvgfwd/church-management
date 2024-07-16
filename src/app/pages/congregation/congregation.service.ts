import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable()
export class CongregationService {
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
        name: 'Riko Manalu',
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
        name: 'Agape Sianturi',
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
        name: 'ir. Rocky Marnaek Sibarani',
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
        name: 'Lamhot Sihotang',
        age: 23,
        birthDate: '1977-11-28',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
      },
      {
        id: 13,
        name: "Parlindungan Simanjuntak",
        age: 45,
        birthDate: "1978-04-15",
        address: "Jl. Sejahtera no.45 RT02/RW01 Jakarta Barat",
        phoneNumber: "081345678901"
      },
      {
        id: 14,
        name: "Mangaradja Harahap",
        age: 36,
        birthDate: "1987-09-05",
        address: "Jl. Cendana no.18 RT03/RW02 Medan",
        phoneNumber: "081398765432"
      },
      {
        id: 15,
        name: "Hotman Situmorang",
        age: 29,
        birthDate: "1994-06-20",
        address: "Jl. Pahlawan no.12 RT04/RW01 Surabaya",
        phoneNumber: "081567890123"
      },
    
    ];

    this.PaginationCongregationList.totalItems =
      this.PaginationCongregationList.data.length;

    this.PaginationCongregationList.lastPage = Math.ceil(
      this.PaginationCongregationList.data.length /
        this.PaginationCongregationList.totalItemsPerPage
    );

    this.PaginationCongregationList.currentPage ===
      this.PaginationCongregationList.lastPage ||
    this.PaginationCongregationList.lastPage === 0
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
    this.PaginationCongregationList.lastPage = Math.ceil(
      this.PaginationCongregationList.data.length / userReq.size!
    );
    userReq.page! === this.PaginationCongregationList.lastPage ||
    this.PaginationCongregationList.lastPage === 0
      ? (this.PaginationCongregationList.hasNext = false)
      : (this.PaginationCongregationList.hasNext = true);
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
    this.PaginationCongregationList.totalItems =
      this.PaginationCongregationList.data.length;
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
    this.PaginationCongregationList.totalItems =
      this.PaginationCongregationList.data.length;
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

  searchCongregationObs(
    name: string
  ): Observable<PaginationResultDTO<CongregationDTO>> {
    let nameArr: string[] = [];
    this.PaginationCongregationList.data.map((item) =>
      nameArr.push(item.name.toLowerCase())
    );
    const likelyName = this.findMostLikelyMatches(name.toLowerCase(), nameArr);
    let congregationRes: CongregationDTO[] = [];
    likelyName.map((str) => {
      const filteredCongregation = this.PaginationCongregationList.data.filter(
        (item) => item.name.toLowerCase() === str
      );
      congregationRes = filteredCongregation;
    });
    const res = { ...this.PaginationCongregationList, data: congregationRes };
    res.lastPage = Math.ceil(res.data.length / res.totalItemsPerPage);
    res.lastPage === 1 ? (res.hasNext = false) : (res.hasNext = true);
    res.currentPage = 1;
    res.hasPrev = false;
    console.log(res);
    return of(res);
  }

  findMostLikelyMatches(query: string, data: string[]): string[] {
    if (!query) return [];
    const matches = data.filter((str) =>
      str.toLowerCase().includes(query.toLowerCase())
    );
    return matches;
  }
}
