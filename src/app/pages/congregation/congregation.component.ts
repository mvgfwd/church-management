import { Component, OnInit } from '@angular/core';
import { CongregationDTO } from 'src/app/core/dto/congregation.dto';
import { CongregationService } from './congregation.service';
import { map, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupOf } from 'src/app/components/input/form-utility';

@Component({
  selector: 'app-congregation',
  templateUrl: './congregation.component.html',
  styleUrls: ['./congregation.component.css'],
})
export class CongregationComponent implements OnInit {
  congregationList: CongregationDTO[] = [];
  formCongregation: FormGroup = new FormGroup<FormGroupOf<CongregationDTO>>({
    name: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    birthDate: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
  });

  constructor(private congreService: CongregationService) {
    this.congreService
      .getCongregationListObs()
      .pipe(map((cg) => (this.congregationList = cg)))
      .pipe(take(1))
      .subscribe();
  }

  onSubmit() {
    console.log('awkoawkoak', this.formCongregation.value);
  }

  ngOnInit(): void {}
}
