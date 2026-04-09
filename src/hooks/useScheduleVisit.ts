import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VisitService, CreateVisitData, VisitSchedule } from '@/services/visit.service';
import { useToast } from '@/hooks/use-toast';

// Schema de validação Zod
const scheduleVisitSchema = z.object({
  visitor_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  visitor_phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  visitor_email: z.string().email('Email inválido'),
  visit_date: z.string().min(1, 'Data é obrigatória'),
  visit_time: z.string().min(1, 'Horário é obrigatório'),
  observations: z.string().optional(),
});

type ScheduleVisitForm = z.infer<typeof scheduleVisitSchema>;

export function useScheduleVisit(propertyId: string) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { toast } = useToast();

  const form = useForm<ScheduleVisitForm>({
    resolver: zodResolver(scheduleVisitSchema),
    defaultValues: {
      visitor_name: '',
      visitor_phone: '',
      visitor_email: '',
      visit_date: '',
      visit_time: '',
      observations: '',
    },
  });

  // Carregar horários disponíveis quando a data muda
  useEffect(() => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      loadAvailableSlots(dateString);
    }
  }, [selectedDate, loadAvailableSlots]);

  const loadAvailableSlots = useCallback(async (date: string) => {
    try {
      const slots = await VisitService.getAvailableTimeSlots(date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os horários disponíveis.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const onSubmit = async (data: ScheduleVisitForm) => {
    setIsLoading(true);
    try {
      const visitData: CreateVisitData = {
        property_id: propertyId,
        visitor_name: data.visitor_name,
        visitor_phone: data.visitor_phone,
        visitor_email: data.visitor_email,
        visit_date: data.visit_date,
        visit_time: data.visit_time,
        observations: data.observations,
      };

      await VisitService.createVisit(visitData);

      toast({
        title: 'Visita agendada!',
        description: 'Sua visita foi agendada com sucesso. Entraremos em contato para confirmação.',
      });

      form.reset();
      setIsOpen(false);
      setSelectedDate(undefined);
      setAvailableSlots([]);

    } catch (error) {
      console.error('Erro ao agendar visita:', error);
      toast({
        title: 'Erro ao agendar',
        description: 'Não foi possível agendar a visita. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      form.setValue('visit_date', dateString);
      form.setValue('visit_time', ''); // Reset time when date changes
    } else {
      form.setValue('visit_date', '');
    }
  };

  const handleTimeSelect = (time: string) => {
    form.setValue('visit_time', time);
  };

  return {
    isOpen,
    setIsOpen,
    isLoading,
    form,
    availableSlots,
    selectedDate,
    onSubmit,
    handleDateSelect,
    handleTimeSelect,
  };
}