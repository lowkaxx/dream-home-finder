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
  properties?: {
    id: string;
    title: string;
    address: string;
    city: string;
  };
  profiles?: {
    display_name: string | null;
    avatar_url: string | null;
  };
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

// Stub service — visits_schedule table does not exist yet.
// All methods return empty/noop so the app compiles without the table.
export class VisitService {
  static async createVisit(visitData: CreateVisitData): Promise<VisitSchedule> {
    console.warn('VisitService.createVisit: visits_schedule table not configured');
    return { ...visitData, status: 'pending' } as VisitSchedule;
  }

  static async getUserVisits(): Promise<VisitSchedule[]> {
    return [];
  }

  static async getAllVisits(): Promise<VisitSchedule[]> {
    return [];
  }

  static async updateVisitStatus(_visitId: string, _status: VisitSchedule['status']): Promise<void> {}

  static async cancelVisit(visitId: string): Promise<void> {
    await this.updateVisitStatus(visitId, 'cancelled');
  }

  static async getAvailableTimeSlots(_date: string): Promise<string[]> {
    return ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  }

  static async getVisitsByProperty(_propertyId: string): Promise<VisitSchedule[]> {
    return [];
  }
}
