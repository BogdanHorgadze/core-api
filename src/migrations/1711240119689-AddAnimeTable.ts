import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAnimeTable1711240119689 implements MigrationInterface {
  name = 'AddAnimeTable1711240119689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "anime" ("id" character varying NOT NULL, "shikimoriId" integer, "type" character varying NOT NULL, "title" character varying NOT NULL, "translation" jsonb NOT NULL, "details" jsonb NOT NULL, "kodikCreatedAt" TIMESTAMP NOT NULL, "kodikUpdatedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e567f73ed63fd388a7734cbdd3" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "anime"`);
  }
}
