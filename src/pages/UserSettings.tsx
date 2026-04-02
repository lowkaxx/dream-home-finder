import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UserSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setDisplayName(data.display_name || "");
          setAvatarUrl(data.avatar_url || "");
        }
      });
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim(), avatar_url: avatarUrl.trim() || null })
      .eq("user_id", user.id);

    setLoading(false);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Perfil atualizado com sucesso!" });
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-lg">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Configurações</h1>

          <form onSubmit={handleSave} className="bg-card rounded-lg shadow-card p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Nome de exibição</label>
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">URL do avatar</label>
              <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
              <input value={user?.email || ""} disabled className={inputClass + " opacity-60 cursor-not-allowed"} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 gold-gradient text-primary-foreground font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserSettings;
