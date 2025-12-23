# TodoFlow

Um app simples para quem ama produtividade. O TodoFlow ajuda voce a dar um check na sua organizacao com listas leves, fluxo direto e foco no essencial do dia.

## O que este projeto entrega

- Landing page moderna e responsiva com identidade visual propria
- Autenticacao com JWT e cookies HttpOnly
- Painel autenticado com tarefas, filtros e estatisticas
- Conta do usuario com dados basicos e preferencias
- Tema claro/escuro com alternancia

## Stack principal

- Next.js (App Router)
- React
- Prisma + Neon (Postgres)
- Tailwind CSS

## Como rodar localmente

1) Instale dependencias
```bash
npm install
```

2) Configure variaveis de ambiente
Crie um arquivo `.env` com:
```
DATABASE_URL=postgres://...
JWT_SECRET=uma-chave-segura
```

3) Rode o projeto
```bash
npm run dev
```

Abra `http://localhost:3000`.

## Scripts

- `npm run dev` inicia o servidor de desenvolvimento
- `npm run build` gera a build de producao
- `npm run start` inicia a build de producao
- `npm run lint` executa o lint

## Estrutura do projeto (resumo)

- `src/app` rotas e layouts (App Router)
- `src/components` UI e componentes de pagina
- `src/lib` utilitarios de auth e banco
- `src/types` tipos compartilhados

## Autenticacao (como funciona)

- Login e cadastro criam um JWT
- O token fica em cookie HttpOnly com `path=/`
- Rotas autenticadas passam pelo `AuthGuard`
- APIs protegidas validam o usuario via `verifyAuth`

## Principais rotas

- `/` landing page
- `/auth/login` e `/auth/register` autenticacao
- `/home` painel
- `/todos` tarefas
- `/account` conta do usuario

## Tema e identidade visual

O tema usa variaveis CSS no `src/app/globals.css` e um `ThemeProvider` para alternar claro/escuro.

## API (resumo)

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/todos`
- `POST /api/todos`
- `PATCH /api/todos/:id`
- `DELETE /api/todos/:id`

## Observacoes

Se algo quebrar na autenticacao, verifique o `JWT_SECRET` e se o cookie do token esta com `path=/`.
