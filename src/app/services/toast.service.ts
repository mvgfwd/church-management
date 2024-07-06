import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

@Injectable()
export class ToastService {
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
  });

  formDataNotChangedNotif() {
    this.Toast.fire({
      icon: 'warning',
      title: 'Data not changed',
    });
  }

  formInvalidNotif(str?: string) {
    this.Toast.fire({
      icon: 'warning',
      title: str ? 'Please fill ' + str : 'Form data is invalid',
    });
  }

  fillAllRequiredField() {
    this.Toast.fire({
      icon: 'warning',
      title: 'Please fill all required field',
    });
  }

  addSuccessNotif(str?: string) {
    this.Toast.fire({
      icon: 'success',
      title: str ? str + ' added successfully' : 'Data added successfully',
    });
  }

  addFailNotif(str?: string) {
    this.Toast.fire({
      icon: 'error',
      title: str ? 'Failed add ' + str : 'Failed add data',
    });
  }

  deleteSuccessNotif(str?: string) {
    this.Toast.fire({
      icon: 'success',
      title: str ? str + ' deleted successfully' : 'Data deleted successfully',
    });
  }

  deleteFailNotif(str?: string) {
    this.Toast.fire({
      icon: 'error',
      title: str ? 'Failed deleted ' + str : 'Failed deleted data',
    });
  }

  editSuccessNotif(str?: string) {
    this.Toast.fire({
      icon: 'success',
      title: str ? str + ' editted successfully' : 'Data editted successfully',
    });
  }

  editFailNotif(str?: string) {
    this.Toast.fire({
      icon: 'error',
      title: str ? 'Failed edit ' + str : 'Failed edit data',
    });
  }
}
