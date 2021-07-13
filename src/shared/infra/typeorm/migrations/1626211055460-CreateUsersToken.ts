import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersToken1626211055460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usersTokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'refreshToken',
            type: 'varchar'
          },
          {
            name: 'userId',
            type: 'uuid'
          },
          {
            name: 'expiresDate',
            type: 'timestamp'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKUserToken',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usersTokens')
  }
}
