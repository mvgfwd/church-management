import { Component, OnInit } from '@angular/core';
import { CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { CongregationService } from './congregation.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-congregation',
  templateUrl: './congregation.component.html',
  styleUrls: ['./congregation.component.css'],
})
export class CongregationComponent implements OnInit{
  congregationList: CongregationDTO[] = [];


  constructor(private congreService: CongregationService){
    this.congreService.getCongregationListObs()
    .pipe(map(cg => this.congregationList = cg))
    .pipe(take(1))
    .subscribe();
  }


  ngOnInit(): void {}
}
