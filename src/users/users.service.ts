import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateUserInput } from "./dto/createUser.input";
import { User } from "./entity/user.entity";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { username, email, password, confirmPassword } = createUserInput;

    // todo: verify input
    const data: Prisma.UserCreateInput = {
      username,
      email,
      password,
    };

    const newUser = await this.prisma.user.create({
      data,
    });

    return newUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    return user;
  }
}
