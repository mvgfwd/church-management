import { Component } from '@angular/core';
import { BoardDTO } from 'src/app/core/dto/congregation.dto';
import { BoardService } from './board.service';
import { Observable, map, of, take, tap } from 'rxjs';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';
import Swal from 'sweetalert2';
import { Confirmable } from 'src/app/core/dto/confirmable.decorator';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

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

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
  });

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

  constructor(private boardService: BoardService) {
    this.boardService
      .getBoardListObs()
      .pipe(map((board) => (this.boardList$ = of(board))))
      .pipe(take(1))
      .subscribe();
  }

  @Confirmable({
    title: 'Edit Confirmation',
    html: 'Are you sure want to edit?',
  })
  onSubmitPutBoard() {
    if (this.formEditBoard.invalid) {
      this.Toast.fire({
        icon: 'warning',
        title: 'Form data is invalid',
      });
      return;
    }
    const data = this.formEditBoard.value as BoardDTO;
    const objLastCEC = Object.values(this.lastCongregationEditClicked!).sort();
    const dataObj = Object.values(data).sort();
    if (JSON.stringify(objLastCEC) === JSON.stringify(dataObj)) {
      this.Toast.fire({
        icon: 'error',
        title: 'Data not changed',
      });
      return;
    }
    this.boardService
      .putBoardById(data)
      .pipe(
        map((e) => {
          this.idOnEdit = undefined;
        })
      )
      .pipe(
        tap<void>({
          next: () => {
            this.Toast.fire({
              icon: 'success',
              title: 'Data editted succesfully',
            });
          },
          error: (e) => {
            this.Toast.fire({
              icon: 'error',
              title: 'Failed edit data',
            });
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
      this.Toast.fire({
        icon: 'error',
        title: 'Please fill all field',
      });
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
            this.Toast.fire({
              icon: 'success',
              title: 'Majelis added successfully',
            });
          },
          error: (err) => {
            this.Toast.fire({
              icon: 'error',
              title: 'Failed added data',
            });
          },
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

  ageCalculate(birthDate: string): number {
    const convertAge = new Date(birthDate);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const result = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    return result;
  }

  beautifyFungsi(str: string): string {
    let result: string = '';
    switch (str) {
      case 'PENDETA':
        result = 'Pendeta';
        break;
      case 'CALON_PENDETA':
        result = 'C.Pdt';
        break;
      case 'SINTUA':
        result = 'Sintua';
        break;
      case 'CALON_SINTUA':
        result = 'C.St';
        break;
      case 'BIBELVROUW':
        result = 'Bibelvrouw';
        break;
      case 'GURU_HURIA':
        result = 'Guru Huria';
        break;
      case 'DIAGONES':
        result = 'Diagones';
        break;
      case 'STAFF':
        result = 'Staff';
        break;
      case 'CALON_DIAGONES':
        result = 'C.Diagones';
        break;
      default:
        result = '###';
    }
    return result;
  }

  beautifyStatus(stat: string): string {
    let result = '';
    switch (stat) {
      case 'PENDIDIKAN':
        result = 'Pendidikan';
        break;
      case 'ACTIVE':
        result = 'Active';
        break;
      case 'PENSIUN':
        result = 'Pensiun';
        break;
      default:
        result = '###';
    }
    return result;
  }
}
