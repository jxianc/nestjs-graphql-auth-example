import { Resolver } from "@nestjs/graphql";
import { PostsService } from "./posts.service";

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
}
