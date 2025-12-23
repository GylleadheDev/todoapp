

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const user = await verifyAuth(cookieStore);
  

  return (
    <section className="space-y-10">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-2)] px-6 py-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
              conta
            </p>
            <h1 className="text-3xl font-semibold text-[var(--ink)]">
              Minha conta
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Gerencie dados e preferencias do seu acesso.
            </p>
          </div>
          <Button variant="outline">Editar perfil</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
            dados pessoais
          </p>
          <div className="mt-5 space-y-4">
            <Input
              label="Nome completo"
              placeholder="Seu nome"
              value={user?.name || ""}
              readOnly
            />
            <Input
              label="Email"
              placeholder="nome@empresa.com"
              value={user?.email || ""}
              readOnly
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
            seguranca
          </p>
          <div className="mt-5 space-y-4">
            <Input
              label="Senha"
              placeholder="********"
              value="********"
              readOnly
            />
            <Button fullWidth>Atualizar senha</Button>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
          preferencias
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--muted)]">
            Alertas por email: em breve
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--muted)]">
            Integracoes: em breve
          </div>
        </div>
      </div>
    </section>
  );
}
