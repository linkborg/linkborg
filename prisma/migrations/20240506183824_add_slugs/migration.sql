-- CreateTable
CREATE TABLE "Slug" (
    "id" TEXT NOT NULL,
    "slugType" TEXT NOT NULL DEFAULT 'subdomain',
    "data" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slug_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slug" ADD CONSTRAINT "Slug_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
