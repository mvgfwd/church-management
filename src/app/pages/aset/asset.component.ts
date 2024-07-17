import { Component } from '@angular/core';
import { Observable, map, of, take, tap } from 'rxjs';
import { AssetDTO, AssetStatus } from 'src/app/core/dto/asset.dto';
import { PaginationResultDTO } from 'src/app/core/dto/pagination-result.dto';
import { AssetService } from './asset.service';
import { UserRequest } from 'src/app/core/dto/user-request.dto';
import { FormControl, FormGroup } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';
import { BeautifyParseService } from 'src/app/core/services/beautify-parse.service';
import { Confirmable } from 'src/app/core/dto/confirmable.decorator';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css'],
})
export class AssetComponent {
  totalPage: number[] = [];
  assetList$: Observable<PaginationResultDTO<AssetDTO>> | undefined;
  idOnEdit: number | null = null;
  optionsStatus: AssetStatus[] = [
    AssetStatus.AVAILABLE,
    AssetStatus.UNAVAILABLE,
    AssetStatus.MAINTENANCE,
  ];

  userReq: UserRequest = {
    size: 10,
    page: 1,
    searchTerm: '',
  };

  formEditAset: FormGroup = new FormGroup<FormGroupOf<AssetDTO>>({
    id: new FormControl<number>(0),
    assetName: new FormControl<string>(''),
    brand: new FormControl<string>(''),
    status: new FormControl<AssetStatus>(AssetStatus.MAINTENANCE),
    description: new FormControl<string>(''),
    quantity: new FormControl<number>(0),
  });

  constructor(
    private assetSvc: AssetService,
    public beutifyParseSvc: BeautifyParseService,
    private toastSvc: ToastService
  ) {
    this.retrieveAssetList();
  }

  retrieveAssetList() {
    this.assetSvc
      .getAssetList(this.userReq)
      .pipe(
        map((e) => {
          this.assetList$ = of(e);
          this.totalPage = Array.from({ length: e.lastPage }, (_, i) => i);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  onClickChangePage(page: number) {
    this.userReq.page = page;
    this.assetSvc
      .getAssetList(this.userReq)
      .pipe(
        map((e) => {
          this.assetList$ = of(e);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  onClickEditById(asset: AssetDTO) {
    this.idOnEdit = asset.id;
    this.formEditAset.patchValue({
      id: asset.id,
      assetName: asset.assetName,
      brand: asset.brand,
      status: asset.status,
      description: asset.description,
      quantity: asset.quantity,
    });
  }

  @Confirmable({
    title: 'Update Confirmation',
    html: 'Are you sure want to update?',
  })
  onSubmitUpdateAset() {
    const assetData = this.formEditAset.value as AssetDTO;
    this.assetSvc
      .putAssetById(assetData)
      .pipe(
        map((e) => {
          this.retrieveAssetList();
          this.idOnEdit = null;
        })
      )
      .pipe(
        tap<void>({
          next: () => {
            this.toastSvc.editSuccessNotif('Asset');
          },
          error: (e) => {
            this.toastSvc.editFailNotif('asset');
          },
        })
      )
      .subscribe();
  }
}
