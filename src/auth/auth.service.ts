import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: string) {
    const user = await this.usersService.findUser(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const payload = { username: user.firstName, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
}
}
