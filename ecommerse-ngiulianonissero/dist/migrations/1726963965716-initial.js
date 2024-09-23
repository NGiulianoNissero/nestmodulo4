"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1726963965716 = void 0;
class Initial1726963965716 {
    constructor() {
        this.name = 'Initial1726963965716';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL, "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_cf4437dc89cc45584aba8c340cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "userId" uuid, "orderDetailsId" uuid, CONSTRAINT "REL_cb8486eaad7a292ff78b37d761" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "phone" bigint NOT NULL, "address" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "country" character varying(50), "city" character varying(50), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_orderdetails" ("productsId" uuid NOT NULL, "orderdetailsId" uuid NOT NULL, CONSTRAINT "PK_62fa9e6e94a65a4b3610280f626" PRIMARY KEY ("productsId", "orderdetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0d2d42918865033038aae4f48" ON "products_order_details_orderdetails" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d7d30a0c4fc0d417beecff5d71" ON "products_order_details_orderdetails" ("orderdetailsId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610" FOREIGN KEY ("orderDetailsId") REFERENCES "orderdetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orderdetails" ADD CONSTRAINT "FK_f0d2d42918865033038aae4f481" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orderdetails" ADD CONSTRAINT "FK_d7d30a0c4fc0d417beecff5d719" FOREIGN KEY ("orderdetailsId") REFERENCES "orderdetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products_order_details_orderdetails" DROP CONSTRAINT "FK_d7d30a0c4fc0d417beecff5d719"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orderdetails" DROP CONSTRAINT "FK_f0d2d42918865033038aae4f481"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d7d30a0c4fc0d417beecff5d71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0d2d42918865033038aae4f48"`);
        await queryRunner.query(`DROP TABLE "products_order_details_orderdetails"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderdetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
exports.Initial1726963965716 = Initial1726963965716;
//# sourceMappingURL=1726963965716-initial.js.map