"use client";

import Link from "next/link";
import { useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        showToast.success("Login realizado com sucesso!", {
          duration: 1500,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, 1500);
      } else {
        showToast.error(data.error ?? "Erro ao entrar", {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
          acesso ao painel
        </p>
        <h2 className="text-2xl font-semibold text-[var(--ink)]">Entrar</h2>
        <p className="text-sm text-[var(--ink)]/60">
          Use suas credenciais corporativas para continuar.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="nome@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <div className="flex items-center justify-between text-xs text-[var(--ink)]/60">
        <span>Esqueceu a senha?</span>
        <Link className="font-semibold text-[var(--accent)]" href="/auth/register">
          Criar conta
        </Link>
      </div>
    </form>
  );
};
