import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useProperty, useCreateProperty, useUpdateProperty } from "@/hooks/useProperties";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const AdminPropertyForm = () => {
  const { id } = useParams();
  const isEdit = id && id !== "novo";
  const { data: existing, isLoading } = useProperty(isEdit ? id : undefined);
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    type: "venda" as "venda" | "aluguel",
    price: "",
    area: "",
    bedrooms: "0",
    bathrooms: "0",
    parking: "0",
    address: "",
    city: "",
    description: "",
    images: "",
    iptu: "",
    condominio: "",
    andar: "",
  });

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title,
        type: existing.type as "venda" | "aluguel",
        price: String(existing.price),
        area: String(existing.area),
        bedrooms: String(existing.bedrooms),
        bathrooms: String(existing.bathrooms),
        parking: String(existing.parking),
        address: existing.address,
        city: existing.city,
        description: existing.description || "",
        images: existing.images.join("\n"),
        iptu: existing.iptu || "",
        condominio: existing.condominio || "",
        andar: existing.andar || "",
      });
    }
  }, [existing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      type: form.type,
      price: Number(form.price),
      area: Number(form.area),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      parking: Number(form.parking),
      address: form.address.trim(),
      city: form.city.trim(),
      description: form.description.trim() || null,
      images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
      iptu: form.iptu.trim() || null,
      condominio: form.condominio.trim() || null,
      andar: form.andar.trim() || null,
    };

    try {
      if (isEdit) {
        await updateProperty.mutateAsync({ id, ...payload });
        toast({ title: "Imóvel atualizado com sucesso" });
      } else {
        await createProperty.mutateAsync(payload);
        toast({ title: "Imóvel cadastrado com sucesso" });
      }
      navigate("/admin");
    } catch (err: any) {
      toast({ title: "Erro ao salvar", description: err.message, variant: "destructive" });
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  if (isEdit && isLoading) {
    return <div className="min-h-screen bg-muted flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card shadow-card">
        <div className="container flex items-center h-16 gap-3">
          <img src={logo} alt="Soluction" className="h-10 w-auto" />
          <span className="font-heading font-bold text-foreground text-lg">Admin</span>
        </div>
      </header>

      <div className="container py-8 max-w-2xl">
        <Link to="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft size={16} /> Voltar
        </Link>

        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
          {isEdit ? "Editar Imóvel" : "Novo Imóvel"}
        </h1>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-card p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Título *</label>
              <input name="title" value={form.title} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Tipo *</label>
              <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Preço (R$) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Área (m²) *</label>
              <input name="area" type="number" value={form.area} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Andar</label>
              <input name="andar" value={form.andar} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Quartos</label>
              <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Banheiros</label>
              <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Vagas</label>
              <input name="parking" type="number" value={form.parking} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Endereço *</label>
              <input name="address" value={form.address} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Cidade *</label>
              <input name="city" value={form.city} onChange={handleChange} required className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">IPTU</label>
              <input name="iptu" value={form.iptu} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Condomínio</label>
              <input name="condominio" value={form.condominio} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Descrição</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass + " resize-none"} />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">URLs das imagens (uma por linha)</label>
            <textarea name="images" value={form.images} onChange={handleChange} rows={3} className={inputClass + " resize-none"} placeholder="https://exemplo.com/foto1.jpg&#10;https://exemplo.com/foto2.jpg" />
          </div>

          <button
            type="submit"
            disabled={createProperty.isPending || updateProperty.isPending}
            className="w-full py-3 gold-gradient text-primary-foreground font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {createProperty.isPending || updateProperty.isPending ? "Salvando..." : isEdit ? "Atualizar Imóvel" : "Cadastrar Imóvel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPropertyForm;
