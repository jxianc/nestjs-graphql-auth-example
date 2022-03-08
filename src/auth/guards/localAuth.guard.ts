import { AuthGuard } from "@nestjs/passport";

// local strategy for controllers (REST api)
export class LocalAuthGuard extends AuthGuard("local") {}
