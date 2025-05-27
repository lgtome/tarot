import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User as PrismaUser } from '@prisma/client'

@ObjectType()
export class User implements PrismaUser {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  email: string | null

  @Field(() => String, { nullable: true })
  name: string

  @Field(() => String, { nullable: true })
  googleId: string | null

  @Field(() => String, { nullable: true })
  appleId: string | null

  @Field(() => String, { nullable: true })
  apiKey: string | null

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
