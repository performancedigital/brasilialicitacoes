-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'PRO', 'INFINITY_PLUS');

-- CreateEnum
CREATE TYPE "BiddingStatus" AS ENUM ('OPEN', 'CLOSED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "KanbanStage" AS ENUM ('LEAD', 'AVALIANDO', 'ENCAMINHADO', 'VENCIDO');

-- CreateEnum
CREATE TYPE "PortalType" AS ENUM ('PNCP', 'COMPRAS_GOV');

-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCESS', 'PARTIAL', 'FAILED');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'PROCESSED', 'FAILED', 'SKIPPED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "planType" "PlanType" NOT NULL DEFAULT 'FREE',
    "planExpiresAt" TIMESTAMP(3),
    "cnpj" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "PortalType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Portal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bidding" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "portalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organ" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT,
    "modality" TEXT NOT NULL,
    "estimatedValue" DECIMAL(15,2),
    "openingDate" TIMESTAMP(3),
    "status" "BiddingStatus" NOT NULL DEFAULT 'OPEN',
    "pdfUrl" TEXT,
    "rawText" TEXT,
    "aiSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bidding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiddingItem" (
    "id" TEXT NOT NULL,
    "biddingId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" DECIMAL(15,4),
    "unit" TEXT,

    CONSTRAINT "BiddingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedBidding" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "biddingId" TEXT NOT NULL,
    "stage" "KanbanStage" NOT NULL DEFAULT 'LEAD',
    "notes" TEXT,
    "alertAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedBidding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "keywords" TEXT[],
    "states" TEXT[],
    "portals" "PortalType"[],
    "minValue" DECIMAL(15,2),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationSource" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "authType" TEXT NOT NULL DEFAULT 'none',
    "rateLimit" INTEGER NOT NULL DEFAULT 60,
    "supportsIncremental" BOOLEAN NOT NULL DEFAULT true,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationRun" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "status" "RunStatus" NOT NULL DEFAULT 'PENDING',
    "windowStart" TIMESTAMP(3) NOT NULL,
    "windowEnd" TIMESTAMP(3) NOT NULL,
    "totalFetched" INTEGER NOT NULL DEFAULT 0,
    "totalUpserted" INTEGER NOT NULL DEFAULT 0,
    "totalErrors" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntegrationRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationCursor" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "lastValue" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationCursor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationRawEvent" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "payloadHash" TEXT NOT NULL,
    "rawPayload" JSONB NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
    "errorMessage" TEXT,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationRawEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationDeadLetter" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "rawPayload" JSONB NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationDeadLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimitEntry" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "resetAt" TIMESTAMP(3) NOT NULL,
    "tokensUsed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimitEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bidding_externalId_key" ON "Bidding"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedBidding_userId_biddingId_key" ON "SavedBidding"("userId", "biddingId");

-- CreateIndex
CREATE INDEX "Alert_userId_idx" ON "Alert"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationSource_code_key" ON "IntegrationSource"("code");

-- CreateIndex
CREATE INDEX "IntegrationRun_sourceId_status_idx" ON "IntegrationRun"("sourceId", "status");

-- CreateIndex
CREATE INDEX "IntegrationRun_createdAt_idx" ON "IntegrationRun"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationCursor_sourceId_endpoint_key" ON "IntegrationCursor"("sourceId", "endpoint");

-- CreateIndex
CREATE INDEX "IntegrationRawEvent_runId_idx" ON "IntegrationRawEvent"("runId");

-- CreateIndex
CREATE INDEX "IntegrationRawEvent_status_idx" ON "IntegrationRawEvent"("status");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationRawEvent_sourceId_externalId_key" ON "IntegrationRawEvent"("sourceId", "externalId");

-- CreateIndex
CREATE INDEX "IntegrationDeadLetter_sourceId_idx" ON "IntegrationDeadLetter"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "RateLimitEntry_key_key" ON "RateLimitEntry"("key");

-- CreateIndex
CREATE INDEX "RateLimitEntry_resetAt_idx" ON "RateLimitEntry"("resetAt");

-- AddForeignKey
ALTER TABLE "Bidding" ADD CONSTRAINT "Bidding_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "Portal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiddingItem" ADD CONSTRAINT "BiddingItem_biddingId_fkey" FOREIGN KEY ("biddingId") REFERENCES "Bidding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedBidding" ADD CONSTRAINT "SavedBidding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedBidding" ADD CONSTRAINT "SavedBidding_biddingId_fkey" FOREIGN KEY ("biddingId") REFERENCES "Bidding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationRun" ADD CONSTRAINT "IntegrationRun_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "IntegrationSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationCursor" ADD CONSTRAINT "IntegrationCursor_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "IntegrationSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationRawEvent" ADD CONSTRAINT "IntegrationRawEvent_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "IntegrationSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationDeadLetter" ADD CONSTRAINT "IntegrationDeadLetter_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "IntegrationSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

