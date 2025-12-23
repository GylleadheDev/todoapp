import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/todos - Listar todos do usuário
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const todos = await prisma.todo.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(todos)
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST /api/todos - Criar novo todo
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description } = body

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: user.id
      }
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
