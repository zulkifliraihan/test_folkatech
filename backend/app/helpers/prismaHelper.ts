import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PrismaHelper {
  async checkUniqueColumns(table: string | undefined): Promise<boolean> {
    try {
      const columns = await prisma.$queryRaw<ColumnResult[]>`
        SELECT COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, COLUMN_KEY, IS_NULLABLE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = 'test_suryadigitalteknologi'
        AND TABLE_NAME = ${Prisma.sql`${table}`}
      `;

      const hasUniqueColumn = columns.some(
        (column) => column.COLUMN_KEY === "UNI"
      );
      return hasUniqueColumn;
    } catch (error) {
      console.error(`Error checking unique columns for table '${table}':`, error);
      throw error;
    }
  }
}

export default new PrismaHelper();

interface ColumnResult {
  COLUMN_NAME: string;
  DATA_TYPE: string;
  COLUMN_TYPE: string;
  COLUMN_KEY: string;
  IS_NULLABLE: string;
}
