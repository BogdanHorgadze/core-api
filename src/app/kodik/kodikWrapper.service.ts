import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@utils/envValidation';

@Injectable()
export class KodikWrapperService {
  private token: string;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {
    this.token = this.configService.get('KODIK_API_KEY');
    if (!this.token) {
      throw new Error('KODIK_API_KEY key is missing');
    }
  }

  getPublicUrl(url: string, extraParams?: Record<string, string>) {
    const base = new URL(url, 'https://kodikapi.com');
    base.searchParams.append('token', this.token);

    if (extraParams) {
      for (const [key, value] of Object.entries(extraParams)) {
        base.searchParams.append(key, value);
      }
    }

    return base.href;
  }
}
