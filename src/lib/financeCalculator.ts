/**
 * Calculadora de financiamento imobiliário
 */

export interface FinancingParams {
  propertyPrice: number;
  downPayment: number;
  loanTerm: number; // em meses
  interestRate: number; // taxa anual em %
}

export interface FinancingResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationItem[];
}

export interface AmortizationItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Calcula o financiamento baseado nos parâmetros
 */
export function calculateFinancing(params: FinancingParams): FinancingResult {
  const { propertyPrice, downPayment, loanTerm, interestRate } = params;

  // Valor do empréstimo
  const loanAmount = propertyPrice - downPayment;

  // Taxa mensal
  const monthlyRate = interestRate / 100 / 12;

  // Pagamento mensal (fórmula do SAC - Sistema de Amortização Constante)
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);

  // Total pago
  const totalPayment = monthlyPayment * loanTerm;

  // Total de juros
  const totalInterest = totalPayment - loanAmount;

  // Cronograma de amortização
  const amortizationSchedule: AmortizationItem[] = [];
  let balance = loanAmount;

  for (let month = 1; month <= loanTerm; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    amortizationSchedule.push({
      month,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule,
  };
}

/**
 * Formata valor monetário em BRL
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/**
 * Formata percentual
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}