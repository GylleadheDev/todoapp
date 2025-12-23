import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Token não encontrado' },
                { status: 401 }
            )
        }

        const response = NextResponse.json(
            { message: 'Logout realizado com sucesso' },
            { status: 200 }
        )

        response.cookies.delete({ name: 'token', path: '/' })

        return response
    } catch (error) {
        console.error('Erro ao fazer logout:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
