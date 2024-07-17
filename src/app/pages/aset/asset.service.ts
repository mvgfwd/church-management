import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssetDTO, AssetStatus } from 'src/app/core/dto/asset.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { UserRequest } from 'src/app/core/dto/user-request.dto';

@Injectable()
export class AssetService {
  PaginationAssetList: PaginationResultDTO<AssetDTO> = {
    currentPage: 1,
    totalItems: 0,
    lastPage: 0,
    totalItemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
    data: [],
  };

  constructor() {
    this.PaginationAssetList.data = [
      {
        id: 1,
        assetName: 'Electric Guitar',
        brand: 'Yamaha APX-500',
        status: AssetStatus.AVAILABLE,
        description: 'Guitar bought in 2018 for music dept.',
        quantity: 1,
      },
      {
        id: 2,
        assetName: 'Drum',
        brand: 'Tama Rockstar',
        status: AssetStatus.MAINTENANCE,
        description: 'Drum bought in 2019 for music dept.',
        quantity: 1,
      },
      {
        id: 3,
        assetName: 'Teak Wood Chair',
        brand: '-',
        status: AssetStatus.AVAILABLE,
        description: 'Chair for regular weekly worship',
        quantity: 50,
      },
    ];

    this.PaginationAssetList.totalItems = this.PaginationAssetList.data.length;

    this.PaginationAssetList.lastPage = Math.ceil(
      this.PaginationAssetList.data.length /
        this.PaginationAssetList.totalItemsPerPage
    );

    this.PaginationAssetList.currentPage ===
      this.PaginationAssetList.lastPage ||
    this.PaginationAssetList.lastPage === 0
      ? (this.PaginationAssetList.hasNext = false)
      : (this.PaginationAssetList.hasNext = true);

    this.PaginationAssetList.currentPage === 1
      ? (this.PaginationAssetList.hasPrev = false)
      : (this.PaginationAssetList.hasPrev = true);
  }

  getAssetList(
    userReq: UserRequest
  ): Observable<PaginationResultDTO<AssetDTO>> {
    // DUMMY PERDATAAN
    const start = (userReq.page! - 1) * userReq.size!;
    const end = start + userReq.size!;
    let data = this.PaginationAssetList.data.slice(start, end);
    data = data.slice(0, userReq.size);
    // DUMMY PER-PAGE-AN
    this.PaginationAssetList.lastPage = Math.ceil(
      this.PaginationAssetList.data.length / userReq.size!
    );
    userReq.page! > 1
      ? (this.PaginationAssetList.hasPrev = true)
      : (this.PaginationAssetList.hasPrev = false);
    userReq.page! === this.PaginationAssetList.lastPage ||
    this.PaginationAssetList.lastPage === 0
      ? (this.PaginationAssetList.hasNext = false)
      : (this.PaginationAssetList.hasNext = true);
    this.PaginationAssetList.lastPage = Math.ceil(
      this.PaginationAssetList.data.length / userReq.size!
    );
    this.PaginationAssetList.currentPage = userReq.page!;

    return of({ ...this.PaginationAssetList, data });
  }

  putAssetById(data: AssetDTO): Observable<PaginationResultDTO<AssetDTO>> {
    const index = this.PaginationAssetList.data.findIndex(
      (e) => e.id === data.id
    );
    const updatedData = (this.PaginationAssetList.data[index] = data);
    const result = { ...this.PaginationAssetList, updatedData };
    return of(result);
  }
}
