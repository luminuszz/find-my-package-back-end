import axios, { AxiosInstance } from 'axios';

import { Injectable } from '@nestjs/common';
import {
  DeliveryServiceProvider,
  PackAgeResponseContract,
} from '../core/delevery-service.provider';

type PaylaodRequest = {
  type: string;
  code: string;
};

type PackageResponse = {
  objeto: {
    evento: {
      descricao: string;
      dataPostagem: string;
      data: string;
      hora: string;
    }[];
  }[];
};

@Injectable()
export class CorreioService implements DeliveryServiceProvider {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://correios.contrateumdev.com.br/api',
    });
  }

  async findPackage(identify: string): Promise<PackAgeResponseContract> {
    try {
      const response = await this.client.post<PaylaodRequest>('/rastreio', {
        code: identify,
        type: 'LS',
      });

      const data = response.data as unknown as PackageResponse;

      const payload = data.objeto[0].evento[0];

      return {
        code: identify,
        departureData: payload.dataPostagem,
        status: payload.descricao,
        name: identify,
        eventDate: payload.data,
        hour: payload.hora,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
