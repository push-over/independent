# Migration `20201217111044`

This migration has been generated by Praise at 12/17/2020, 7:10:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL DEFAULT E'0',
    "name" TEXT NOT NULL,
    "intro" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "intro" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "intro" TEXT,
    "claim" TEXT,
    "outcome" TEXT,
    "student" TEXT,
    "period" DECIMAL(65,30) NOT NULL,
    "score" DECIMAL(65,30) NOT NULL DEFAULT 5.0,
    "scoreNum" INTEGER NOT NULL DEFAULT 0,
    "browseNum" INTEGER NOT NULL DEFAULT 0,
    "memberNum" INTEGER NOT NULL DEFAULT 0,
    "top" BOOLEAN NOT NULL DEFAULT false,
    "status" "CourseStatus" NOT NULL,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subjectId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Subject.name_unique" ON "Subject"("name")

CREATE UNIQUE INDEX "Teacher.name_unique" ON "Teacher"("name")

CREATE UNIQUE INDEX "Course.title_unique" ON "Course"("title")

ALTER TABLE "Course" ADD FOREIGN KEY("subjectId")REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Course" ADD FOREIGN KEY("teacherId")REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201217111044
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,76 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+generator dbml {
+  provider = "prisma-dbml-generator"
+}
+
+model Subject {
+  id  String  @id @default(cuid())
+  parentId  String  @default("0")
+  name  String  @unique
+  intro String?
+  sort  Int @default(0)
+  courses Course[]
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+}
+
+model Teacher {
+  id  String  @id @default(cuid())
+  name  String  @unique
+  avatar  String
+  intro String?
+  sort  Int @default(0)
+  isDelete  Boolean @default(false)
+  deletedAt DateTime?
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+}
+
+model Course {
+  id  String  @id @default(cuid())
+  category  Subject
+  author  Teacher
+  title String  @unique
+  subTitle  String
+  cover String
+  level CourseLevel
+  intro String?
+  claim String?
+  outcome String?
+  student String?
+  period  Float
+  score  Float @default(5.0)
+  scoreNum  Int @default(0)
+  browseNum  Int @default(0)
+  memberNum  Int @default(0)
+  top Boolean @default(false)
+  status  CourseStatus
+  sort  Int @default(0)
+  isDelete  Boolean @default(false)
+  deletedAt DateTime?
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+}
+
+enum CourseLevel {
+  ALL
+  PRIMARY
+  INTERMEDIATE
+  EXPERT
+}
+
+enum CourseStatus {
+  DRAFT
+  NORMAL
+}
```

