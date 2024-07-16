import { Component } from "@angular/core";
import { Observable, map, of, take } from "rxjs";
import { AssetDTO } from "src/app/core/dto/asset.dto";
import { PaginationResultDTO } from "src/app/core/dto/pagination-result.dto";
import { AssetService } from "./asset.service";

@Component({
    selector: 'app-asset',
    templateUrl: './asset.component.html',
    styleUrls: ['./asset.component.css'],
})
export class AssetComponent{
    assetList$: Observable<PaginationResultDTO<AssetDTO>> | undefined;
    constructor(private assetSvc: AssetService){
        this.assetSvc.getAssetList()
        .pipe(map(e => {
            this.assetList$ = of(e);
        }))
        .pipe(take(1))
        .subscribe()
    }
}