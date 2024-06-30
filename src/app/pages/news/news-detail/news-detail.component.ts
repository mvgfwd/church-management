import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { map, take } from 'rxjs';
import { NewsService } from '../news.service';
import { NewsDTO } from 'src/app/core/dto/news.dto';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
})
export class NewsDetailComponent {
  detailNews: Partial<NewsDTO> | undefined;
  detailId: number = 0;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {
    this.route.params
      .pipe(
        map((e) => {
          this.newsService
            .getDetailNews(+e['id'])
            .pipe(map((x) => (this.detailNews = x)))
            .subscribe();
        })
      )
      .subscribe();

    // this.newsService
    //   .getDetailNews(this.detailId)
    //   .pipe(map((e) => console.log('e', e)))
    //   .subscribe();
  }
}
