import { Component } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { NewsService } from './news.service';
import { NewsDTO } from 'src/app/core/dto/news.dto';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  newsList$: PaginationResultDTO<NewsDTO> | undefined;

  constructor(private newsService: NewsService) {
    this.newsService
      .getNewsListObs()
      .pipe(map((newsPagination) => (this.newsList$ = newsPagination)))
      .pipe(take(1))
      .subscribe();
  }
}
