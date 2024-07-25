import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivityDTO } from 'src/app/core/dto/activity.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

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
        id: 0,
        activityTitle: 'Ibadah Remaja',
        description:
          'Ibadah mingguan umum rutin 3 kali sehari jam 08.00 (bahasa Indonesia), jam 11.00 (bahasa Batak), dan 18.00 (bahasa Batak)',
        timeHour: { hours: 2, minutes: 0 },
        activityDate: new Date('2024-07-07'),
        activityTime: { hours: 8, minutes: 0 },
        location: 'Gedung Utama Gereja',
        pic: 'Pdt Felix Subea',
      },
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
        activityDate: new Date('2024-07-17'),
        activityTime: { hours: 8, minutes: 0 },
        location: 'Gedung Utama Gereja',
        pic: 'Pdt Felix Subea',
      },
      {
        id: 3,
        activityTitle: 'Ibadah Mingguan Sintua',
        description:
          'Kebaktian remaja akan diadakan di gedung B ruang pertemuan Gereja dan akan dipimpin oleh sintua Marnaek Sibarani',
        timeHour: { hours: 1, minutes: 30 },
        activityDate: new Date('2024-11-22'),
        activityTime: { hours: 19, minutes: 0 },
        location: 'Gedung B - Rapat dan Pertemuan',
        pic: 'Marnaek Sibarani',
      },
      {
        id: 4,
        activityTitle: 'Lari Sore Bersama Praeses',
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
        activityTitle: 'Makan-Makan Pesta Paskah',
        description:
          'Pesta peringatan 200 tahun berdirinya gereja tulang Nommensen ini membawa sukacita tersendiri untuk organisasi sehingga majelis gereja mengundang seluruh jemaat untuk makan-makan saksang di area taman gereja.',
        timeHour: { hours: 12, minutes: 20 },
        activityDate: new Date('2024-07-25'),
        activityTime: { hours: 7, minutes: 0 },
        location: 'Perumahan HKBP Setempat',
        pic: 'Pdt. Timbul Damanik (HKBP Ruas Sebelah)',
      },
      {
        id: 6,
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
        id: 7,
        activityTitle: 'Lari Sore Bersama Ephorus',
        description:
          'Peringatan hari sintua sedunia, HKBP mengadakan program sehat dengan seluruh jemaat diundang untuk dapat berpartisipasi pada acara lari sore yang akan diikuti seluruh sintua dan Ephorus HKBP.',
        timeHour: { hours: 1, minutes: 0 },
        activityDate: new Date('2024-10-31'),
        activityTime: { hours: 16, minutes: 0 },
        location: 'Perumahan HKBP Setempat',
        pic: 'Giat J. Sagala',
      },
      {
        id: 8,
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

    this.PaginationActivityList.totalItems =
      this.PaginationActivityList.data.length;

    this.PaginationActivityList.lastPage = Math.ceil(
      this.PaginationActivityList.data.length /
        this.PaginationActivityList.totalItemsPerPage
    );

    this.PaginationActivityList.currentPage ===
      this.PaginationActivityList.lastPage ||
    this.PaginationActivityList.lastPage === 0
      ? (this.PaginationActivityList.hasNext = false)
      : (this.PaginationActivityList.hasNext = true);

    this.PaginationActivityList.currentPage === 1
      ? (this.PaginationActivityList.hasPrev = false)
      : (this.PaginationActivityList.hasPrev = true);
  }

  getUpcomingActivityList(
    userReq: UserRequest
  ): Observable<PaginationResultDTO<ActivityDTO>> {
    // PERDATAAN
    const currDate = new Date();
    currDate.setHours(0,0,0,0);
    const upcomingListData = this.PaginationActivityList.data.filter(
      (activity) => activity.activityDate >= currDate
    );
    const start = (userReq.page! - 1) * userReq.size!;
    const end = start + userReq.size!;
    let data = upcomingListData.slice(start, end);
    data = data.slice(0, userReq.size);
    data = data.sort((a, b) => {
      const dateA = new Date(a.activityDate).getTime();
      const dateB = new Date(b.activityDate).getTime();
      return dateA - dateB;
    });
    // DUMMY PER-PAGE-AN
    userReq.page! > 1
      ? (this.PaginationActivityList.hasPrev = true)
      : (this.PaginationActivityList.hasPrev = false);
    this.PaginationActivityList.lastPage = Math.ceil(
      upcomingListData.length / userReq.size!
    );
    userReq.page! === this.PaginationActivityList.lastPage ||
    this.PaginationActivityList.lastPage === 0
      ? (this.PaginationActivityList.hasNext = false)
      : (this.PaginationActivityList.hasNext = true);
    this.PaginationActivityList.totalItemsPerPage = userReq.size!;
    this.PaginationActivityList.totalItems = upcomingListData.length;
    this.PaginationActivityList.currentPage = userReq.page!;
    return of({ ...this.PaginationActivityList, data: data });
  }

  getHistoryActivityList(
    userReq: UserRequest
  ): Observable<PaginationResultDTO<ActivityDTO>> {
    // DUMMY PER-PAGE-AN
    userReq.page! > 1
      ? (this.PaginationActivityList.hasPrev = true)
      : (this.PaginationActivityList.hasPrev = false);
    this.PaginationActivityList.lastPage = Math.ceil(
      this.PaginationActivityList.data.length / userReq.size!
    );
    userReq.page! === this.PaginationActivityList.lastPage ||
    this.PaginationActivityList.lastPage === 0
      ? (this.PaginationActivityList.hasNext = false)
      : (this.PaginationActivityList.hasNext = true);
    const currDate = new Date();
    const historyListData = this.PaginationActivityList.data.filter(
      (activity) => activity.activityDate <= currDate
    );
    this.PaginationActivityList.totalItemsPerPage = userReq.size!;
    this.PaginationActivityList.totalItems = historyListData.length;
    return of({ ...this.PaginationActivityList, data: historyListData });
  }
}
