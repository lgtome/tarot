import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { EnvironmentVariables } from './enum/environment-variables.enum'

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get(key: EnvironmentVariables): string | undefined {
    return this.configService.get<string>(key)
  }
}
