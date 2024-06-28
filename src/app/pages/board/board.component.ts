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
  })

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

  onClickEditById(board: BoardDTO){
    this.idOnEdit = board.id;
  }

  onSubmitPutBoard(){
    console.log(this.formEditBoard);
  }

}
