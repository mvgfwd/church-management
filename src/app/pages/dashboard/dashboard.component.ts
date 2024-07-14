import { Component } from '@angular/core';
import { NewsService } from '../news/news.service';
import { map, Observable, of, take } from 'rxjs';
import { NewsDTO } from 'src/app/core/dto/news.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';
import { BoardService } from '../board/board.service';
import { BoardDTO } from 'src/app/core/dto/congregation.dto';
import { BeautifyParseService } from 'src/app/core/services/beautify-parse.service';
import { CongregationService } from '../congregation/congregation.service';
import { IncomeService } from '../financial/income.service';
import { OutcomeService } from '../financial/outcome.service';
import { SharedService } from 'src/app/core/services/shared-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  newsList$: Observable<NewsDTO[]> | undefined;
  boardList$: Observable<BoardDTO[]> | undefined;
  congreTotal: number = 0;
  incomeNominal$: Observable<number> = of(0);
  outcomeNominal$: Observable<number> = of(0);
  userReq: UserRequest = {
    size: 5,
    page: 1,
    searchTerm: '',
  };

  constructor(
    private newsSvc: NewsService,
    private boardSvc: BoardService,
    public beautiParseSvc: BeautifyParseService,
    private congreSvc: CongregationService,
    private incomeSvc: IncomeService,
    private outcomeSvc: OutcomeService,
    private sharedSvc: SharedService
  ) {
    this.newsSvc
      .getNewsListObs(this.userReq)
      .pipe(
        map((e) => {
          this.newsList$ = of(e.data);
        })
      )
      .pipe(take(1))
      .subscribe();

    this.boardSvc
      .getBoardListObs(this.userReq)
      .pipe(
        map((e) => {
          this.boardList$ = of(e.data);
        })
      )
      .pipe(take(1))
      .subscribe();

    this.congreSvc
      .getCongregationListObs({ size: 1 })
      .pipe(map((e) => (this.congreTotal = e.totalItems)))
      .pipe(take(1))
      .subscribe();

    this.incomeNominal$ = of(
      this.incomeSvc.countIncomeByCategory('All Category')
    );

    this.outcomeNominal$ = of(
      this.outcomeSvc.countOutcomeByCategory('All Category')
    );
  }

  sendNavMenuStr(str: string) {
    this.sharedSvc.changeNavMenuActive(str);
  }
}
