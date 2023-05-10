import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1683206590111 implements MigrationInterface {
    name = 'Users1683206590111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "image" character varying NOT NULL,
                "pdf" bytea,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
