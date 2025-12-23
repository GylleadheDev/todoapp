// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, createToken } from '@/lib/auth'
import { registerSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    // ========== PASSO 1: RECEBER DADOS ==========
    const body = await request.json()
    // body = { name: "João", email: "joao@...", password: "senha123" }

    // ========== PASSO 2: VALIDAR DADOS ==========
    const validation = registerSchema.safeParse(body)
    
    if (!validation.success) {
      // ❌ Dados inválidos, retorna erro 400
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error },
        { status: 400 }
      )
    }

    const { name, email, password } = validation.data
    // Dados validados! ✅

    // ========== PASSO 3: VERIFICAR SE EMAIL JÁ EXISTE ==========
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      // ❌ Email já cadastrado, retorna erro 409
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      )
    }

    // ========== PASSO 4: FAZER HASH DA SENHA ==========
    const hashedPassword = await hashPassword(password)
    // "senha123" → "$2a$10$abc123def456..."

    // ========== PASSO 5: CRIAR USUÁRIO NO BANCO ==========
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword  // ✅ Senha segura
      }
    })
    // user = { id: "abc123", name: "João", email: "joao@...", ... }

    // ========== PASSO 6: CRIAR TOKEN JWT ==========
    const token = await createToken(user.id)
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

    // ========== PASSO 7: PREPARAR RESPOSTA ==========
    const response = NextResponse.json(
      {
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
          // ⚠️ NÃO retorna a senha!
        }
      },
      { status: 201 }  // 201 = Created
    )

    // ========== PASSO 8: SETAR COOKIE COM TOKEN ==========
    response.cookies.set('token', token, {
      httpOnly: true,     // JS não pode acessar (segurança XSS)
      secure: process.env.NODE_ENV === 'production',  // HTTPS em prod
      sameSite: 'lax',    // Proteção CSRF
      maxAge: 60 * 60 * 24 * 7,  // 7 dias em segundos
      path: '/'
    })

    // ========== PASSO 9: RETORNAR RESPOSTA ==========
    return response
    // ✅ Usuário criado e logado automaticamente!

  } catch (error) {
    // ========== ERRO INESPERADO ==========
    console.error('Erro ao registrar usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
