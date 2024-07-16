import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsDTO } from 'src/app/core/dto/news.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

@Injectable()
export class NewsService {
  PaginationNewsList: PaginationResultDTO<NewsDTO> = {
    currentPage: 1,
    totalItems: 0,
    lastPage: 0,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [],
  };

  constructor() {
    this.PaginationNewsList.data = [
      {
        id: 1,
        title: 'Ibadah Partangiangan Mingguan Week 23',
        category: 'worship',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        publishedDate: new Date('2024-02-21'),
      },
      {
        id: 2,
        title: 'Berita Kematian John Lennon Sembiring',
        category: 'death',
        content:
          'Telah meninggal, John Lennon, Jemaat sektor 5. Alamat: Liverpool, 23 December 2023',
        publishedDate: new Date('2024-04-26'),
      },
      {
        id: 3,
        title: 'Pelajari Kisah Obaja',
        category: 'worship',
        content: `Henokh adalah keturunan ketujuh dari Adam dalam garis keturunan Set. Dia adalah putra Jared dan ayah dari Metusalah. Henokh hidup di zaman yang penuh dengan kejahatan dan penyembahan berhala. Namun, berbeda dengan banyak orang di zamannya, Henokh dikenal sebagai orang yang "berjalan dengan Allah."
          Henokh tidak hanya hidup dalam iman yang teguh, tetapi juga memiliki hubungan yang sangat dekat dengan Tuhan. Alkitab mencatat bahwa Henokh 'berjalan dengan Allah' selama 300 tahun setelah kelahiran Metusalah. Kehidupan Henokh adalah contoh dari kesetiaan dan ketaatan yang mendalam kepada Tuhan, sesuatu yang sangat langka di masa itu.
          Kisah Henokh mencapai puncaknya dalam satu peristiwa yang luar biasa. Henokh tidak mengalami kematian seperti manusia pada umumnya. Dalam Kitab Kejadian 5:24, tertulis, "Henokh hidup bergaul dengan Allah, lalu ia tidak ada lagi, sebab ia telah diangkat oleh Allah." Tuhan mengangkat Henokh langsung ke surga tanpa melalui kematian, sebuah kehormatan yang sangat luar biasa dan jarang terjadi.
          Pengangkatan Henokh menjadi simbol iman yang kuat dan hubungan yang intim dengan Tuhan. Kisah ini memberikan pesan bahwa kehidupan yang dijalani dengan kesetiaan kepada Tuhan akan memperoleh penghargaan yang besar.
          Henokh juga disebutkan dalam Surat Yudas di Perjanjian Baru, yang menegaskan bahwa Henokh adalah seorang nabi yang meramalkan kedatangan Tuhan untuk menghakimi orang-orang yang tidak beriman.`,
        publishedDate: new Date('2024-05-21'),
      },
      {
        id: 4,
        title: 'Laporan pembangunan bulan Juli 2024',
        category: 'financial',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        publishedDate: new Date('2024-06-21'),
      },
      {
        id: 3,
        title: 'Ibadah Partangiangan Mingguan Week 24',
        category: 'worship',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        publishedDate: new Date('2024-05-21'),
      },
      {
        id: 4,
        title: 'Laporan pembangunan bulan Juli 2024',
        category: 'financial',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        publishedDate: new Date('2024-06-21'),
      },
    ];

    this.PaginationNewsList.totalItems = this.PaginationNewsList.data.length;

    this.PaginationNewsList.lastPage = Math.ceil(
      this.PaginationNewsList.data.length /
        this.PaginationNewsList.totalItemsPerPage
    );

    this.PaginationNewsList.currentPage === this.PaginationNewsList.lastPage ||
    this.PaginationNewsList.lastPage === 0
      ? (this.PaginationNewsList.hasNext = false)
      : (this.PaginationNewsList.hasNext = true);

    this.PaginationNewsList.currentPage === 1
      ? (this.PaginationNewsList.hasPrev = false)
      : (this.PaginationNewsList.hasPrev = true);
  }

  getNewsListObs(
    userReq: UserRequest
  ): Observable<PaginationResultDTO<NewsDTO>> {
    // DUMMY PER-PAGE-AN
    const curPage = userReq.page!;
    this.PaginationNewsList.currentPage = userReq.page!;
    userReq.page! > 1
      ? (this.PaginationNewsList.hasPrev = true)
      : (this.PaginationNewsList.hasPrev = false);
    this.PaginationNewsList.lastPage = Math.ceil(
      this.PaginationNewsList.data.length / userReq.size!
    );
    userReq.page! === this.PaginationNewsList.lastPage ||
    this.PaginationNewsList.lastPage === 0
      ? (this.PaginationNewsList.hasNext = false)
      : (this.PaginationNewsList.hasNext = true);
    // DUMMY PERDATAAN
    const start = (userReq.page! - 1) * userReq.size!;
    const end = start + userReq.size!;
    let data = this.PaginationNewsList.data.slice(start, end);
    data = data.slice(0, userReq.size);
    return of({ ...this.PaginationNewsList, data, curPage });
  }

  getDetailNews(id: number): Observable<NewsDTO> {
    const detail = this.PaginationNewsList.data.filter((e) => e.id === id)[0];
    return of(detail);
  }
}
