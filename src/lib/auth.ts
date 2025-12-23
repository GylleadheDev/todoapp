// Auth utils
// lib/auth.ts
import bcrypt from 'bcryptjs'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest } from 'next/server'
import { prisma } from './db'
import { jwtVerify } from 'jose'
import { SignJWT } from 'jose'

// Chave secreta para assinar tokens
const jwtSecret = process.env.JWT_SECRET;
const secretValue =
  jwtSecret && jwtSecret.trim().length > 0
    ? jwtSecret
    : "seu-secret-super-seguro-aqui";
const secret = new TextEncoder().encode(secretValue);

// ========== HASH DE SENHA ==========
export async function hashPassword(password: string): Promise<string> {
  // Transforma "senha123" em algo como:
  // "$2a$10$N9qo8uLOickgx2ZMRZoMye..."
  return bcrypt.hash(password, 10)  // 10 = número de rounds (segurança)
}

// ========== VERIFICAR SENHA ==========
export async function verifyPassword(
  password: string,          // Senha que o usuário digitou
  hashedPassword: string     // Senha hasheada do banco
): Promise<boolean> {
  // Compara se são iguais
  return bcrypt.compare(password, hashedPassword)
}
// ========== VERIFICAR AUTENTICAÇÃO DO USUARIO ==========
function readToken(source: NextRequest | ReadonlyRequestCookies): string | undefined {
  if ("cookies" in source) {
    return source.cookies.get("token")?.value;
  }
  return source.get("token")?.value;
}

export async function verifyAuth(
  requestOrCookies: NextRequest | ReadonlyRequestCookies
) {
  const token = readToken(requestOrCookies);
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;
    return await prisma.user.findUnique({ where: { id: userId } });
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return null;
  }
}

// ========== CRIAR TOKEN JWT ==========
export async function createToken(userId: string): Promise<string> {
  // Cria um token que contém o ID do usuário
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })  // Algoritmo de criptografia
    .setIssuedAt()                          // Data de criação
    .setExpirationTime('7d')                // Expira em 7 dias
    .sign(secret)                           // Assina com a chave secreta
}
