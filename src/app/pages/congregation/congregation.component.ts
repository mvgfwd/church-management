import { Component, OnInit } from '@angular/core';
import { CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { CongregationService } from './congregation.service';
import { map, take, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';
import Swal from 'sweetalert2';
import { Confirmable } from 'src/app/core/dto/confirmable.decorator';

@Component({
  selector: 'app-congregation',
  templateUrl: './congregation.component.html',
  styleUrls: ['./congregation.component.css'],
})
export class CongregationComponent implements OnInit {
  congregationList: CongregationDTO[] = [];
  formCongregation: FormGroup = new FormGroup<FormGroupOf<CongregationDTO>>({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    birthDate: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
  });

  idOnEdit: number | undefined = undefined;
  lastCongregationEditClicked: CongregationDTO | undefined;
  formEditCongregation: FormGroup = new FormGroup<
    FormGroupOf<Partial<CongregationDTO>>
  >({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    birthDate: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
  });

  Toast = Swal.mixin({
    toast: true,
    // position: 'top-end',
    // showConfirmButton: false,
    // timer: 2400,
    // timerProgressBar: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
  });

  constructor(private congreService: CongregationService) {
    this.congreService
      .getCongregationListObs()
      .pipe(map((cg) => (this.congregationList = cg)))
      .pipe(take(1))
      .subscribe();
  }

  @Confirmable({
    title: 'Add Confirmation',
    html: 'Are you sure want to add?',
  })
  onSubmitPost() {
    if (this.formCongregation.invalid) {
      this.Toast.fire({
        icon: 'error',
        title: 'Please fill all field',
      });
      return;
    }
    const data = this.formCongregation.value as CongregationDTO;
    this.congreService
      .postCongregation(data)
      .pipe(map((e) => {}))
      .pipe(
        tap<void>({
          next: () => {
            this.formCongregation.reset();
            this.Toast.fire({
              icon: 'success',
              title: 'Data added succesfully',
            });
          },
          error: (e) => {
            this.Toast.fire({
              icon: 'error',
              title: 'Failed add data',
            });
          },
        })
      )
      .subscribe();
  }

  @Confirmable({
    title: 'Delete Confirmation',
    html: 'Are you sure want to delete?',
  })
  onClickDelete(id: number) {
    this.congreService
      .deleteCongregationById(id)
      .pipe(map((e) => {}))
      .pipe(
        tap<void>({
          next: () => {
            this.Toast.fire({
              icon: 'success',
              title: 'Data deleted succesfully',
            });
          },
          error: (e) => {
            this.Toast.fire({
              icon: 'error',
              title: 'Failed delete data',
            });
          },
        })
      )
      .subscribe();
  }

  onClickEditById(data: CongregationDTO) {
    this.idOnEdit = data.id;
    this.lastCongregationEditClicked = data;
    this.formEditCongregation.patchValue({
      name: data.name,
      age: data.age,
      birthDate: data.birthDate,
      address: data.address,
      phoneNumber: data.phoneNumber,
      id: data.id,
    });
  }

  @Confirmable({
    title: 'Edit Confirmation',
    html: 'Are you sure want to edit?',
  })
  onSubmitEdittedData() {
    if (this.formEditCongregation.invalid) {
      this.Toast.fire({
        icon: 'warning',
        title: 'Form data is invalid',
      });
      return;
    }
    const data = this.formEditCongregation.value as CongregationDTO;
    const objLastCEC = Object.values(this.lastCongregationEditClicked!).sort();
    const dataObj = Object.values(data).sort();
    if (JSON.stringify(objLastCEC) === JSON.stringify(dataObj)) {
      this.Toast.fire({
        icon: 'error',
        title: 'Data not changed',
      });
      return;
    }
    this.congreService
      .putCongregtionById(data)
      .pipe(
        map((e) => {
          this.idOnEdit = undefined;
        })
      )
      .pipe(
        tap<void>({
          next: () => {
            this.Toast.fire({
              icon: 'success',
              title: 'Data editted succesfully',
            });
          },
          error: (e) => {
            this.Toast.fire({
              icon: 'error',
              title: 'Failed edit data',
            });
          },
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
