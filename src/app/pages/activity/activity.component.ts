import { Component, OnInit } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { ActivityDTO } from 'src/app/core/dto/activity.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { ActivityService } from './activity.service';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  animations: [
    trigger('slideInDown', [
      state(
        'true',
        style({ height: '*', transform: 'translateY(0)', overflow: 'hidden' })
      ),
      state(
        'false',
        style({
          opacity: 0,
          overflow: 'hidden',
          height: 0,
          transform: 'translateY(-20px)',
        })
      ),
      transition(
        'false => true',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 0,
              height: 0,
            }),
            style({
              opacity: 1,
              transform: 'translateY(0%)',
              height: '*',
              background: 'rgba(255, 255, 255, 0.15)',
            }),
          ])
        )
      ),
      transition(
        'true => false',
        animate(
          '200ms ease-out',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateY(0%)',
              height: '*',
              offset: 0,
            }),
            style({
              opacity: 0.3,
              offset: 0.3,
            }),
            style({
              opacity: 0,
              transform: 'translateY(-20px)',
              height: 0,
              offset: 1,
            }),
          ])
        )
      ),
    ]),
  ],
})
export class ActivityComponent implements OnInit {
  activityUpcomingList:
    | Observable<PaginationResultDTO<ActivityDTO>>
    | undefined;
  activityHistoryList: Observable<PaginationResultDTO<ActivityDTO>> | undefined;
  arrayOfIdDescOpened: number[] = [];
  arrayOfHistoryIdOpened: number[] = [];
  arrHistoryDescShow: number[] = [];
  totalPageOfUpcomingActivity: number[] = [];

  userReq: UserRequest = {
    size: 10,
    page: 1,
    searchTerm: '',
  };

  constructor(private activitySvc: ActivityService) {
    this.activitySvc
      .getUpcomingActivityList(this.userReq)
      .pipe(
        map((e) => {
          this.activityUpcomingList = of(e);
          this.totalPageOfUpcomingActivity = Array.from(
            { length: e.lastPage },
            (_, i) => i
          );
        })
      )
      .pipe(take(1))
      .subscribe();

    this.activitySvc
      .getHistoryActivityList(this.userReq)
      .pipe(
        map((e) => {
          this.activityHistoryList = of(e);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  ngOnInit() {}

  onClickToggleShowDescriptionById(id: number) {
    if (this.arrayOfIdDescOpened.includes(id)) {
      this.arrayOfIdDescOpened = this.arrayOfIdDescOpened.filter(
        (item) => item !== id
      );
      return;
    }
    this.arrayOfIdDescOpened.push(id);
  }

  onClickToggleHistoryShownById(id: number) {
    if (this.arrayOfHistoryIdOpened.includes(id)) {
      this.arrayOfHistoryIdOpened = this.arrayOfHistoryIdOpened.filter(
        (item) => item !== id
      );
      return;
    }
    this.arrayOfHistoryIdOpened.push(id);
  }

  onClickToggleHistoryDescById(id: number, headClick?: boolean) {
    if (headClick) {
      this.arrHistoryDescShow = this.arrHistoryDescShow.filter(
        (item) => item !== id
      );
      return;
    }
    if (this.arrHistoryDescShow.includes(id)) {
      this.arrHistoryDescShow = this.arrHistoryDescShow.filter(
        (item) => item !== id
      );
      return;
    }
    this.arrHistoryDescShow.push(id);
  }

  onClickChangePage(page: number) {
    this.activitySvc
      .getUpcomingActivityList({ size: 10, page: page })
      .pipe(
        map((e) => {
          this.activityUpcomingList = of(e);
          this.totalPageOfUpcomingActivity = Array.from(
            { length: e.lastPage },
            (_, i) => i
          );
        })
      )
      .subscribe();
  }
}
