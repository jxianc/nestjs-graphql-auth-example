import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../users/entity/user.entity";
import { UsersService } from "src/users/users.service";
import { jwtSecret } from "src/utils/constants";
import { Payload } from "src/utils/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(validationPayload: Payload): Promise<User> {
    return this.usersService.getUserByEmail(validationPayload.email);
  }
}
