import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "../../posts/entity/post.entity";

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Post, { nullable: true })
  posts?: Post[];
}
