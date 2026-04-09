import { useState, useEffect, useMemo, useCallback } from 'react';
import { z } from 'zod';
import { calculateFinancing, FinancingParams, FinancingResult } from '@/lib/financeCalculator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

// Schema de validação Zod
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

export function useFinancing(propertyId: string, propertyPrice: number) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [params, setParams] = useState<FinancingParams>({
    propertyPrice,
    downPayment: propertyPrice * 0.2, // 20% entrada padrão
    loanTerm: 240, // 20 anos
    interestRate: 8.5, // taxa padrão
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedSimulations, setSavedSimulations] = useState<FinancingSimulation[]>([]);

  // Cálculo em tempo real
  const result = useMemo(() => {
    try {
      financingSchema.parse(params);
      return calculateFinancing(params);
    } catch {
      return null;
    }
  }, [params]);

  const loadSavedSimulations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('financing_simulations')
        .select('*')
        .eq('user_id', user!.id)
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedSimulations(data || []);
    } catch (error) {
      console.error('Erro ao carregar simulações:', error);
    }
  }, [user, propertyId]);

  // Carregar simulações salvas
  useEffect(() => {
    if (user && propertyId) {
      loadSavedSimulations();
    }
  }, [user, propertyId, loadSavedSimulations]);

  const saveSimulation = async () => {
    if (!user || !result) return;

    setIsSaving(true);
    try {
      const simulation: Omit<FinancingSimulation, 'id' | 'created_at'> = {
        user_id: user.id,
        property_id: propertyId,
        property_price: params.propertyPrice,
        down_payment: params.downPayment,
        loan_term: params.loanTerm,
        interest_rate: params.interestRate,
        monthly_payment: result.monthlyPayment,
        total_payment: result.totalPayment,
        total_interest: result.totalInterest,
      };

      const { error } = await supabase
        .from('financing_simulations')
        .insert(simulation);

      if (error) throw error;

      toast({
        title: 'Simulação salva!',
        description: 'Sua simulação foi salva com sucesso.',
      });

      // Recarregar simulações
      await loadSavedSimulations();

      // Analytics: registrar uso
      await supabase.from('analytics_events').insert({
        user_id: user.id,
        event_type: 'financing_simulation_saved',
        event_data: { property_id: propertyId },
      });

    } catch (error) {
      console.error('Erro ao salvar simulação:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar a simulação.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateParam = (key: keyof FinancingParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const isValid = financingSchema.safeParse(params).success;

  return {
    params,
    result,
    isValid,
    updateParam,
    saveSimulation,
    isSaving,
    savedSimulations,
  };
}