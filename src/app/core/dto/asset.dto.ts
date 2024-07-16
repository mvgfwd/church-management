export interface AssetDTO{
    id: number;
    assetName: string;
    brand: string;
    status: AssetStatus;
    description: string;
    quantity: number;
}

export enum AssetStatus{
    AVAILABLE = 'AVAILABLE',
    INAVAILABLE = 'INAVAILABLE',
    MAINTENANCE = 'MAINTENANCE'
}
