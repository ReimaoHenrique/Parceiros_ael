# Newsletter API Quickstart

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

## 3) Banco e migrations

Antes de testar `POST /subscribers`, aplique migrations:

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
- `POST /subscribers`
- `GET /subscribers/:id`

## 5) Rodar local simulando Vercel

```bash
vercel dev
```

O projeto usa handler serverless em `api/index.ts` com rewrite global no `vercel.json`.

## 6) Payload de exemplo

```json
{
  "name": "Henrque reimao",
  "email": "Henrique.reimao.hr@gmail.com",
  "linkedin": "https://www.Henriquereimaoasdad.asdasd.asd",
  "services": [
    "Obras Industriais",
    "Obras Comerciais",
    "Obras Hospitalares",
    "Hotelaria",
    "Infraestrutura",
    "Projetos de Engenharia",
    "Incorporacao Imobiliaria"
  ],
  "allAreasSelected": true
}
```

## 7) Erros comuns

### `Command pnpmm not found`

Voce digitou errado. O comando correto e:

```bash
pnpm build
```

### `The table public.Subscriber does not exist`

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

