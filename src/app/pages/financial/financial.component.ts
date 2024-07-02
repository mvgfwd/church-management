import { Component, OnInit } from '@angular/core';
import { IncomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { IncomeService } from './income.service';
import { Observable, map, take } from 'rxjs';
import { OutcomeService } from './outcome.service';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css'],
})
export class FinancialComponent implements OnInit {
  incomeList: Observable<PaginationResultDTO<IncomeDTO>> | undefined;
  incomeNominal = 0;
  outcomeNominal = 0;
  incomeMonth: string = '2024';
  incomeCategory: string = 'All Category';
  outcomeCategory: string = 'All Category';
  incomeOptions: string[] = [
    'All Category',
    'Persembahan',
    'Perpuluhan',
    'Pembangunan',
    'Service',
    'Donasi',
    'Lainnya',
  ];
  outcomeOptions: string[] = [
    'All Category',
    'Deposit',
    'Pembangunan',
    'Diakonia',
    'Pelayanan',
    'Operasional',
    'Acara',
    'Lainnya',
  ];
  dateOptions: string[] = [
    '2024',
    'Januari',
    'Febuari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'Oktober',
    'November',
    'Desember',
  ];

  constructor(private incomeSvc: IncomeService, private outcomeSvc: OutcomeService) {
    this.incomeSvc
      .getIncomeList()
      .pipe((e) => (this.incomeList = e))
      .pipe(take(1))
      .subscribe();
  }

  ngOnInit() {
    this.incomeNominal = this.incomeSvc.countIncomeByCategory(
      this.incomeCategory
    );

    this.outcomeNominal = this.outcomeSvc.countOutcomeByCategory(this.outcomeCategory)
  }

  countIncNom(){
    this.incomeNominal = this.incomeSvc.countIncomeByCategory(
      this.incomeCategory
    );
  }

  countOutNom() {
    this.outcomeNominal = this.outcomeSvc.countOutcomeByCategory(
      this.outcomeCategory
    );
  }
}
