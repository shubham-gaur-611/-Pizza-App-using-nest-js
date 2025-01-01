import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async register(email: string, password: string): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.create({ email, password: hashedPassword });
    return { message: 'Registration successful' };
  }

  async validateUser(email: string, password: string): Promise<{ message: string, user?: { email: string } }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { 
        message: 'Login successful',
        user: { email: user.email }
      };
    }
    return { message: 'Invalid credentials' };
  }
}
