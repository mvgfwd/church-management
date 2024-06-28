import { Component } from '@angular/core';
import { BoardDTO } from 'src/app/core/dto/congregation.dto';
import { BoardService } from './board.service';
import { Observable, map, of, take, tap } from 'rxjs';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  boardList$: Observable<PaginationResultDTO<BoardDTO>> | undefined;
  idOnEdit: number | undefined = undefined;
  selectedFungsi = 'STAFF';
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

  formEditBoard: FormGroup = new FormGroup<FormGroupOf<Partial<BoardDTO>>>({
    name: new FormControl<string>('', Validators.required),
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
    id: new FormControl<number | null>(null),
  });

  formBoard: FormGroup = new FormGroup<FormGroupOf<BoardDTO>>({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(0),
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

  onSubmitPutBoard() {
    if (this.formEditBoard.invalid) {
      this.Toast.fire({
        icon: 'warning',
        title: 'Form data is invalid',
      });
      return;
    }
    const data = this.formEditBoard.value as BoardDTO;
    // const objLastCEC = Object.values(this.lastCongregationEditClicked!).sort();
    // const dataObj = Object.values(data).sort();
    // if (JSON.stringify(objLastCEC) === JSON.stringify(dataObj)) {
    //   this.Toast.fire({
    //     icon: 'error',
    //     title: 'Data not changed',
    //   });
    //   return;
    // }
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

  onSubmitPostBoard() {
    console.log(this.formBoard.value);
  }

  onClickEditById(board: BoardDTO) {
    this.idOnEdit = board.id;
    this.formEditBoard.patchValue({
      name: board.name,
      birthDate: board.birthDate,
      address: board.address,
      phoneNumber: board.phoneNumber,
      fungsi: board.fungsi,
      status: board.status,
      id: board.id,
    });
  }

  ageCalculate(birthDate: string): number {
    const convertAge = new Date(birthDate);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const result = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    return result;
  }
}
