export interface PackAgeResponseContract {
  code: string;
  departureData: string;
  status: string;
  name: string;
  eventDate: string;
  hour: string;
}

export abstract class DeliveryServiceProvider {
  abstract findPackage(identify: string): Promise<PackAgeResponseContract>;
}
