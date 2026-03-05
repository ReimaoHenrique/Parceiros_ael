DROP TABLE IF EXISTS "Subscriber";

CREATE TABLE "Parceiro" (
  "id" SERIAL NOT NULL,
  "nome" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "telefone" TEXT NOT NULL,
  "area" TEXT NOT NULL,
  "cidade" TEXT,
  "linkedin" TEXT,
  "mensagem" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Parceiro_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Parceiro_email_key" ON "Parceiro"("email");
