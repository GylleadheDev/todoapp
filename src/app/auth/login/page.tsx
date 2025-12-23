import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Entre com seguranca e mantenha seu time alinhado."
      subtitle="Acesse o painel para acompanhar metas, tarefas e indicadores em tempo real. Tudo em um só lugar."
      benefits={[
        "painel em tempo real",
        "dados protegidos",
        "rituais guiados",
        "suporte humano",
      ]}
    >
      <LoginForm />
    </AuthShell>
  );
}
