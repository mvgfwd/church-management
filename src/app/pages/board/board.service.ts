import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoardDTO, CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class BoardService {
  // DUMMY DATA FUNCTION

  // DUMMY DATA
  PaginationBoardList: PaginationResultDTO<BoardDTO> = {
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
    this.PaginationBoardList.data = [
      {
        id: 1,
        name: 'Andrew Simangunsong S.Th',
        age: 67,
        birthDate: '1957-12-31',
        address: 'Jl. Poris no.34 RT01/RW01 Tangerang Sektor IV',
        phoneNumber: '081234567890',
        fungsi: 'PENDETA',
        status: 'ACTIVE',
      },
      {
        id: 2,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '1987-10-25',
        address: 'Jl. 881 Camilla Manor, Corkeryberg, GA 05925-1871',
        phoneNumber: '081209876343',
        fungsi: 'CALON_PENDETA',
        status: 'PENDIDIKAN',
      },
      {
        id: 3,
        name: 'Mabuhay Siregar',
        age: 23,
        birthDate: '1990-10-25',
        address: 'Suite 283 9088 Altenwerth Park, New Lauri, KS 53013-3339',
        phoneNumber: '081209423523',
        fungsi: 'SINTUA',
        status: 'PENDIDIKAN',
      },
      {
        id: 4,
        name: 'Andrew Matthew S.Th',
        age: 67,
        birthDate: '1979-11-31',
        address: '4990 Ortiz Parkway, North Lyman, WI 39606',
        phoneNumber: '081234565465',
        fungsi: 'SINTUA',
        status: 'ACTIVE',
      },
      {
        id: 5,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '1977-10-25',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
        fungsi: 'SINTUA',
        status: 'PENDIDIKAN',
      },
      {
        id: 6,
        name: 'Timbul Situmorang',
        age: 23,
        birthDate: '1971-11-21',
        address: 'JL Kebon Jati No. 64, Andir',
        phoneNumber: '081209876544',
        fungsi: 'SINTUA',
        status: 'PENDIDIKAN',
      },
      {
        id: 7,
        name: 'Johannes Sibuea S.H',
        age: 67,
        birthDate: '1957-12-30',
        address: 'Jl Mampang Prapatan Raya 103, Dki Jakarta',
        phoneNumber: '081234567890',
        fungsi: 'SINTUA',
        status: 'ACTIVE',
      },
      {
        id: 8,
        name: 'Sudung Sinaga',
        age: 23,
        birthDate: '1989-03-30',
        address: ' Jl Perintis Kemerdekaan Kav 149',
        phoneNumber: '081209876111',
        fungsi: 'SINTUA',
        status: 'PENDIDIKAN',
      },
      {
        id: 9,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '1977-10-25',
        address: 'Jl Kembang Abadi 7 Bl A-14/14, Dki Jakarta',
        phoneNumber: '081209876543',
        fungsi: 'SINTUA',
        status: 'PENDIDIKAN',
      },
      {
        id: 10,
        name: 'Budiono Hutagalung S.T',
        age: 67,
        birthDate: '1957-12-31',
        address: 'Kompl Pati ABRI F/24 Kuningan Tmr, Dki Jakarta',
        phoneNumber: '081234567890',
        fungsi: 'SINTUA',
        status: 'ACTIVE',
      },
      {
        id: 11,
        name: 'Andi Simangunsong',
        age: 23,
        birthDate: '1996-07-14',
        address: 'Suite 498 349 Kiehn Mews, West Leeanneberg, WV 44611',
        phoneNumber: '085789789555',
        fungsi: 'GURU_HURIA',
        status: 'PENDIDIKAN',
      },
      {
        id: 12,
        name: 'Budi Sinurat',
        age: 23,
        birthDate: '1999-08-15',
        address: '95402 Bev Glen, Port Tadshire, WV 63619',
        phoneNumber: '081341876543',
        fungsi: 'STAFF',
        status: 'PENDIDIKAN',
      },
    ];
    this.PaginationBoardList.totalItems = this.PaginationBoardList.data.length;

    this.PaginationBoardList.lastPage = Math.ceil(
      this.PaginationBoardList.data.length /
        this.PaginationBoardList.totalItemsPerPage
    );

    this.PaginationBoardList.currentPage ===
      this.PaginationBoardList.lastPage ||
    this.PaginationBoardList.lastPage === 0
      ? (this.PaginationBoardList.hasNext = false)
      : (this.PaginationBoardList.hasNext = true);

    this.PaginationBoardList.currentPage === 1
      ? (this.PaginationBoardList.hasPrev = false)
      : (this.PaginationBoardList.hasPrev = true);
  }

  getBoardListObs(
    userReq: UserRequest
  ): Observable<PaginationResultDTO<BoardDTO>> {
    // DUMMY PER-PAGE-AN
    const curPage = (this.PaginationBoardList.currentPage = userReq.page!);
    userReq.page! > 1
      ? (this.PaginationBoardList.hasPrev = true)
      : (this.PaginationBoardList.hasPrev = false);
    userReq.page! === this.PaginationBoardList.lastPage
      ? (this.PaginationBoardList.hasNext = false)
      : (this.PaginationBoardList.hasNext = true);
    this.PaginationBoardList.lastPage = Math.ceil(
      this.PaginationBoardList.data.length / userReq.size!
    );
    // DUMMY PERDATAAN
    const start = (curPage - 1) * userReq.size!;
    const end = start + userReq.size!;
    let data = this.PaginationBoardList.data.slice(start, end);
    data = data.slice(0, userReq.size);
    return of({ ...this.PaginationBoardList, data, curPage });
  }

  postBoardList(data: BoardDTO): Observable<number> {
    const result = this.PaginationBoardList.data.push({
      ...data,
      id: this.PaginationBoardList.data.length + 1,
    });
    return of(result);
  }

  deleteBoardById(
    id: number
  ): Observable<PaginationResultDTO<CongregationDTO>> {
    const index = this.PaginationBoardList.data.findIndex((e) => e.id === id);
    const spliced = this.PaginationBoardList.data.splice(index, 1);
    const result = { ...this.PaginationBoardList, spliced };
    return of(result);
  }

  putBoardById(data: BoardDTO): Observable<PaginationResultDTO<BoardDTO>> {
    const index = this.PaginationBoardList.data.findIndex(
      (e) => e.id === data.id
    );
    const updatedData = (this.PaginationBoardList.data[index] = data);
    const result = { ...this.PaginationBoardList, updatedData };
    return of(result);
  }
}
