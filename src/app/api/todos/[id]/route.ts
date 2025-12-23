import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Params = {
  params: { id: string } | Promise<{ id: string }>;
};

const resolveParams = async (params: Params["params"]) => {
  const resolved = await Promise.resolve(params);
  return resolved.id;
};

// GET /api/todos/[id] - Buscar um todo específico
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = await resolveParams(params);
    const todo = await prisma.todo.findFirst({
      where: { id, userId: user.id },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo não encontrado" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/todos/[id] - Atualizar um todo
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = await resolveParams(params);
    const body = await request.json();
    const { title, description, completed } = body;

    const todo = await prisma.todo.updateMany({
      where: { id, userId: user.id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(completed !== undefined ? { completed } : {}),
      },
    });

    if (todo.count === 0) {
      return NextResponse.json({ error: "Todo não encontrado" }, { status: 404 });
    }

    const updated = await prisma.todo.findFirst({
      where: { id, userId: user.id },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/todos/[id] - Atualizar um todo (alias para PATCH)
export async function PUT(request: NextRequest, context: Params) {
  return PATCH(request, context);
}

// DELETE /api/todos/[id] - Remover um todo
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = await resolveParams(params);
    const result = await prisma.todo.deleteMany({
      where: { id, userId: user.id },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Todo não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
