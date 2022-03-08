import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtSecret } from "../utils/constants";
import { User } from "../users/entity/user.entity";
import { UsersService } from "../users/users.service";
import { Payload } from "src/utils/types";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: User): { accessToken: string } {
    const payload: Payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string): Promise<User> {
    const decodedPayload: Payload = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = await this.userService.getUserByEmail(decodedPayload.email);

    if (!user) {
      throw new Error("unable get user from decoded token");
    }

    return user;
  }
}
