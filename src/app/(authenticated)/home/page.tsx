"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { buttonStyles } from "@/components/ui/Button";
import type { Todo } from "@/types/todo";

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const response = await fetch("/api/todos");
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    };
    loadTodos();
  }, []);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return (
    <section className="space-y-10">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-2)] px-6 py-10 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
              painel principal
            </p>
            <h1 className="text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
              Visao geral da sua produtividade
            </h1>
            <p className="max-w-xl text-sm text-[var(--muted)]">
              Acompanhe entregas, organize prioridades e mantenha o foco nos
              objetivos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/todos" className={buttonStyles({ fullWidth: true })}>
              Abrir tarefas
            </Link>
            <Link
              href="/account"
              className={buttonStyles({ variant: "outline", fullWidth: true })}
            >
              Minha conta
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          ["Total", stats.total],
          ["Em aberto", stats.active],
          ["Concluidas", stats.completed],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
              {label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-[var(--ink)]">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
              proximas entregas
            </p>
            <p className="text-sm text-[var(--muted)]">
              Visualize as ultimas tarefas criadas.
            </p>
          </div>
          <Link href="/todos" className={buttonStyles({ variant: "outline" })}>
            Ver todas
          </Link>
        </div>
        <div className="mt-6 grid gap-3">
          {todos.slice(0, 4).map((todo) => (
            <div
              key={todo.id}
              className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm"
            >
              <span className="font-semibold text-[var(--ink)]">
                {todo.title}
              </span>
              {todo.description && (
                <span className="text-xs text-[var(--muted)]">
                  {todo.description}
                </span>
              )}
            </div>
          ))}
          {todos.length === 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-6 text-sm text-[var(--muted)]">
              Nenhuma tarefa criada ainda. Crie sua primeira tarefa no painel.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
