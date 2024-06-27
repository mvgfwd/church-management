export interface CongregationDTO {
  name: string;
  age: number;
  birthDate: string;
  address: string;
  phoneNumber: string;
  id: number;
}

export interface BoardDTO {
  name: string;
  age: number;
  birthDate: string;
  address: string;
  phoneNumber: string;
  fungsi: 'PENDETA' | 'CALON_PENDETA' | 'SINTUA' | 'CALON_SINTUA' | 'DIAGONES' | 'CALON_DIAGONES' | 'BIBELVROUW' | 'GURU_HURIA' | 'STAFF';
  status: 'PENDIDIKAN' | 'ACTIVE' | 'PENSIUN';
}
