import { AuthGuard } from "@nestjs/passport";

// google oauth strategy
export class GoogleAuthGuard extends AuthGuard("google") {}
