import { Component } from '@angular/core';
import { BoardDTO } from 'src/app/core/dto/congregation.dto';
import { BoardService } from './board.service';
import { Observable, map, of, take, tap } from 'rxjs';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';
import { Confirmable } from 'src/app/core/dto/confirmable.decorator';
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
import { BeautifyParseService } from 'src/app/services/beautify-parse.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
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
export class BoardComponent {
  boardList$: Observable<PaginationResultDTO<BoardDTO>> | undefined;
  idOnEdit: number | undefined = undefined;
  lastCongregationEditClicked: BoardDTO | undefined;
  selectedFungsi = 'STAFF';
  isAddMode = false;
  selectedStatus = 'ACTIVE';
  optionsStatus = ['PENDIDIKAN', 'ACTIVE', 'PENSIUN'];
  optionsEditStatus = ['PENDIDIKAN', 'ACTIVE', 'PENSIUN'];
  optionsEditFungsi = [
    'PENDETA',
    'CALON_PENDETA',
    'SINTUA',
    'CALON_SINTUA',
    'DIAGONES',
    'CALON_DIAGONES',
    'BIBELVROUW',
    'GURU_HURIA',
    'STAFF',
  ];

  optionsFungsi = [
    'PENDETA',
    'CALON_PENDETA',
    'SINTUA',
    'CALON_SINTUA',
    'DIAGONES',
    'CALON_DIAGONES',
    'BIBELVROUW',
    'GURU_HURIA',
    'STAFF',
  ];

  formEditBoard: FormGroup = new FormGroup<FormGroupOf<BoardDTO>>({
    name: new FormControl<string>('', Validators.required),
    birthDate: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(0),
    address: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    fungsi: new FormControl<
      | 'PENDETA'
      | 'CALON_PENDETA'
      | 'SINTUA'
      | 'CALON_SINTUA'
      | 'DIAGONES'
      | 'CALON_DIAGONES'
      | 'BIBELVROUW'
      | 'GURU_HURIA'
      | 'STAFF'
    >('STAFF', Validators.required),
    status: new FormControl<'PENDIDIKAN' | 'ACTIVE' | 'PENSIUN'>(
      'ACTIVE',
      Validators.required
    ),
    id: new FormControl<number | null>(null),
  });

  formBoard: FormGroup = new FormGroup<FormGroupOf<BoardDTO>>({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', Validators.required),
    age: new FormControl<number | undefined>(undefined),
    birthDate: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    fungsi: new FormControl<
      | 'PENDETA'
      | 'CALON_PENDETA'
      | 'SINTUA'
      | 'CALON_SINTUA'
      | 'DIAGONES'
      | 'CALON_DIAGONES'
      | 'BIBELVROUW'
      | 'GURU_HURIA'
      | 'STAFF'
    >('STAFF', Validators.required),
    status: new FormControl<'PENDIDIKAN' | 'ACTIVE' | 'PENSIUN'>(
      'ACTIVE',
      Validators.required
    ),
  });

  totalPage: number[] | undefined;

  userReq: UserRequest = {
    size: 10,
    page: 1,
    searchTerm: '',
  };

  constructor(
    private boardService: BoardService,
    private toastSvc: ToastService,
    public beautiParseSvc: BeautifyParseService
  ) {
    this.retrieveBoardData();
  }

  retrieveBoardData() {
    this.boardService
      .getBoardListObs(this.userReq)
      .pipe(
        map((board) => {
          this.boardList$ = of(board);
          this.totalPage = Array.from({ length: board.lastPage }, (_, i) => i);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  @Confirmable({
    title: 'Edit Confirmation',
    html: 'Are you sure want to edit?',
  })
  onSubmitPutBoard() {
    if (this.formEditBoard.invalid) {
      this.toastSvc.formInvalidNotif();
      return;
    }
    const data = this.formEditBoard.value as BoardDTO;
    const objLastCEC = Object.values(this.lastCongregationEditClicked!).sort();
    const dataObj = Object.values(data).sort();
    if (JSON.stringify(objLastCEC) === JSON.stringify(dataObj)) {
      this.toastSvc.formDataNotChangedNotif();
      return;
    }
    this.boardService
      .putBoardById(data)
      .pipe(
        map((e) => {
          this.idOnEdit = undefined;
          this.retrieveBoardData();
        })
      )
      .pipe(
        tap<void>({
          next: () => {
            this.toastSvc.editSuccessNotif('Majelis');
          },
          error: (e) => {
            this.toastSvc.editFailNotif('majelis');
          },
        })
      )
      .subscribe();
  }

  @Confirmable({
    title: 'Add Confirmation',
    html: 'Are you sure want to add?',
  })
  onSubmitPostBoard() {
    if (this.formBoard.invalid) {
      this.toastSvc.fillAllRequiredField();
      return;
    }
    const data = this.formBoard.value as BoardDTO;
    this.boardService
      .postBoardList(data)
      .pipe(
        map((e) => {
          console.log('e', e);
        })
      )
      .pipe(
        tap({
          next: () => {
            this.isAddMode = false;
            this.toastSvc.addSuccessNotif('Majelis');
          },
          error: (err) => {
            this.toastSvc.addFailNotif('majelis');
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
    this.boardService
      .deleteBoardById(id)
      .pipe(map((e) => {}))
      .pipe(
        tap<void>({
          next: () => {
            this.toastSvc.deleteSuccessNotif('Majelis');
            this.retrieveBoardData();
          },
          error: (e) => this.toastSvc.deleteFailNotif('majelis'),
        })
      )
      .subscribe();
  }

  onClickEditById(board: BoardDTO) {
    this.idOnEdit = board.id;
    this.lastCongregationEditClicked = board;
    this.formEditBoard.patchValue({
      name: board.name,
      birthDate: board.birthDate,
      address: board.address,
      phoneNumber: board.phoneNumber,
      fungsi: board.fungsi,
      status: board.status,
      id: board.id,
      age: board.age,
    });
  }

  onClickChangePage(page: number) {
    this.userReq.page = page;
    this.boardService
      .getBoardListObs(this.userReq)
      .pipe(
        map((e) => {
          this.boardList$ = of(e);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  async onClickFilter(str: string) {
    if (str === '') {
      this.userReq.page = 1;
      this.retrieveBoardData();
      return;
    }
    this.boardService
      .searchBoardObs(str)
      .pipe(
        map((e) => {
          this.boardList$ = of(e);
          this.totalPage = Array.from({ length: e.lastPage }, (_, i) => i);
        })
      )
      .pipe(take(1))
      .subscribe();
  }
}
