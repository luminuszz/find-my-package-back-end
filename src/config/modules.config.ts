import { ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { formatterErrors } from '../shared/gql.exception.filter';
import { JwtModuleOptions } from '@nestjs/jwt';
import { SharedBullAsyncConfiguration } from '@nestjs/bull';

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

export const graphQLModuleConfig: GqlModuleAsyncOptions = {
  useFactory: async (configService: ConfigService<Environments>) => {
    const isDev = configService.get('NODE_ENV') === 'dev';

    return {
      playground: isDev,
      debug: isDev,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
      formatError: formatterErrors,
    };
  },

  inject: [ConfigService],
};

export const jwtConfigModule: JwtModuleOptions = {
  secret: 'dhsajdhkasjhdsahdgashgdsahdghsadgjasgdhkasgfaiksgbjalbjrjj',
  signOptions: {
    expiresIn: '3d',
  },
};

export const bullModuleConfig: SharedBullAsyncConfiguration = {
  useFactory: (configService: ConfigService<Environments>) => ({
    redis: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
    },
  }),

  inject: [ConfigService],
};
