import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BoardDTO, CongregationDTO } from "src/app/core/dto/congregation.dto";
import { HttpService } from "src/app/services/http.service";

@Injectable()
export class BoardService{
    BoardList: BoardDTO[] = [
        {    
            name: 'Andrew Matthew S.Th',
            age: 67,
            birthDate: '08 Agustus 1957',
            address: 'Jl. Poris no.34 RT01/RW01 Tangerang Sektor IV',
            phoneNumber: '081234567890',
            fungsi: 'PENDETA',
            status: 'ACTIVE'
        },
        {    
            name: 'ir. Ricky Marnaek Sibarani',
            age: 23,
            birthDate: '08 Agustus 1957',
            address: 'Jl. Damai no.301 RT01/RW01 Tangerang Sektor V',
            phoneNumber: '081209876543',
            fungsi: 'SINTUA',
            status: 'PENDIDIKAN'
        },

    ]

    getBoardListObs(): Observable<BoardDTO[]>{
        return of(this.BoardList);
    }
}