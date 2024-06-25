import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CongregationDTO } from "src/app/core/dto/congregation.dto";
import { HttpService } from "src/app/services/http.service";

@Injectable()
export class CongregationService{
    CongregationList: CongregationDTO[] = [
        {    
            name: 'John Matthew S.Th',
            age: 67,
            birthDate: '08 Agustus 1957',
            address: 'Jl. Poris no.34 RT01/RW01 Tangerang Sektor IV',
            phoneNumber: '081234567890'
        },
        {    
            name: 'ir. Ricky Marnaek Sibarani',
            age: 23,
            birthDate: '08 Agustus 1957',
            address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
            phoneNumber: '081209876543'
        },

    ]

    getCongregationListObs(): Observable<CongregationDTO[]>{
        return of(this.CongregationList);
    }
}