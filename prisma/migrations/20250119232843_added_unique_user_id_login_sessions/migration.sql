/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `login_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "login_sessions_user_id_key" ON "login_sessions"("user_id");
