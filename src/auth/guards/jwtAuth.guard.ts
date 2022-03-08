import { AuthGuard } from "@nestjs/passport";

// jwt strategy for controllers (REST api)
export class JwtAuthGuard extends AuthGuard("jwt") {}
