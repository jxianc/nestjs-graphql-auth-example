import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "../users/entity/user.entity";
import { AuthService } from "./auth.service";
import { GoogleAuthGuard } from "./guards/googleAuth.guard";
import { LocalAuthGuard } from "./guards/localAuth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // use guard will run the local auth strategy
  // inside validate method, it will attach the user in the request
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: Request): { accessToken: string } {
    return this.authService.login(req.user as User);
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google")
  googleLogin(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    res.status(200).send({ msg: "logged in" });
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google/redirect")
  googleRedirect(@Req() req: Request, @Res() res: Response) {
    console.log("req body from redirect route: ", req.user);
    res.status(200).send(req.user);
  }
}
