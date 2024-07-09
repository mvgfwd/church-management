import { Component } from '@angular/core';
import { NewsService } from '../news/news.service';
import { map, Observable, of, take } from 'rxjs';
import { NewsDTO } from 'src/app/core/dto/news.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  newsList$: Observable<NewsDTO[]> | undefined;
  userReq: UserRequest = {
    size: 10,
    page: 1,
    searchTerm: '',
  };

  constructor(private newsSvc: NewsService) {
    this.newsSvc
      .getNewsListObs(this.userReq)
      .pipe(
        map((e) => {
          this.newsList$ = of(e.data);
        })
      )
      .pipe(take(1))
      .subscribe();
  }
}
