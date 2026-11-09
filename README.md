# Parceiros API Quickstart

## 1) Ambiente

- Node + pnpm instalados
- Variavel obrigatoria no `.env`:

```env
DATABASE_URL="prisma+postgres://...sua_url_do_accelerate..."
PORT=3000
```

## 2) Comandos principais

```bash
pnpm install
npx prisma generate
pnpm build
```

Variaveis de ambiente:

```env
DATABASE_URL="postgres://...@db.prisma.io:5432/postgres?sslmode=require"
JWT_SECRET="mesmo segredo do nestjs_auth_ael"
PORT=3000
```

## 3) Banco e migrations

Antes de testar `POST /parceiros`, aplique migrations:

```bash
npx prisma migrate deploy
```

Em ambiente de desenvolvimento voce pode usar:

```bash
npx prisma migrate dev
```

## 4) Rodar local (Nest)

```bash
pnpm dev
```

Rotas:

- `GET /health`
- `GET /version`
- `POST /parceiros` (aberto)
- `GET /parceiros` (JWT + tag `rh`)
- `GET /parceiros/:id` (aberto)
- `DELETE /parceiros/:id` (JWT + tag `rh`)

## 5) Rodar local simulando Vercel

```bash
vercel dev
```

O projeto usa handler serverless em `api/index.ts` com rewrite global no `vercel.json`.

## 6) Payload de exemplo

```json
{
  "nome": "Henrique Reimao",
  "email": "Henrique.reimao.hr@gmail.com",
  "telefone": "+55 71 99999-9999",
  "area": "Projetos de Engenharia",
  "cidade": "Salvador",
  "linkedin": "https://www.Henriquereimaoasdad.asdasd.asd",
  "mensagem": "Tenho interesse em parceria."
}
```

## 7) Autenticacao (GET /parceiros e DELETE /parceiros/:id)

O token **nao e gerado aqui**. Quem emite e a API de autenticacao
(`nestjs_auth_ael`), via `POST /auth/login`. Esta API apenas valida o
access token com o mesmo `JWT_SECRET` e exige a tag `rh`.

```bash
curl -X POST https://nestjs-auth-ael.vercel.app/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"usuario@ael.com","password":"senha"}'
```

```bash
curl https://parceiros-ael.vercel.app/parceiros \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

Respostas:

- `401 No token provided` / `401 Invalid token` - token ausente, malformado ou assinatura invalida
- `403 Apenas usuarios com a tag rh podem acessar esta rota` - token valido sem a tag `rh`

## 8) Erros comuns

### `Command pnpmm not found`

Voce digitou errado. O comando correto e:

```bash
pnpm build
```

### `The table public.Parceiro does not exist`

Migration nao aplicada. Rode:

```bash
npx prisma migrate deploy
```

### `Cannot read properties of undefined (reading 'create')`

Normalmente build antigo/cache. Rode:

```bash
pnpm build
vercel dev
```

Se persistir, pare o processo e suba de novo.
