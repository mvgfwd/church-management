import { Component, OnInit } from '@angular/core';
import { IncomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { FinancialService } from './financial.service';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css'],
})
export class FinancialComponent implements OnInit {
  incomeList: Observable<PaginationResultDTO<IncomeDTO>> | undefined;
  incomeNominal = 0;
  incomeMonth: string = '2024';
  incomeCategory: string = 'All Category';
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
    'All Catagory',
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

  constructor(private financialSvc: FinancialService) {
    this.financialSvc
      .getIncomeList()
      .pipe((e) => (this.incomeList = e))
      .pipe(take(1))
      .subscribe();
  }

  ngOnInit() {
    this.incomeNominal = this.financialSvc.countIncomeByCategory(
      this.incomeCategory
    );
  }

  countIncNom() {
    this.incomeNominal = this.financialSvc.countIncomeByCategory(
      this.incomeCategory
    );
  }
}
