import { Playfair_Display, Manrope } from "next/font/google";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const planOptions: Array<[string, string, string, string[]]> = [
  [
    "Gratis",
    "R$ 0",
    "Para comecar agora",
    ["Listas ilimitadas", "Check diario", "Lembretes basicos"],
  ],
  [
    "Pro",
    "R$ 19",
    "Por mes",
    ["Prioridades inteligentes", "Tags avancadas", "Suporte rapido"],
  ],
  [
    "Equipe",
    "R$ 59",
    "Para times pequenos",
    ["Compartilhamento", "Quadros simples", "Permissoes basicas"],
  ],
];

export default function Home() {
  return (
    <div className={`${body.className} min-h-screen bg-[var(--sand)] text-[var(--ink)]`}>
      <div className="relative overflow-hidden">
        <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-[var(--accent-2)]/50 blur-3xl motion-safe:animate-pulse" />
        <div className="absolute -right-24 top-32 h-80 w-80 rounded-full bg-[var(--mist)] blur-3xl motion-safe:animate-pulse" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[var(--sage)]/10 blur-3xl" />

        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pb-28 lg:pt-16">
          <div className="space-y-7">
            <Link href="">
              <div className="flex w-fit items-center gap-3 rounded-full bg-[var(--surface-2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)] shadow-sm">
                produtividade real
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              </div>
            </Link>
            <h1
              className={`${display.className} text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl lg:text-6xl`}
            >
              Todo Flow, um app simples para quem ama produtividade.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--ink)]/75 sm:text-lg">
              Dê um check na sua organizacao com listas claras e foco no que
              importa. Sem ruido e sem complexidade, apenas o essencial para o
              seu dia render.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/home">
               <Button size="lg" className="hover:translate-y-[-1px]">
                Comecar agora
              </Button>
              </a>
             
              <Button size="lg" variant="outline">
                Ver como funciona
              </Button>
            </div>
            <div className="grid max-w-lg grid-cols-2 gap-4 pt-3 sm:grid-cols-4">
              {[
                ["+42%", "tarefas concluidas"],
                ["3x", "clareza no dia"],
                ["92%", "rotina consistente"],
                ["15m", "ganhos diarios"],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 shadow-sm"
                >
                  <p className="text-lg font-semibold text-[var(--ink)]">
                    {value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--sage)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-8 h-24 w-24 rounded-3xl bg-[var(--accent)]/20 blur-2xl" />
            <Card className="shadow-2xl">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
                  seu painel
                </p>
                <span className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                  hoje
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  "Revisar metas da semana",
                  "Checklist do dia em 5 minutos",
                  "Planejar a proxima sprint",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-sm"
                  >
                    <div className="mt-1 h-3 w-3 rounded-full bg-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--ink)]">
                        {item}
                      </p>
                      <p className="text-xs text-[var(--ink)]/60">
                        {index + 2} check-ins ligados
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-[var(--sand)] px-4 py-4">
                <p className="text-sm font-semibold text-[var(--ink)]">
                  Progresso pessoal
                </p>
                <div className="mt-3 space-y-3">
                  {[
                    ["Rotina", "72%"],
                    ["Foco", "58%"],
                    ["Bem-estar", "84%"],
                  ].map(([team, value]) => (
                    <div key={team}>
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sage)]">
                        <span>{team}</span>
                        <span>{value}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-[var(--surface-2)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <div className="absolute -bottom-8 right-6 rounded-2xl bg-[var(--deep)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-xl shadow-black/20">
              Atualiza em tempo real
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 pb-14 lg:px-10">
        <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-2)] p-6 text-center text-sm font-semibold text-[var(--ink)]/70 shadow-sm sm:grid-cols-4">
          {["Equipe Remota", "Freelancers", "Estudantes", "Criadores"].map(
            (logo) => (
              <div key={logo} className="py-2 text-xs uppercase tracking-[0.3em]">
                {logo}
              </div>
            )
          )}
        </div>
      </section>

      <section
        id="recursos"
        className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-10"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
              recursos essenciais
            </p>
            <h2
              className={`${display.className} text-3xl font-semibold text-[var(--ink)] sm:text-4xl`}
            >
              Tudo o que voce precisa para manter a organizacao em dia.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--ink)]/70">
            Acompanhe tarefas com simplicidade, celebre pequenas vitorias e
            ganhe ritmo sem complicar.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            [
              "Planejamento simples",
              "Defina o que importa e veja a semana com clareza.",
            ],
            [
              "Check-ins leves",
              "Marque o andamento e siga em frente sem distracoes.",
            ],
            [
              "Visao do dia",
              "Prioridades claras para nao esquecer o essencial.",
            ],
            [
              "Lembretes gentis",
              "Notificacoes que ajudam, sem interromper seu fluxo.",
            ],
            [
              "Organizacao pessoal",
              "Listas e tags para manter tudo no lugar.",
            ],
            [
              "Foco no habito",
              "Pequenas acoes diarias que viram constancia.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--sage)]">
                {title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/70">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="como"
        className="mx-auto w-full max-w-6xl px-6 pb-24 lg:px-10"
      >
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--deep)] px-8 py-10 text-white shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                como funciona
              </p>
              <h2 className={`${display.className} text-3xl sm:text-4xl`}>
                Um fluxo direto para quem quer fazer mais com menos esforco.
              </h2>
            </div>
            <Button variant="primary" className="hover:translate-y-[-1px]">
              Ver o fluxo completo
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["1. Liste", "Escreva suas tarefas sem friccao."],
              ["2. Priorize", "Escolha o que realmente importa hoje."],
              ["3. Conclua", "Marque o check e siga em frente."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/15 bg-white/10 p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
                  {title}
                </p>
                <p className="mt-3 text-sm text-white/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="historia"
        className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
              historia real
            </p>
            <h2
              className={`${display.className} text-3xl font-semibold text-[var(--ink)] sm:text-4xl`}
            >
              “Passei a finalizar o dia com leveza e clareza.”
            </h2>
            <p className="text-sm text-[var(--ink)]/70">
              Mariana Lopes, designer independente
            </p>
          </div>
          <Card className="p-8">
            <p className="text-sm leading-relaxed text-[var(--ink)]/70">
              Com o Todo Flow eu organizo o dia em minutos, acompanho o que
              falta sem ansiedade e mantenho a rotina saudavel. As pequenas
              metas diarias viraram habito em poucas semanas.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["-30%", "procrastinacao"],
                ["+45%", "clareza diaria"],
                ["2 semanas", "para virar habito"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-[var(--sand)] px-4 py-3 text-center"
                >
                  <p className="text-lg font-semibold text-[var(--ink)]">
                    {value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--sage)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section
        id="planos"
        className="mx-auto w-full max-w-6xl px-6 pb-24 lg:px-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
              planos flexiveis
            </p>
            <h2
              className={`${display.className} text-3xl font-semibold text-[var(--ink)] sm:text-4xl`}
            >
              Preco justo para quem so quer se organizar.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--ink)]/70">
            Comece gratis e evolua quando fizer sentido. Sem contratos, sem
            complicacao.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {planOptions.map(([title, price, note, items], index) => (
            <div
              key={title}
              className={`rounded-[2rem] border ${
                index === 1
                  ? "border-[var(--accent)] bg-[var(--surface)] shadow-2xl shadow-[var(--accent)]/20"
                  : "border-[var(--border)] bg-[var(--surface)] shadow-sm"
              } p-6`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
                  {title}
                </p>
                {index === 1 && (
                  <span className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    mais escolhido
                  </span>
                )}
              </div>
              <p className="mt-4 text-3xl font-semibold text-[var(--ink)]">
                {price}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink)]/50">
                {note}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--ink)]/70">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6"
                fullWidth
                variant={index === 1 ? "primary" : "outline"}
              >
                Escolher
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-10">
        <div className="rounded-[2rem] border border-white/70 bg-[var(--accent)] px-8 py-10 text-white shadow-2xl shadow-[var(--accent)]/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                pronto para organizar
              </p>
              <h2 className={`${display.className} text-3xl sm:text-4xl`}>
                De um check na sua organizacao hoje.
              </h2>
              <p className="max-w-xl text-sm text-white/80">
                Tudo que voce precisa para manter o foco e fechar o dia com
                tranquilidade.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg" className="hover:-translate-y-1">
                Comecar gratis
              </Button>
              <Button variant="outline" size="lg" className="hover:-translate-y-1">
                Ver planos
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--surface-2)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 text-sm text-[var(--ink)]/70 lg:flex-row lg:px-10">
          <div>
            <p className={`${display.className} text-lg text-[var(--ink)]`}>
              TodoFlow
            </p>
            <p className="mt-2 max-w-sm text-sm text-[var(--ink)]/60">
              Todo Flow e simples, leve e feito para quem ama produtividade.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em] text-[var(--sage)]">
            <span>recursos</span>
            <span>precos</span>
            <span>suporte</span>
            <span>blog</span>
          </div>
          <div className="rounded-full bg-[var(--deep)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            suporte@todoflow.com
          </div>
        </div>
      </footer>
    </div>
  );
}
