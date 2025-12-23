"use client";

import Link from "next/link";
import { useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        showToast.success("Cadastro realizado com sucesso!", {
          duration: 2500,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, 2500);
      } else {
        showToast.error(data.error ?? "Erro ao cadastrar", {
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
          novo cadastro
        </p>
        <h2 className="text-2xl font-semibold text-[var(--ink)]">
          Criar conta
        </h2>
        <p className="text-sm text-[var(--ink)]/60">
          Inicie sua jornada com acesso completo ao TodoFlow.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Nome"
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          placeholder="Crie uma senha segura"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Criando..." : "Criar conta"}
      </Button>

      <div className="text-center text-xs text-[var(--ink)]/60">
        Ja tem conta?{" "}
        <Link className="font-semibold text-[var(--accent)]" href="/auth/login">
          Fazer login
        </Link>
      </div>
    </form>
  );
};
