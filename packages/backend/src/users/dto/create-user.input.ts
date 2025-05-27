import { Field, InputType } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { IsEmail, IsOptional } from 'class-validator'

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  googleId?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  appleId?: string
}
