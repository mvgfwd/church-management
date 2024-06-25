export interface CongregationDTO {
    name: string;
    age: number;
    birthDate: string;
    address: string;
    phoneNumber: string;
}

export interface BoardDTO{
    name: string;
    age: number;
    birthDate: string;
    address: string;
    phoneNumber: string;
    fungsi: string;
    status: 'PENDIDIKAN' | 'ACTIVE' | 'PENSIUN';
}