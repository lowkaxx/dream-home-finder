import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VisitService, VisitSchedule } from '@/services/visit.service';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/AdminLayout';

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  confirmed: { label: 'Confirmada', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: XCircle },
  completed: { label: 'Concluída', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
};

export default function AdminVisits() {
  const [visits, setVisits] = useState<VisitSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState<VisitSchedule | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      const data = await VisitService.getAllVisits();
      setVisits(data);
    } catch (error) {
      console.error('Erro ao carregar visitas:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as visitas.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateVisitStatus = async (visitId: string, status: VisitSchedule['status']) => {
    try {
      await VisitService.updateVisitStatus(visitId, status);
      await loadVisits();
      toast({
        title: 'Status atualizado',
        description: 'O status da visita foi atualizado com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: VisitSchedule['status']) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Carregando visitas...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Agendamentos de Visitas</h1>
          <div className="flex gap-2">
            <Badge variant="secondary">
              Total: {visits.length}
            </Badge>
            <Badge variant="outline">
              Pendentes: {visits.filter(v => v.status === 'pending').length}
            </Badge>
          </div>
        </div>

        <div className="grid gap-4">
          {visits.map((visit) => (
            <Card key={visit.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {(visit as any).properties?.title || 'Imóvel não encontrado'}
                  </CardTitle>
                  {getStatusBadge(visit.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{visit.visitor_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{visit.visitor_phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{visit.visitor_email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {format(new Date(visit.visit_date), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{visit.visit_time}</span>
                  <span className="text-sm text-muted-foreground">
                    • {(visit as any).properties?.address}, {(visit as any).properties?.city}
                  </span>
                </div>

                {visit.observations && (
                  <div className="bg-muted/50 rounded p-3 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Observações:</strong> {visit.observations}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Select
                      value={visit.status}
                      onValueChange={(value: VisitSchedule['status']) =>
                        updateVisitStatus(visit.id!, value)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="confirmed">Confirmar</SelectItem>
                        <SelectItem value="cancelled">Cancelar</SelectItem>
                        <SelectItem value="completed">Concluída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Detalhes da Visita</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Visitante</label>
                            <p className="text-sm text-muted-foreground">{visit.visitor_name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Telefone</label>
                            <p className="text-sm text-muted-foreground">{visit.visitor_phone}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <p className="text-sm text-muted-foreground">{visit.visitor_email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Data</label>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(visit.visit_date), "dd/MM/yyyy", { locale: ptBR })}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Horário</label>
                            <p className="text-sm text-muted-foreground">{visit.visit_time}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Status</label>
                            <div className="mt-1">{getStatusBadge(visit.status)}</div>
                          </div>
                        </div>
                        {visit.observations && (
                          <div>
                            <label className="text-sm font-medium">Observações</label>
                            <p className="text-sm text-muted-foreground mt-1">{visit.observations}</p>
                          </div>
                        )}
                        <div>
                          <label className="text-sm font-medium">Imóvel</label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(visit as any).properties?.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {(visit as any).properties?.address}, {(visit as any).properties?.city}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {visits.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Nenhuma visita agendada</h3>
            <p className="text-sm text-muted-foreground">
              As visitas agendadas aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}