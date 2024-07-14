import { Time } from '@angular/common';

export interface ActivityDTO {
  id?: number;
  activityTitle: string;
  description: string;
  timeHour: Time;
  activityDate: Date;
  activityTime: Time;
  location: string;
  pic: string;
}
