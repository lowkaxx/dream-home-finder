import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Upload, X as XIcon, Trash2 } from "lucide-react";
import { useProperty, useCreateProperty, useUpdateProperty, useDeleteProperty } from "@/hooks/useProperties";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminPropertyForm = () => {
  const { id } = useParams();
  const isEdit = id && id !== "novo";
  const { data: existing, isLoading } = useProperty(isEdit ? id : undefined);
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const deleteProperty = useDeleteProperty();
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
    iptu: "",
    condominio: "",
    andar: "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

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
        iptu: existing.iptu || "",
        condominio: existing.condominio || "",
        andar: existing.andar || "",
      });
      setImageUrls(existing.images || []);
    }
  }, [existing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("property-images")
        .upload(path, file, { contentType: file.type });

      if (error) {
        toast({ title: "Erro ao enviar imagem", description: error.message, variant: "destructive" });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(path);

      newUrls.push(urlData.publicUrl);
    }

    setImageUrls((prev) => [...prev, ...newUrls]);
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDelete = async () => {
    if (!existing) return;
    
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o imóvel "${existing.title}"? Esta ação não pode ser desfeita.`
    );
    
    if (!confirmed) return;

    try {
      await deleteProperty.mutateAsync(existing.id);
      toast({ title: "Imóvel excluído com sucesso" });
      navigate("/imoveis");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      toast({ title: "Erro ao excluir", description: message, variant: "destructive" });
    }
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
      images: imageUrls,
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
      navigate("/imoveis");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      toast({ title: "Erro ao salvar", description: message, variant: "destructive" });
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  if (isEdit && isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 container text-center text-muted-foreground">Carregando...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container max-w-2xl">
          <Link to="/imoveis" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <ChevronLeft size={16} /> Voltar
          </Link>

          <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
            {isEdit ? "Editar Imóvel" : "Novo Imóvel"}
          </h1>

          <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-card border border-border p-6 space-y-4">
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

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Imagens do imóvel</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Arraste imagens ou clique para selecionar</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 gold-gradient text-primary-foreground text-sm font-medium rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                >
                  {uploading ? "Enviando..." : "Selecionar Imagens"}
                </label>
              </div>

              {imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {imageUrls.map((url, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-border group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XIcon size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={createProperty.isPending || updateProperty.isPending || uploading}
              className="w-full py-3 gold-gradient text-primary-foreground font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {createProperty.isPending || updateProperty.isPending ? "Salvando..." : isEdit ? "Atualizar Imóvel" : "Cadastrar Imóvel"}
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteProperty.isPending}
                className="w-full py-3 bg-destructive text-destructive-foreground font-heading font-semibold rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                {deleteProperty.isPending ? "Excluindo..." : "Excluir Imóvel"}
              </button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPropertyForm;
