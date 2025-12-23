import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Crie sua conta e comece a organizar projetos hoje."
      subtitle="Configure seu espaco, convide o time e acompanhe entregas com uma experiencia corporativa e acolhedora."
      benefits={[
        "configuracao rapida",
        "time conectado",
        "templates prontos",
        "onboarding guiado",
      ]}
    >
      <RegisterForm />
    </AuthShell>
  );
}
