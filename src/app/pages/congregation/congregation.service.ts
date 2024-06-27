import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class CongregationService {
  PaginationCongregationList: PaginationResultDTO<CongregationDTO> = {
    currentPage: 1,
    totalItems: 2,
    lastPage: 2,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [
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
    ],
  };

  getCongregationListObs(): Observable<PaginationResultDTO<CongregationDTO>> {
    return of(this.PaginationCongregationList);
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
