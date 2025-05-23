import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        ...createUserInput,
      },
    })
  }

  findByProviderId(providerId: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ googleId: providerId }, { appleId: providerId }],
      },
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
