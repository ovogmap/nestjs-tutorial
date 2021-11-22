import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = this.catsRepository.findCatByEmail(email);

    console.log(cat);

    if (!cat) {
      throw new UnauthorizedException('이메일 과 비밀번호를 확인해주세요.');
    }

    // bcrypt.compare 암호화한 password를 비교할때 필수적으로 사용.
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      (
        await cat
      ).password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }

    const payload = { email, sub: cat };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
