export interface FinancialDTO {
  balance: string;
  income: IncomeDTO;
  outcome: OutcomeDTO;
}

export interface IncomeDTO {
  incomeId?: number;
  incomeGive?: string; //persembahan
  incomeTenth?: string; //perpuluhan
  incomeBuilding?: string; //pembangunan
  incomeService?: string; //jasa gereja
  incomeDonate?: string; //donasi
  incomeOther?: string;
  dateIncome: string; // dd/MM/yyyy
  description?: string;
}

export interface OutcomeDTO {
  outcomeId?: number;
  outcomeBuilding?: string; //pembangunan
  outcomeDeposit?: string; //setor
  outcomeDiakonia?: string; //diakonia
  outcomeEvent?: string; //acara
  outcomeGuest?: string; //pelayanan
  outcomeOperational?: string; //listrik, air
  outcomeOther?: string;
  dateOutcome: string; // dd/MM/yyyy
  description?: string;
}
