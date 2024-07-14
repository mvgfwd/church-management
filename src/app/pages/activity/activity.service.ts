import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivityDTO } from 'src/app/core/dto/activity.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';

@Injectable()
export class ActivityService {
  PaginationActivityList: PaginationResultDTO<ActivityDTO> = {
    currentPage: 1,
    totalItems: 0,
    lastPage: 0,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [],
  };

  constructor() {
    this.PaginationActivityList.data = [
      {
        id: 1,
        activityTitle: 'Ibadah Mingguan',
        description:
          'Ibadah mingguan umum rutin 3 kali sehari jam 08.00 (bahasa Indonesia), jam 11.00 (bahasa Batak), dan 18.00 (bahasa Batak)',
        timeHour: { hours: 2, minutes: 0 },
        activityDate: new Date('2024-07-07'),
        activityTime: { hours: 8, minutes: 0 },
        location: 'Gedung Utama Gereja',
        pic: 'Pdt Felix Subea',
      },
      {
        id: 2,
        activityTitle: 'Ibadah Jumat Agung',
        description:
          'Ibadah peringatan jumat agung akan diadakan 3 kali sehari jam 08.00 (bahasa Indonesia), jam 11.00 (bahasa Batak), dan 18.00 (bahasa Batak) direkomendasikan menggunakan pakaian bertema gelap/hitam',
        timeHour: { hours: 2, minutes: 0 },
        activityDate: new Date('2024-03-29'),
        activityTime: { hours: 8, minutes: 0 },
        location: 'Gedung Utama Gereja',
        pic: 'Pdt Felix Subea',
      },
      {
        id: 3,
        activityTitle: 'Ibadah Mingguan Remaja',
        description:
          'Kebaktian remaja akan diadakan di gedung B ruang pertemuan Gereja dan akan dipimpin oleh sintua Marnaek Sibarani',
        timeHour: { hours: 1, minutes: 30 },
        activityDate: new Date('2024-10-31'),
        activityTime: { hours: 19, minutes: 0 },
        location: 'Gedung B - Rapat dan Pertemuan',
        pic: 'Marnaek Sibarani',
      },
      {
        id: 4,
        activityTitle: 'Lari Sore Bersama Ephorus',
        description:
          'Peringatan hari sintua sedunia, HKBP mengadakan program sehat dengan seluruh jemaat diundang untuk dapat berpartisipasi pada acara lari sore yang akan diikuti seluruh sintua dan Ephorus HKBP.',
        timeHour: { hours: 1, minutes: 0 },
        activityDate: new Date('2024-11-22'),
        activityTime: { hours: 16, minutes: 0 },
        location: 'Perumahan HKBP Setempat',
        pic: 'Giat J. Sagala',
      },
      {
        id: 5,
        activityTitle: 'Makan-Makan Pesta Jubileum',
        description:
          'Pesta peringatan 200 tahun berdirinya gereja tulang Nommensen ini membawa sukacita tersendiri untuk organisasi sehingga majelis gereja mengundang seluruh jemaat untuk makan-makan saksang di area taman gereja.',
        timeHour: { hours: 12, minutes: 20 },
        activityDate: new Date('2024-11-30'),
        activityTime: { hours: 7, minutes: 0 },
        location: 'Perumahan HKBP Setempat',
        pic: 'Pdt. Timbul Damanik (HKBP Ruas Sebelah)',
      },
    ];
  }

  getActivityList(): Observable<PaginationResultDTO<ActivityDTO>> {
    return of(this.PaginationActivityList);
  }
}
