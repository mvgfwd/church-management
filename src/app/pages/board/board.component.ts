import { Component } from '@angular/core';
import { BoardDTO } from 'src/app/core/dto/congregation.dto';
import { BoardService } from './board.service';
import { Observable, map, of, take } from 'rxjs';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  boardList$: Observable<PaginationResultDTO<BoardDTO>> | undefined;
  idOnEdit = false;
  selectedFungsi = 'STAFF';
  selectedStatus = 'ACTIVE';
  optionsStatus = ['PENDIDIKAN', 'ACTIVE', 'PENSIUN'];
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

  onSubmitPostBoard() {
    console.log(this.formBoard.value);
  }
}
