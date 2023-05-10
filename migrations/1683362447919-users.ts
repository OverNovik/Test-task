import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1683362447919 implements MigrationInterface {
    name = 'Users1683362447919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "image" bytea
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "image" character varying
        `);
    }

}
