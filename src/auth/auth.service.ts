import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  private get usersTable() {
    return process.env.USERS_TABLE || 'users';
  }

  async login(username: string, password: string) {
    const [rows] = (await this.db
      .getPool()
      .execute(`SELECT * FROM ${this.usersTable} WHERE username = ?`, [
        username,
      ])) as any[];

    if (rows.length === 0) {
      throw new BadRequestException('Invalid Credentials');
    }

    const user = rows[0];
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log(user, user.password);
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload = { userId: user.id, username: user.username };

    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'MISSING');
    console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET ? 'Set' : 'MISSING');

    const accessSecret = process.env.JWT_SECRET || 'dev-secret';
    const accessExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
    const refreshSecret = process.env.JWT_REFRESH_SECRET || accessSecret;
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

    const accessToken = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: accessExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn,
    });

    // Skip refreshToken DB update since the column doesn't exist in your schema
    // If you need refresh token persistence, add the column to your users table
    
    console.log('Login successful, returning tokens');
    const response = {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email ?? undefined,
      },
    };
    console.log('Response object:', JSON.stringify(response).substring(0, 100));
    return response;
  }

  async signup(username: string, password: string, email?: string) {
    // Validate inputs
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    // Check if username already exists (users.username is UNIQUE)
    const [existingRows] = (await this.db
      .getPool()
      .execute(`SELECT id FROM ${this.usersTable} WHERE username = ?`, [
        username,
      ])) as any[];

    if (existingRows.length > 0) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await this.db
      .getPool()
      .execute(
        email
          ? `INSERT INTO ${this.usersTable} (username, password, email) VALUES(?, ?, ?)`
          : `INSERT INTO ${this.usersTable} (username, password) VALUES(?, ?)`,
        email ? [username, hashedPassword, email] : [username, hashedPassword],
      );

    const insertId = (result as any).insertId as number;

    // Issue tokens so the client can be logged in immediately
    const payload = { userId: insertId, username };
    const accessSecret = process.env.JWT_SECRET || 'dev-secret';
    const accessExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
    const refreshSecret = process.env.JWT_REFRESH_SECRET || accessSecret;
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

    const accessToken = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: accessExpiresIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: insertId,
        username,
        email: email ?? undefined,
      },
    };
  }

  async getAll() {
    const [rows] = await this.db
      .getPool()
      .execute(`SELECT * FROM ${this.usersTable}`);
    const data = rows as any[];
    if (data.length === 0) {
      throw new BadRequestException('No Data found');
    }

    return data;
  }

  async getOne(id: number) {
    const [rows] = await this.db
      .getPool()
      .execute(`SELECT * FROM ${this.usersTable} WHERE id = ?`, [id]);
    const data = rows as any[];
    if (data.length === 0) {
      throw new BadRequestException('No Data found');
    }

    return data;
  }

  async delete(id: number) {
    const [rows] = await this.db
      .getPool()
      .execute(`DELETE FROM ${this.usersTable} WHERE id = ?`, [id]);

    const { affectedRows } = rows as any;

    if (affectedRows === 0) {
      throw new BadRequestException('User not found');
    }

    return { message: 'succesfully deleted user' };
  }

  async update(id: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await this.db
      .getPool()
      .execute(
        `UPDATE ${this.usersTable} SET username = ?, password = ? WHERE id = ? `,
        [username, hashedPassword, id],
      );

    const { affectedRows } = rows as any;

    if (affectedRows === 0) {
      throw new BadRequestException('User not found');
    }

    return {
      message: 'User Updated succesfully',
      data: { username, hashedPassword },
    };
  }
}
