import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User as PrismaUser } from "@prisma/client";

@ObjectType()
export class User implements PrismaUser {
  @Field(() => ID)
  id: string;

  @Field()
  email: string | null;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  googleId: string | null;

  @Field({ nullable: true })
  appleId: string | null;

  @Field({ nullable: true })
  apiKey: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
