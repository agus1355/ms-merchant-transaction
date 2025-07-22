import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesWithQueries1681000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE payment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        method VARCHAR(50) NOT NULL,
        card_number VARCHAR(4) NOT NULL,
        card_holder_name VARCHAR(255) NOT NULL,
        card_expiration_date VARCHAR(5) NOT NULL,
        card_cvv VARCHAR(4) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE transaction (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amount DECIMAL(16,8) NOT NULL,
        description VARCHAR(255) NOT NULL,
        date DATETIME NOT NULL,
        merchant_id INT NOT NULL,
        payment_id INT NOT NULL,
        CONSTRAINT fk_transaction_payment FOREIGN KEY (payment_id) REFERENCES payment(id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE receivable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        status VARCHAR(50) NOT NULL,
        date DATETIME NOT NULL,
        fee_percentage DECIMAL(16,8) NOT NULL,
        fee_amount DECIMAL(16,8) NOT NULL,
        amount DECIMAL(16,8) NOT NULL,
        transaction_id INT NOT NULL,
        CONSTRAINT fk_receivable_transaction FOREIGN KEY (transaction_id) REFERENCES transaction(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS receivable`);
    await queryRunner.query(`DROP TABLE IF EXISTS transaction`);
    await queryRunner.query(`DROP TABLE IF EXISTS payment`);
  }
}
