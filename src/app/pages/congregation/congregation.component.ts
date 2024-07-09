import { Component, OnInit } from '@angular/core';
import { CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { CongregationService } from './congregation.service';
import { Observable, map, of, take, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';
import { Confirmable } from 'src/app/core/dto/confirmable.decorator';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { ToastService } from 'src/app/services/toast.service';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

@Component({
  selector: 'app-congregation',
  templateUrl: './congregation.component.html',
  styleUrls: ['./congregation.component.css'],
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
  ],
})
export class CongregationComponent implements OnInit {
  congregationList:
    | Observable<PaginationResultDTO<CongregationDTO>>
    | undefined;
  formCongregation: FormGroup = new FormGroup<FormGroupOf<CongregationDTO>>({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    birthDate: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
  });

  isAddMode = false;
  idOnEdit: number | undefined = undefined;
  lastCongregationEditClicked: CongregationDTO | undefined;
  formEditCongregation: FormGroup = new FormGroup<
    FormGroupOf<Partial<CongregationDTO>>
  >({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    birthDate: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
  });

  totalPage: number[] | undefined;

  userReq: UserRequest = {
    size: 10,
    page: 1,
    searchTerm: '',
  };

  constructor(
    private congreService: CongregationService,
    private toastSvc: ToastService
  ) {
    this.retrieveCongregationData();
  }

  retrieveCongregationData() {
    this.congreService
      .getCongregationListObs(this.userReq)
      .pipe(
        map((cg) => {
          this.congregationList = of(cg);
          this.totalPage = Array.from({ length: cg.lastPage }, (_, i) => i);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  @Confirmable({
    title: 'Add Confirmation',
    html: 'Are you sure want to add?',
  })
  onSubmitPost() {
    if (this.formCongregation.invalid) {
      this.toastSvc.fillAllRequiredField();
      return;
    }
    const data = this.formCongregation.value as CongregationDTO;
    this.congreService
      .postCongregation(data)
      .pipe(map((e) => {}))
      .pipe(
        tap<void>({
          next: () => {
            this.formCongregation.reset();
            this.isAddMode = false;
            this.toastSvc.addSuccessNotif('Jemaat');
          },
          error: (e) => {
            this.toastSvc.addFailNotif('Jemaat');
          },
        })
      )
      .subscribe();
  }

  @Confirmable({
    title: 'Delete Confirmation',
    html: 'Are you sure want to delete?',
  })
  onClickDelete(id: number) {
    this.congreService
      .deleteCongregationById(id)
      .pipe(
        map((e) => {
          this.retrieveCongregationData();
        })
      )
      .pipe(
        tap<void>({
          next: () => {
            this.toastSvc.deleteSuccessNotif('Jemaat');
          },
          error: (e) => {
            this.toastSvc.deleteFailNotif('jemaat');
          },
        })
      )
      .subscribe();
  }

  onClickEditById(data: CongregationDTO) {
    this.idOnEdit = data.id;
    this.lastCongregationEditClicked = data;
    this.formEditCongregation.patchValue({
      name: data.name,
      age: data.age,
      birthDate: data.birthDate,
      address: data.address,
      phoneNumber: data.phoneNumber,
      id: data.id,
    });
  }

  @Confirmable({
    title: 'Edit Confirmation',
    html: 'Are you sure want to edit?',
  })
  onSubmitEdittedData() {
    if (this.formEditCongregation.invalid) {
      this.toastSvc.formInvalidNotif();
      return;
    }
    const data = this.formEditCongregation.value as CongregationDTO;
    const objLastCEC = Object.values(this.lastCongregationEditClicked!).sort();
    const dataObj = Object.values(data).sort();
    if (JSON.stringify(objLastCEC) === JSON.stringify(dataObj)) {
      this.toastSvc.formDataNotChangedNotif();
      return;
    }
    this.congreService
      .putCongregtionById(data)
      .pipe(
        map((e) => {
          this.idOnEdit = undefined;
          this.retrieveCongregationData();
        })
      )
      .pipe(
        tap<void>({
          next: () => {
            this.toastSvc.editSuccessNotif('Jemaat');
          },
          error: (e) => {
            this.toastSvc.editFailNotif('jemaat');
          },
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ageCalculate(birthDate: string): number {
    const convertAge = new Date(birthDate);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const result = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    return result;
  }

  // PAGINATION FUNCTION SUPPORT
  onClickChangePage(page: number) {
    this.userReq.page = page;
    this.retrieveCongregationData();
  }
}
