import { ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const configModule: ConfigModuleOptions = {
  isGlobal: true,
};

export const configMongooseModule: MongooseModuleAsyncOptions = {
  useFactory: (configService: ConfigService<Environments>) => {
    const url = configService.get<string>('MONGO_URL_CONNECT');

    return {
      uri: url,
    };
  },

  inject: [ConfigService],
};
