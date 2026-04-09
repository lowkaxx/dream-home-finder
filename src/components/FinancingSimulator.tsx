import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Save, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinancing } from '@/hooks/useFinancing';
import { formatCurrency, formatPercent } from '@/lib/financeCalculator';
import { useAuth } from '@/hooks/useAuth';

interface FinancingSimulatorProps {
  propertyId: string;
  propertyPrice: number;
}

export function FinancingSimulator({ propertyId, propertyPrice }: FinancingSimulatorProps) {
  const { user } = useAuth();
  const { params, result, isValid, updateParam, saveSimulation, isSaving } = useFinancing(propertyId, propertyPrice);
  const [isExpanded, setIsExpanded] = useState(false);

  const AnimatedNumber = ({ value, format }: { value: number; format: (v: number) => string }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => setDisplayValue(value), 100);
      return () => clearTimeout(timer);
    }, [value]);

    return (
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {format(displayValue)}
      </motion.span>
    );
  };

  return (
    <Card className="bg-white/10 border-white/20 shadow-xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calculator className="w-5 h-5" />
          Simulador de Financiamento Premium
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controles */}
        <div className="space-y-4">
          {/* Entrada */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Entrada: {formatCurrency(params.downPayment)}
            </label>
            <Slider
              value={[params.downPayment]}
              onValueChange={([value]) => updateParam('downPayment', value)}
              max={propertyPrice}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/70 mt-1">
              <span>R$ 0</span>
              <span>{formatCurrency(propertyPrice)}</span>
            </div>
          </div>

          {/* Prazo */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Prazo: {params.loanTerm} meses ({Math.round(params.loanTerm / 12)} anos)
            </label>
            <Slider
              value={[params.loanTerm]}
              onValueChange={([value]) => updateParam('loanTerm', value)}
              max={360}
              min={12}
              step={12}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/70 mt-1">
              <span>1 ano</span>
              <span>30 anos</span>
            </div>
          </div>

          {/* Taxa de juros */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Taxa de juros: {formatPercent(params.interestRate)}
            </label>
            <Slider
              value={[params.interestRate]}
              onValueChange={([value]) => updateParam('interestRate', value)}
              max={15}
              min={5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/70 mt-1">
              <span>5%</span>
              <span>15%</span>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-white/70 text-sm">Valor financiado</div>
                  <div className="text-white font-bold text-lg">
                    <AnimatedNumber value={result.loanAmount} format={formatCurrency} />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-white/70 text-sm">Parcela mensal</div>
                  <div className="text-white font-bold text-lg">
                    <AnimatedNumber value={result.monthlyPayment} format={formatCurrency} />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-white/70 text-sm">Total pago</div>
                  <div className="text-white font-bold text-lg">
                    <AnimatedNumber value={result.totalPayment} format={formatCurrency} />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-white/70 text-sm">Total juros</div>
                  <div className="text-white font-bold text-lg">
                    <AnimatedNumber value={result.totalInterest} format={formatCurrency} />
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-2">
                {user && (
                  <Button
                    onClick={saveSimulation}
                    disabled={!isValid || isSaving}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Salvando...' : 'Salvar Simulação'}
                  </Button>
                )}
                <Button
                  asChild
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <a
                    href="https://wa.me/5511999999999?text=Olá! Gostaria de falar sobre o financiamento do imóvel."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Falar com Corretor
                  </a>
                </Button>
              </div>

              {/* Toggle detalhes */}
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-white/70 hover:text-white"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {isExpanded ? 'Ocultar' : 'Ver'} Cronograma
              </Button>

              {/* Cronograma de amortização */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-h-40 overflow-y-auto bg-white/5 rounded-lg p-4"
                >
                  <h4 className="text-white font-medium mb-2">Cronograma (primeiras 12 parcelas)</h4>
                  <div className="space-y-1 text-xs">
                    {result.amortizationSchedule.slice(0, 12).map((item) => (
                      <div key={item.month} className="flex justify-between text-white/70">
                        <span>Mês {item.month}</span>
                        <span>{formatCurrency(item.payment)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!isValid && (
          <div className="text-red-400 text-sm text-center">
            Verifique os valores inseridos
          </div>
        )}
      </CardContent>
    </Card>
  );
}