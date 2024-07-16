import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AssetDTO, AssetStatus } from "src/app/core/dto/asset.dto";
import { PaginationResultDTO } from "src/app/core/dto/pagination-result.dto";

@Injectable()
export class AssetService{
    PaginationAssetList: PaginationResultDTO<AssetDTO> = {
        currentPage: 1,
        totalItems: 0,
        lastPage: 0,
        totalItemsPerPage: 10,
        hasNext: false,
        hasPrev: false,
        data: [],
    }

    constructor(){
      this.PaginationAssetList.data = [
        {
          id: 1,
          assetName: 'Electric Guitar',
          brand: 'Yamaha APX-500',
          status: AssetStatus.AVAILABLE,
          description: 'Guitar bought in 2018 for music dept.',
          quantity: 1
        },
        {
          id: 2,
          assetName: 'Drum',
          brand: 'Tama Rockstar',
          status: AssetStatus.MAINTENANCE,
          description: 'Drum bought in 2019 for music dept.',
          quantity: 1
        },
        {
          id: 3,
          assetName: 'Teak Wood Chair',
          brand: '-',
          status: AssetStatus.AVAILABLE,
          description: 'Chair for regular weekly worship',
          quantity: 50
        }
      ]
    }

    getAssetList(): Observable<PaginationResultDTO<AssetDTO>>{
      return of(this.PaginationAssetList)
    }

}