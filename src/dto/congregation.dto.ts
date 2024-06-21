export interface PeopleDTO {
    name: string;
    age: number;
    birthDate: string;
    address: string;
    phoneNumber: string;
}

export interface PengurusDTO{
    name: string;
    age: number;
    birthDate: string;
    role: string;
    phoneNumber: string;
    address: string;
    status: 'PENDIDIKAN' | 'ACTIVE' | 'PENSIUN';
}