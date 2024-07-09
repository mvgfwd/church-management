import { Component } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { NewsService } from './news.service';
import { NewsDTO } from 'src/app/core/dto/news.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  newsList$: Observable<PaginationResultDTO<NewsDTO>> | undefined;
  totalPage: number[] = [];

  userReq: UserRequest = {
    size: 10,
    page: 1,
    searchTerm: '',
  };

  constructor(private newsService: NewsService) {
    this.retrieveNewsData();
  }

  retrieveNewsData() {
    this.newsService
      .getNewsListObs(this.userReq)
      .pipe(
        map((newsPagination) => {
          this.newsList$ = of(newsPagination);
          this.totalPage = Array.from(
            { length: newsPagination.lastPage },
            (_, i) => i
          );
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  onClickChangePage(page: number) {
    this.userReq.page = page;
    this.retrieveNewsData();
  }
}
