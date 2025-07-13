-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_tagId_fkey";

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "tagId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
