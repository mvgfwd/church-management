import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoardDTO, CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class BoardService {
  BoardList: PaginationResultDTO<BoardDTO> = {
    currentPage: 1,
    totalItems: 2,
    lastPage: 2,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [
      {
        id: 1,
        name: 'Andrew Matthew S.Th',
        age: 67,
        birthDate: '08 Agustus 1957',
        address: 'Jl. Poris no.34 RT01/RW01 Tangerang Sektor IV',
        phoneNumber: '081234567890',
        fungsi: 'PENDETA',
        status: 'ACTIVE',
      },
      {
        id: 2,
        name: 'ir. Ricky Marnaek Sibarani',
        age: 23,
        birthDate: '08 Agustus 1957',
        address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
        phoneNumber: '081209876543',
        fungsi: 'SINTUA',
        status: 'PENDIDIKAN',
      },
    ],
  };

  getBoardListObs(): Observable<PaginationResultDTO<BoardDTO>> {
    return of(this.BoardList);
  }
}
