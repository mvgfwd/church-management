import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class CongregationService {
  CongregationList: CongregationDTO[] = [
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
  ];

  getCongregationListObs(): Observable<CongregationDTO[]> {
    return of(this.CongregationList);
  }

  postCongregation(data: CongregationDTO): Observable<number> {
    const result = this.CongregationList.push({
      ...data,
      id: this.CongregationList.length + 1,
    });
    return of(result);
  }

  deleteCongregationById(id: number): Observable<CongregationDTO[]> {
    const index = this.CongregationList.findIndex((e) => e.id === id);
    const result = this.CongregationList.splice(index, 1);
    return of(result);
  }

  putCongregtionById(data: CongregationDTO): Observable<CongregationDTO> {
    const index = this.CongregationList.findIndex((e) => e.id === data.id);
    const result = (this.CongregationList[index] = data);
    return of(result);
  }
}
