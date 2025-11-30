import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PositionsService {
  constructor(private db: DatabaseService) {}
  private get table() {
    return process.env.POSITIONS_TABLE || 'positions';
  }
  async create(position_code: string, position_name: string, userId: number) {
    // Table uses snake_case columns: position_code, position_name
    await this.db
      .getPool()
      .execute(
        `INSERT INTO ${this.table} (position_code, position_name) VALUES (?, ?)`,
        [position_code, position_name],
      );

    return {
      message: 'position created',
      data: { position_code, position_name },
    };
  }

  async findAll() {
  const [rows] = await this.db.getPool().execute(`SELECT * FROM ${this.table}`);

    const data = rows as any[];

    return data;
  }

  async findOne(id: number) {
    const [row] = await this.db
      .getPool()
      .execute(`SELECT * FROM ${this.table} WHERE position_id = ?`, [id]);

    const task = (row as any[])[0];

    return task;
  }

  async update(
    id: number,
    position_code: string,
    position_name: string,
    userId: number,
  ) {
    // Table uses snake_case columns and position_id as primary key
    const [result] = await this.db
      .getPool()
      .execute(
        `UPDATE ${this.table} SET position_code = ?, position_name = ? WHERE position_id = ?`,
        [position_code, position_name, id],
      );

    const affectedRows = (result as any).affectedRows;

    return {
      message: 'Position updated successfully',
      data: {
        position_code,
        position_name,
      },
    };
  }

  async remove(id: number) {
    const query = await this.db
      .getPool()
      .execute(`DELETE FROM ${this.table} WHERE position_id = ?`, [id]);

    const { affectedRows } = query as any;

    return { message: 'Position Deleted', data: affectedRows };
  }
}
