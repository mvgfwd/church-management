import { Component } from '@angular/core';
import { BoardDTO } from 'src/app/core/dto/congregation.dto';
import { BoardService } from './board.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  boardList: BoardDTO[] = [];

  constructor(private boardService: BoardService){
    this.boardService.getBoardListObs()
    .pipe(map( board => this.boardList = board))
    .pipe(take(1))
    .subscribe();
  }
}
