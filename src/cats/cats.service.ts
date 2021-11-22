import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';
@Injectable()
export class CatsService {
  constructor(private readonly CatsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExist = await this.CatsRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('이미 존재하는 이메일 입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const cat = await this.catModel.create({
    //   email,
    //   name,
    //   password: hashedPassword,
    // });

    // return cat.readOnlyData;
  }
}
