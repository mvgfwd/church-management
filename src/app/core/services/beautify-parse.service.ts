import { Injectable } from '@angular/core';
import { AssetStatus } from '../dto/asset.dto';

@Injectable()
export class BeautifyParseService {
  beautifyFungsi(str: string): string {
    let result: string = '';
    switch (str) {
      case 'PENDETA':
        result = 'Pendeta';
        break;
      case 'CALON_PENDETA':
        result = 'C.Pdt';
        break;
      case 'SINTUA':
        result = 'Sintua';
        break;
      case 'CALON_SINTUA':
        result = 'C.St';
        break;
      case 'BIBELVROUW':
        result = 'Bibelvrouw';
        break;
      case 'GURU_HURIA':
        result = 'Guru Huria';
        break;
      case 'DIAGONES':
        result = 'Diagones';
        break;
      case 'STAFF':
        result = 'Staff';
        break;
      case 'CALON_DIAGONES':
        result = 'C.Diagones';
        break;
      default:
        result = '###';
    }
    return result;
  }

  beautifyStatus(stat: string): string {
    let result = '';
    switch (stat) {
      case 'PENDIDIKAN':
        result = 'Pendidikan';
        break;
      case 'ACTIVE':
        result = 'Active';
        break;
      case 'PENSIUN':
        result = 'Pensiun';
        break;
      default:
        result = '###';
    }
    return result;
  }

  beautifyAsetStatus(str: AssetStatus): string {
    let res = '';
    switch (str) {
      case 'AVAILABLE':
        res = 'Available';
        break;
      case 'UNAVAILABLE':
        res = 'Unavailable';
        break;
      case 'MAINTENANCE':
        res = 'Maintenance';
        break;
      default:
        res = '###';
    }
    return res;
  }

  parseAsetStatus(str: string): AssetStatus {
    let res: AssetStatus = AssetStatus.AVAILABLE;
    switch (str) {
      case 'Available':
        res = AssetStatus.AVAILABLE;
        break;
      case 'Unavailable':
        res = AssetStatus.UNAVAILABLE;
        break;
      case 'Maintenance':
        res = AssetStatus.MAINTENANCE;
        break;
      default:
        res = AssetStatus.AVAILABLE;
    }
    return res;
  }

  ageCalculate(birthDate: string): number {
    const convertAge = new Date(birthDate);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const result = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    return result;
  }
}
