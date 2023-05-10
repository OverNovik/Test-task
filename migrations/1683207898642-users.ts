import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1683207898642 implements MigrationInterface {
    name = 'Users1683207898642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "image" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "image"
            SET NOT NULL
        `);
    }

}
