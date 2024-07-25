import { Time } from '@angular/common';

export interface ActivityDTO {
  id?: number;
  activityTitle: string;
  description: string;
  timeHour: Time; //DURASI
  activityDate: Date;
  activityTime: Time; //JAM BERAPA
  location: string;
  pic: string;
}
