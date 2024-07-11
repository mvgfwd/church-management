import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private navMenuSource = new BehaviorSubject<string>('');
  currentNavMenuValue = this.navMenuSource.asObservable();

  changeNavMenuActive(value: string): void {
    this.navMenuSource.next(value);
  }
}