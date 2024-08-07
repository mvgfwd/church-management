import { Component, OnInit } from '@angular/core';
import { IncomeDTO, OutcomeDTO } from 'src/app/core/dto/financial.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { IncomeService } from './income.service';
import { Observable, map, of, take, tap } from 'rxjs';
import { OutcomeService } from './outcome.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';
import { Confirmable } from 'src/app/core/dto/confirmable.decorator';
import { ToastService } from 'src/app/core/services/toast.service';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css'],
  animations: [
    trigger('slideInDown', [
      state('true', style({ height: '*', transform: 'translateY(0px)' })),
      state(
        'false',
        style({
          height: 0,
          opacity: 0.5,
          transform: 'translateY(-40px)',
        })
      ),
      transition(
        'false => true',
        animate(
          '300ms ease-in',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
            style({
              opacity: 0.1,
              transform: 'translateY(-10px)',
              offset: 0.1,
              height: 0,
            }),
            style({
              opacity: 1,
              transform: 'translateY(0)',
              offset: 1.0,
              height: '*',
            }),
          ])
        )
      ),
      transition(
        'true => false',
        animate(
          '200ms 250ms ease-out',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateY(0%)',
              height: '*',
              offset: 0,
            }),
            style({
              opacity: 0.6,
              offset: 0.4,
            }),
            style({
              opacity: 0,
              transform: 'translateY(-10px)',
              height: 0,
              offset: 1,
            }),
          ])
        )
      ),
    ]),
    trigger('justifyContent', [
      state(
        'center',
        style({
          // justifyContent: 'center',
          position: 'absolute',
          left: '0',
          // transform: 'translateX(calc(100% - 177px))',
          width: '177px',
        })
      ),
      state(
        'end',
        style({
          // transform: 'translateX(100%)',
          position: 'absolute',
          transform: 'translateX(calc(100% - 90px))',
          width: '177px',
        })
      ),
      transition('center <=> end', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class FinancialComponent implements OnInit {
  get justifyState() {
    return !this.isAddIncomeActive && !this.isAddOutcomeActive
      ? 'center'
      : 'end';
  }
  // incomeSummary: Observable<PaginationResultDTO<IncomeDTO>> | undefined;
  incomeListDetail$: Observable<PaginationResultDTO<IncomeDTO>> | undefined;
  outcomeListDetail$: Observable<PaginationResultDTO<OutcomeDTO>> | undefined;
  incomeNominal = 0;
  outcomeNominal = 0;
  incomeMonth: string = '2024';
  incomeCategory: string = 'Perpuluhan';
  outcomeCategory: string = 'All Category';
  totalPageIncome: number[] = [];
  totalPageOutcome: number[] = [];
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

  userReq: UserRequest = {
    size: 10,
    page: 1,
    searchTerm: '',
  };

  isIncomeDetailShow = true; // if false show outcome detail

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
      .pipe(
        tap<void>({
          next: () => {
            this.incomeForm.reset();
            this.toastSvc.addSuccessNotif('Income data');
          },
          error: (e) => {
            this.toastSvc.addFailNotif('income data');
          },
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
      .pipe(
        tap<void>({
          next: () => {
            this.outcomeForm.reset();
            this.toastSvc.addSuccessNotif('Outcome data');
          },
          error: (e) => {
            this.toastSvc.addFailNotif('outcome data');
          },
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
      .getIncomeListDetail({ page: 1, size: 10 }, str)
      .pipe(
        map((inc) => {
          this.incomeListDetail$ = of(inc);
          this.totalPageIncome = Array.from(
            { length: inc.lastPage },
            (_, i) => i
          );
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
      .getOutcomeListDetail({ page: 1, size: 10 }, str)
      .pipe(
        map((outc) => {
          this.outcomeListDetail$ = of(outc);
          this.totalPageOutcome = Array.from(
            { length: outc.lastPage },
            (_, i) => i
          );
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
      if (obj[key] !== '' && obj[key] !== null) {
        console.log(obj, obj[key]);
        cleanedObj[key] = String(obj[key]);
      }
    }
    return cleanedObj;
  }

  onClickChangePageIncome(page: number, str: string) {
    this.userReq.page = page;
    this.incomeSvc
      .getIncomeListDetail(this.userReq, str)
      .pipe(
        map((e) => {
          this.incomeListDetail$ = of(e);
        })
      )
      .pipe(take(1))
      .subscribe();
    // this.userReq.page = page;
    // this.getWebMobileList();
  }

  onClickChangePageOutcome(page: number, str: string) {
    this.userReq.page = page;
    this.outcomeSvc
      .getOutcomeListDetail(this.userReq, str)
      .pipe(
        map((e) => {
          this.outcomeListDetail$ = of(e);
        })
      )
      .pipe(take(1))
      .subscribe();
  }
}
