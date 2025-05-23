import { Field, InputType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { IsEmail, IsOptional } from "class-validator";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  googleId?: string;

  @Field({ nullable: true })
  @IsOptional()
  appleId?: string;
}
