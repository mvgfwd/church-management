import { Component, OnInit } from '@angular/core';
import { IncomeDTO, OutcomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { IncomeService } from './income.service';
import { Observable, map, of, take, tap } from 'rxjs';
import { OutcomeService } from './outcome.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';
import { Confirmable } from 'src/app/core/dto/confirmable.decorator';
import { ToastService } from 'src/app/services/toast.service';

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
  incomeCategory: string = 'All Category';
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
  outcomeInputOptions: string[] = [
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

  // input show variable
  isInputShow: boolean = false;
  isAddIncomeActive: boolean = false;
  isAddOutcomeActive: boolean = false;

  // income form
  incomeForm = new FormGroup<FormGroupOf<IncomeDTO>>({
    dateIncome: new FormControl<string | null>('', Validators.required),
    incomeGive: new FormControl<string>(''),
    incomeTenth: new FormControl<string>(''),
    incomeBuilding: new FormControl<string>(''),
    incomeService: new FormControl<string>(''),
    incomeDonate: new FormControl<string>(''),
    incomeOther: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  // outcome form
  outcomeForm = new FormGroup<FormGroupOf<OutcomeDTO>>({
    dateOutcome: new FormControl<string | null>('', Validators.required),
    outcomeBuilding: new FormControl<string>(''),
    outcomeDeposit: new FormControl<string>(''),
    outcomeDiakonia: new FormControl<string>(''),
    outcomeEvent: new FormControl<string>(''),
    outcomeGuest: new FormControl<string>(''),
    outcomeOperational: new FormControl<string>(''),
    outcomeOther: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  constructor(
    private incomeSvc: IncomeService,
    private outcomeSvc: OutcomeService,
    private toastSvc: ToastService
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
    const x = this.parseToIncomeProperty(str);
    return x;
  }

  @Confirmable({
    title: 'Add Income Confirmation',
    html: 'Are you sure want to add income?',
  })
  onClickAddIncomeDetail() {
    if (this.incomeForm.invalid) {
      this.toastSvc.formInvalidNotif('date');
      return;
    }
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

  @Confirmable({
    title: 'Add Outcome Confirmation',
    html: 'Are you sure want to add outcome?',
  })
  onClickAddOutcomeDetail() {
    if (this.outcomeForm.invalid) {
      this.toastSvc.formInvalidNotif('date');
      return;
    }
    this.outcomeForm.value.dateOutcome = this.formatDate(
      this.outcomeForm.value.dateOutcome!
    );
    const form = this.outcomeForm.value as OutcomeDTO;
    const cleaned = this.cleanObject(form);
    this.outcomeSvc
      .postOutcomeData(cleaned)
      .pipe(
        map((e) => {
          this.retrieveOutcomeListDetail(this.outcomeCategory);
          this.countOutNom();
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

  parseToIncomeProperty(str: string): string {
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

  parseToOutcomeProperty(str: string): string {
    let res: string = '';
    switch (str) {
      case 'Deposit':
        return (res = 'outcomeDeposit');
      case 'Pembangunan':
        return (res = 'outcomeBuilding');
      case 'Diakonia':
        return (res = 'outcomeDiakonia');
      case 'Pelayanan':
        return (res = 'outcomeGuest');
      case 'Operasional':
        return (res = 'outcomeOperational');
      case 'Acara':
        return (res = 'outcomeEvent');
      case 'Lainnya':
        return (res = 'outcomeOther');
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

  showSimpleDate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    const shortYear = year.slice(-2);
    return `${day}/${month}/${shortYear}`;
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
