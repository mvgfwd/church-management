export interface FinancialDTO{
    balance: string;
    income: IncomeDTO;
    outcome: OutcomeDTO;
}

export interface IncomeDTO{
    incomeId: number;
    incomeGive?: string; //persembahan
    incomeTenth?: string; //perpuluhan
    incomeBuilding?: string; //pembangunan
    incomeService?: string; //jasa gereja
    incomeDonate?: string; //donasi
    incomeOther?: string;
    dateIncome: Date;
}

export interface OutcomeDTO{
    outcomeId: number;
    outcomeDeposit?: string; //setor
    outcomeBuilding?: string; //pembangunan
    outcomeDiakonia?: string; //diakonia
    outcomeGuest?: string; //pelayanan
    outcomeOperational?: string; //listrik, air
    outcomeEvent?: string; //acara
    outcomeOther?: string;
    dateOutcome: Date;
}