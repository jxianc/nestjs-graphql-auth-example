import { Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./dtos/auth.response";
import { GqlAuthGuard } from "./guards/gqlAuth.guard";
import { LoginUserInput } from "./dtos/loginUser.input";
import { LocalGqlAuthGuard } from "./guards/localGqlAuth.guard";
import { User } from "../users/entity/user.entity";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGqlAuthGuard)
  @Mutation(() => AuthResponse)
  login(
    @Context() ctx: any,
    @Args("loginUserInput") loginUserInput: LoginUserInput,
  ): AuthResponse {
    return this.authService.login(ctx.user as User);
  }
}
