// Validations
// lib/validations.ts
import { z } from 'zod'

// 1. Define o schema (regras) para registro
export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    
  email: z.string()
    .email('Email inválido'),
    
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
})

// 2. Define o schema para login
export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido'),
    
  password: z.string()
    .min(1, 'Senha é obrigatória')
})

// 3. Exporta os tipos TypeScript baseados nos schemas
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>