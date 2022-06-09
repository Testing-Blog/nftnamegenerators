/*
  Warnings:

  - A unique constraint covering the columns `[price]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[assetsNumber]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Plan_price_key` ON `Plan`(`price`);

-- CreateIndex
CREATE UNIQUE INDEX `Plan_assetsNumber_key` ON `Plan`(`assetsNumber`);
