import { supabase } from '@/integrations/supabase/client';

export interface VisitSchedule {
  id?: string;
  user_id?: string;
  property_id: string;
  visitor_name: string;
  visitor_phone: string;
  visitor_email: string;
  visit_date: string;
  visit_time: string;
  observations?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export interface CreateVisitData {
  property_id: string;
  visitor_name: string;
  visitor_phone: string;
  visitor_email: string;
  visit_date: string;
  visit_time: string;
  observations?: string;
}

export class VisitService {
  static async createVisit(visitData: CreateVisitData): Promise<VisitSchedule> {
    const { data, error } = await supabase
      .from('visits_schedule')
      .insert({
        ...visitData,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserVisits(): Promise<VisitSchedule[]> {
    const { data, error } = await supabase
      .from('visits_schedule')
      .select(`
        *,
        properties (
          id,
          title,
          address,
          city
        )
      `)
      .order('visit_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async getAllVisits(): Promise<VisitSchedule[]> {
    const { data, error } = await supabase
      .from('visits_schedule')
      .select(`
        *,
        properties (
          id,
          title,
          address,
          city
        ),
        profiles (
          display_name,
          avatar_url
        )
      `)
      .order('visit_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async updateVisitStatus(visitId: string, status: VisitSchedule['status']): Promise<void> {
    const { error } = await supabase
      .from('visits_schedule')
      .update({ status })
      .eq('id', visitId);

    if (error) throw error;
  }

  static async cancelVisit(visitId: string): Promise<void> {
    await this.updateVisitStatus(visitId, 'cancelled');
  }

  static async getAvailableTimeSlots(date: string): Promise<string[]> {
    // Horários disponíveis: 9h às 18h, intervalos de 1 hora
    const allSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00', '18:00'
    ];

    // Buscar horários já agendados para esta data
    const { data: bookedSlots, error } = await supabase
      .from('visits_schedule')
      .select('visit_time')
      .eq('visit_date', date)
      .in('status', ['pending', 'confirmed']);

    if (error) throw error;

    const bookedTimes = bookedSlots?.map(slot => slot.visit_time) || [];
    return allSlots.filter(slot => !bookedTimes.includes(slot));
  }

  static async getVisitsByProperty(propertyId: string): Promise<VisitSchedule[]> {
    const { data, error } = await supabase
      .from('visits_schedule')
      .select(`
        *,
        profiles (
          display_name,
          avatar_url
        )
      `)
      .eq('property_id', propertyId)
      .order('visit_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}