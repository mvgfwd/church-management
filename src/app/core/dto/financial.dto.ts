export interface FinancialDTO{
    balance: string;
    income: IncomeDTO;
    outcome: OutcomeDTO;
}

export interface IncomeDTO{
    incomeGive: string; //persembahan
    incomeTenth: string; //perpuluhan
    incomeBuilding: string; //pembangunan
    incomeService: string; //jasa gereja
    incomeDonate: string; //donasi
    incomeOther: string;
}

export interface OutcomeDTO{
    outcomeDeposit: string; //setor
    outcomeBuilding: string; //pembangunan
    outcomeDiakonia: string; //diakonia
    outcomeGuest: string; //tamu
    outcomeOperational: string; //listrik, air
    outcomeEvent: string; //acara
    outcomeOther: string;
}