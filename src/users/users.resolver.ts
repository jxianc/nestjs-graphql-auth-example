import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorators/currentUser.decorator";
import { GqlAuthGuard } from "../auth/guards/gqlAuth.guard";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  hello(@CurrentUser() user: User) {
    console.log("user from param decorator: ", user);
    return "hello world";
  }

  @Query(() => User)
  getUserByEmail(@Args("email") email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
