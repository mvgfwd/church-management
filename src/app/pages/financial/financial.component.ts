import { Component, OnInit } from '@angular/core';
import { IncomeDTO, OutcomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { IncomeService } from './income.service';
import { Observable, map, of, take } from 'rxjs';
import { OutcomeService } from './outcome.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css'],
})
export class FinancialComponent implements OnInit {
  // incomeSummary: Observable<PaginationResultDTO<IncomeDTO>> | undefined;
  incomeListDetail$: Observable<PaginationResultDTO<IncomeDTO>> | undefined;
  outcomeListDetail$: Observable<PaginationResultDTO<OutcomeDTO>> | undefined;
  incomeNominal = 0;
  outcomeNominal = 0;
  incomeMonth: string = '2024';
  incomeCategory: string = 'Persembahan';
  outcomeCategory: string = 'All Category';
  incomeInputOptions: string[] = [
    'Persembahan',
    'Perpuluhan',
    'Pembangunan',
    'Service',
    'Donasi',
    'Lainnya',
  ];
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

  // input variable
  isInputShow: boolean = false;
  isAddIncomeActive: boolean = false;
  isAddOutcomeActive: boolean = false;

  // income form
  incomeForm = new FormGroup<FormGroupOf<IncomeDTO>>({
    dateIncome: new FormControl<string | null>(''),
    incomeGive: new FormControl<string>(''),
    incomeTenth: new FormControl<string>(''),
    incomeBuilding: new FormControl<string>(''),
    incomeService: new FormControl<string>(''),
    incomeDonate: new FormControl<string>(''),
    incomeOther: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  constructor(
    private incomeSvc: IncomeService,
    private outcomeSvc: OutcomeService
  ) {
    this.retrieveIncomeListDetail(this.incomeCategory);
    this.retrieveOutcomeListDetail(this.outcomeCategory);
  }

  ngOnInit() {
    this.incomeNominal = this.incomeSvc.countIncomeByCategory(
      this.incomeCategory
    );
    this.outcomeNominal = this.outcomeSvc.countOutcomeByCategory(
      this.outcomeCategory
    );
  }

  returnFormControlName(str: string) {
    const x = this.parseToProperty(str);
    return x;
  }

  onClickAddIncomeDetail() {
    this.incomeForm.value.dateIncome = this.formatDate(
      this.incomeForm.value.dateIncome!
    );
    const form = this.incomeForm.value as IncomeDTO;
    const cleaned = this.cleanObject(form);
    this.incomeSvc
      .postIncomeData(cleaned)
      .pipe(
        map((e) => {
          this.retrieveIncomeListDetail(this.incomeCategory);
          this.countIncNom();
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  countIncNom() {
    this.incomeNominal = this.incomeSvc.countIncomeByCategory(
      this.incomeCategory
    );
  }

  countOutNom() {
    this.outcomeNominal = this.outcomeSvc.countOutcomeByCategory(
      this.outcomeCategory
    );
  }

  countIncomePerCat(str: string): number {
    const res = this.incomeSvc.countIncomeByCategory(str);
    return res;
  }

  retrieveIncomeListDetail(str: string) {
    return this.incomeSvc
      .getIncomeListDetail(str)
      .pipe(
        map((inc) => {
          this.incomeListDetail$ = of(inc);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  countOutcomePerCat(str: string): number {
    const res = this.outcomeSvc.countOutcomeByCategory(str);
    return res;
  }

  retrieveOutcomeListDetail(str: string) {
    return this.outcomeSvc
      .getOutcomeListDetail(str)
      .pipe(
        map((inc) => {
          this.outcomeListDetail$ = of(inc);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  parseToProperty(str: string): string {
    let res: string = '';
    switch (str) {
      case 'Persembahan':
        return (res = 'incomeGive');
      case 'Perpuluhan':
        return (res = 'incomeTenth');
      case 'Pembangunan':
        return (res = 'incomeBuilding');
      case 'Service':
        return (res = 'incomeService');
      case 'Donasi':
        return (res = 'incomeDonate');
      case 'Lainnya':
        return (res = 'incomeOther');
      default:
        return (res = '');
    }
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  cleanObject(obj: any): any {
    const cleanedObj: any = {};
    for (const key in obj) {
      if (obj[key] !== '') {
        cleanedObj[key] = String(obj[key]);
      }
    }
    return cleanedObj;
  }
}
