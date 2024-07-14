import { Component } from '@angular/core';
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
export class ActivityComponent {
  activityUpcomingList:
    | Observable<PaginationResultDTO<ActivityDTO>>
    | undefined;
  activityHistoryList: Observable<PaginationResultDTO<ActivityDTO>> | undefined;
  arrayOfIdDescOpened: number[] = [];
  arrayOfHistoryIdOpened: number[] = [];
  arrHistoryDescShow: number[] = [];

  constructor(private activitySvc: ActivityService) {
    this.activitySvc
      .getActivityList()
      .pipe(
        map((e) => {
          const currDate = new Date();
          const historyListData = e.data.filter(
            (activity) => activity.activityDate <= currDate
          );
          const upcomingListData = e.data.filter(
            (activity) => activity.activityDate >= currDate
          );
          this.activityHistoryList = of({ ...e, data: historyListData });
          this.activityUpcomingList = of({ ...e, data: upcomingListData });
          console.log(upcomingListData);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

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
}
