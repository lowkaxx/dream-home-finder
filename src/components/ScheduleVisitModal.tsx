import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CreateVisitData } from '@/services/visit.service';

interface ScheduleVisitModalProps {
  propertyId: string;
  propertyTitle: string;
  trigger?: React.ReactNode;
}

export function ScheduleVisitModal({ propertyId, propertyTitle, trigger }: ScheduleVisitModalProps) {
  const {
    isOpen,
    setIsOpen,
    isLoading,
    form,
    availableSlots,
    selectedDate,
    onSubmit,
    handleDateSelect,
    handleTimeSelect,
  } = useScheduleVisit(propertyId);

  const [step, setStep] = useState<'form' | 'confirmation'>('form');

  const handleSubmit = async (data: CreateVisitData) => {
    await onSubmit(data);
    setStep('confirmation');
  };

  const resetModal = () => {
    setStep('form');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Visita
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Agendar Visita - {propertyTitle}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Seus Dados
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="visitor_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visitor_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="visitor_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Data e Horário */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Data e Horário
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Calendário */}
                  <div>
                    <FormLabel className="text-sm font-medium">Selecione a Data</FormLabel>
                    <div className="mt-2">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        locale={ptBR}
                        className="rounded-md border"
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="visit_date"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Horários Disponíveis */}
                  <div>
                    <FormLabel className="text-sm font-medium">Horários Disponíveis</FormLabel>
                    <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                      {availableSlots.length > 0 ? (
                        availableSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={form.watch('visit_time') === time ? 'default' : 'outline'}
                            className="w-full justify-start"
                            onClick={() => handleTimeSelect(time)}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            {time}
                          </Button>
                        ))
                      ) : selectedDate ? (
                        <p className="text-sm text-muted-foreground">
                          Nenhum horário disponível para esta data.
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Selecione uma data para ver os horários disponíveis.
                        </p>
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name="visit_time"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Observações */}
              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Observações (opcional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Alguma observação especial ou preferência..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !form.formState.isValid}
                  className="flex-1"
                >
                  {isLoading ? 'Agendando...' : 'Agendar Visita'}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          /* Confirmação */
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-green-600">Visita Agendada!</h3>
              <p className="text-muted-foreground mt-2">
                Sua visita foi agendada com sucesso. Entraremos em contato em breve para confirmar.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Imóvel:</span>
                <span className="text-sm font-medium">{propertyTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Data:</span>
                <span className="text-sm font-medium">
                  {selectedDate && format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Horário:</span>
                <span className="text-sm font-medium">{form.watch('visit_time')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant="secondary">Pendente</Badge>
              </div>
            </div>

            <Button onClick={resetModal} className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}