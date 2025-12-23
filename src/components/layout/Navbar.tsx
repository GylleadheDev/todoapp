"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Playfair_Display, Manrope } from "next/font/google";
import { Flashlight, Menu, Moon, Sun } from "lucide-react";
import { VscTasklist } from "react-icons/vsc";

import { buttonStyles, Button } from "@/components/ui/Button";
import { useTheme } from "@/components/theme/ThemeProvider";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type NavbarVariant = "public" | "authenticated";

const publicLinks = [
  { href: "/#como", label: "Como funciona" },
  { href: "/#recursos", label: "Recursos" },
  { href: "/#planos", label: "Planos" },
  { href: "/#historia", label: "Historias" },
];

const authenticatedLinks = [
  { href: "/home", label: "Painel" },
  { href: "/todos", label: "Tarefas" },
  { href: "/account", label: "Conta" },
];

export const Navbar = ({ variant }: { variant?: NavbarVariant }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const resolvedVariant = useMemo<NavbarVariant>(() => {
    if (variant) return variant;
    if (
      pathname?.startsWith("/home") ||
      pathname?.startsWith("/account") ||
      pathname?.startsWith("/todos")
    ) {
      return "authenticated";
    }
    return "public";
  }, [pathname, variant]);

  const links = resolvedVariant === "authenticated" ? authenticatedLinks : publicLinks;

  useEffect(() => {
    if (resolvedVariant !== "authenticated") {
      setUserName(null);
      return;
    }

    let isActive = true;
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) return;
        const data = (await response.json()) as { name?: string };
        if (isActive) {
          setUserName(data.name ?? null);
        }
      } catch {
        if (isActive) {
          setUserName(null);
        }
      }
    };

    loadUser();
    return () => {
      isActive = false;
    };
  }, [resolvedVariant]);

  const initials = userName
    ? userName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "U";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        router.push("/auth/login");
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className={`${body.className} sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--sand)]/80 backdrop-blur`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        {resolvedVariant === "authenticated" ? (
          <a href="/account">
              <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/25">
              {initials}
            </div>
            <div className="leading-tight">
              <p className={`${display.className} text-sm font-semibold text-[var(--ink)]`}>
                {userName ?? "Sua conta"}
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--sage)]">
                usuario
              </p>
            </div>
          </div>
          </a>
        
        ) : (
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 flex justify-center items-center rounded-xl bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30">
              <VscTasklist className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <p className={`${display.className} text-lg font-semibold text-[var(--ink)]`}>
                TodoFlow
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--sage)]">
                Your tasks, simplified
              </p>
            </div>
          </Link>
        )}

        <div className="hidden items-center gap-8 text-sm font-semibold text-[var(--ink)]/80 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-[var(--accent)] ${resolvedVariant === "authenticated" && pathname === link.href
                  ? "text-[var(--accent)]"
                  : ""
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="h-10 w-10 rounded-full p-0"
          >
            {theme === "light" ? (
                <span className="flex gap-2  justify-center align-center">
                  <Moon className="h-6 w-6 " />
              
                </span>
            ) : (
                <span className="flex gap-2  justify-center align-center">
                  <Sun className="h-6 w-6 " />
                  
                </span>
            )}
          </button>
          {resolvedVariant === "authenticated" ? (
            <>
              <Button
              variant="outline"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Saindo..." : "Sair"}
              </Button>
              <Link href="/home" className={buttonStyles()}>
                Abrir painel
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={buttonStyles({ variant: "outline" })}>
                Entrar
              </Link>
              <Link href="/auth/register" className={buttonStyles()}>
                Comecar gratis
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--ink)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink)]/70 transition hover:border-[var(--ink)]/40 lg:hidden"
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
        >
          Menu
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-4 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-4 text-sm font-semibold text-[var(--ink)]/80">
            <button

              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="h-10 w-10 bg-[var(--accent)] text-[var(--surface)] cursor-pointer text-center m-auto w-full rounded-full p-0 "
            >
              {theme === "light" ? (
                <span className="flex gap-2  justify-center align-center">
                  <Moon className="h-6 w-6 " />
                  <h2>Modo escuro</h2>
                </span>

              ) : (
                 <span className="flex gap-2  justify-center align-center">
                  <Sun className="h-6 w-6 " />
                  <h2>Modo claro</h2>
                </span>
              )}
            </button>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
            {resolvedVariant === "authenticated" ? (
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Saindo..." : "Sair"}
              </Button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className={buttonStyles({ variant: "outline", fullWidth: true })}
                >
                  Entrar
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className={buttonStyles({ fullWidth: true })}
                >
                  Comecar gratis
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
