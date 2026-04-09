import { useState, useMemo } from 'react';
import { z } from 'zod';
import { calculateFinancing, FinancingParams } from '@/lib/financeCalculator';

const financingSchema = z.object({
  propertyPrice: z.number().min(0, 'Preço deve ser positivo'),
  downPayment: z.number().min(0, 'Entrada deve ser positiva'),
  loanTerm: z.number().min(1, 'Prazo deve ser pelo menos 1 mês').max(360, 'Prazo máximo é 360 meses'),
  interestRate: z.number().min(0, 'Taxa deve ser positiva').max(50, 'Taxa máxima é 50%'),
}).refine((data) => data.downPayment <= data.propertyPrice, {
  message: 'Entrada não pode ser maior que o preço do imóvel',
  path: ['downPayment'],
});

export interface FinancingSimulation {
  id?: string;
  user_id?: string;
  property_id: string;
  property_price: number;
  down_payment: number;
  loan_term: number;
  interest_rate: number;
  monthly_payment: number;
  total_payment: number;
  total_interest: number;
  created_at?: string;
}

export function useFinancing(_propertyId: string, propertyPrice: number) {
  const [params, setParams] = useState<FinancingParams>({
    propertyPrice,
    downPayment: propertyPrice * 0.2,
    loanTerm: 240,
    interestRate: 8.5,
  });

  const [isSaving] = useState(false);
  const [savedSimulations] = useState<FinancingSimulation[]>([]);

  const result = useMemo(() => {
    try {
      financingSchema.parse(params);
      return calculateFinancing(params);
    } catch {
      return null;
    }
  }, [params]);

  const saveSimulation = async () => {
    console.warn('Financing simulations table not configured');
  };

  const updateParam = (key: keyof FinancingParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const isValid = financingSchema.safeParse(params).success;

  return { params, result, isValid, updateParam, saveSimulation, isSaving, savedSimulations };
}
