import { Component } from '@angular/core';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css'],
})
export class FinancialComponent {
  incomeOptions: string[] = ['All Category', 'Persembahan', 'Perpuluhan', 'Pembangunan', 'Service', 'Donasi', 'Lainnya'];
  outcomeOptions: string[] = ['All Catagory', 'Deposit', 'Pembangunan', 'Diakonia', 'Pelayanan', 'Operasional', 'Acara', 'Lainnya'];
  dateOptions: string[] = ['Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'Oktober', 'November', 'Desember'];
}
