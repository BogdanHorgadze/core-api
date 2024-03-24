import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddYearTable1711149413321 implements MigrationInterface {
  name = 'AddYearTable1711149413321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "year" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "year" integer NOT NULL, "count" integer NOT NULL, CONSTRAINT "PK_506885a7430147dbff28fa689fd" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "year"`);
  }
}
