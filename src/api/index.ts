import {
  CablewayForecast as CablewayForecastDto,
  ICablewayForecast as ICablewayForecastDto,
  ISnowmakingForecast as ISnowmakingForecastDto,
  ApiClient as NSwagClient,
  SnowmakingForecast as SnowmakingForecastDto,
} from './ApiClient';

import ClientConfiguration from './ClientConfiguration';
import ICablewayForecast from 'models/ICablewayForecast';
import ISnowmakingForecast from 'models/ISnowmakingForecast';
import { NIL as NIL_UUID } from 'uuid';
import moment from 'moment';

export interface IApiClient {
  getCablewayForecastsAsync(): Promise<ICablewayForecast[]>;

  createCablewayForecast(userId: string, forecast: ICablewayForecast): Promise<void>;

  getCablewayForecast(id: string): Promise<ICablewayForecast>;

  updateCablewayForecast(userId: string, forecast: ICablewayForecast): Promise<void>;

  deleteCablewayForecast(id: string): Promise<void>;

  getSnowmakingForecastsAsync(): Promise<ISnowmakingForecast[]>;

  createSnowmakingForecast(userId: string, forecast: ISnowmakingForecast): Promise<void>;

  getSnowmakingForecast(id: string): Promise<ISnowmakingForecast>;

  updateSnowmakingForecast(userId: string, forecast: ISnowmakingForecast): Promise<void>;

  deleteSnowmakingForecast(id: string): Promise<void>;
}

export class ApiClient implements IApiClient {
  private readonly client: NSwagClient;

  constructor(configuration: ClientConfiguration, baseUrl: string) {
    this.client = new NSwagClient(configuration, baseUrl);
  }

  private toMoment(dto: string): string {
    return moment(dto, 'HH:mm:ss').format('HH:mm');
  }

  private toTimeSpanDto(model: string): string {
    return moment(model, 'HH:mm').format('HH:mm:ss');
  }

  private toCablewayForecast(dto: ICablewayForecastDto): ICablewayForecast {
    return {
      ...dto,
      power: Number(dto.powerInKW),
      fromDate: moment(dto.fromDate).format('DD.MM.YYYY'),
      toDate: moment(dto.toDate).format('DD.MM.YYYY'),
      fromTime: this.toMoment(dto.fromTime),
      toTime: this.toMoment(dto.toTime),
    };
  }

  private toCablewayForecastDto(userId: string, model: ICablewayForecast): CablewayForecastDto {
    return new CablewayForecastDto({
      ...model,
      id: model.id ?? NIL_UUID,
      powerInKW: Number(model.power),
      userId: userId,
      fromDate: moment(model.fromDate, 'DD.MM.YYYY').toDate(),
      toDate: moment(model.toDate, 'DD.MM.YYYY').toDate(),
      fromTime: this.toTimeSpanDto(model.fromTime),
      toTime: this.toTimeSpanDto(model.toTime),
    });
  }

  private toSnowmakingForecast(dto: ISnowmakingForecastDto): ISnowmakingForecast {
    return {
      ...dto,
      power: Number(dto.powerInKW),
      from: moment(dto.from).format('DD.MM.YYYY HH:mm'),
      to: moment(dto.to).format('DD.MM.YYYY HH:mm'),
    };
  }

  private toSnowmakingForecastDto(userId: string, model: ISnowmakingForecast): SnowmakingForecastDto {
    return new SnowmakingForecastDto({
      ...model,
      id: model.id ?? NIL_UUID,
      powerInKW: Number(model.power),
      userId: userId,
      from: moment(model.from, 'DD.MM.YYYY HH:mm').toDate(),
      to: moment(model.to, 'DD.MM.YYYY HH:mm').toDate(),
    });
  }

  async getCablewayForecastsAsync(): Promise<ICablewayForecast[]> {
    var dtos = await this.client.cablewayForecastAll();

    var models: ICablewayForecast[] = [];

    dtos.forEach((r) => {
      models.push(this.toCablewayForecast(r));
    });

    return models;
  }

  async createCablewayForecast(userId: string, forecast: ICablewayForecast): Promise<void> {
    var dto = this.toCablewayForecastDto(userId, forecast);

    await this.client.cablewayForecastPOST(dto);
  }

  async getCablewayForecast(id: string): Promise<ICablewayForecast> {
    var dto = await this.client.cablewayForecastGET(id);

    var model = this.toCablewayForecast(dto);

    return model;
  }

  async updateCablewayForecast(userId: string, forecast: ICablewayForecast): Promise<void> {
    var dto = this.toCablewayForecastDto(userId, forecast);

    await this.client.cablewayForecastPUT(dto.id, dto);
  }

  async deleteCablewayForecast(id: string): Promise<void> {
    await this.client.cablewayForecastDELETE(id);
  }

  async getSnowmakingForecastsAsync(): Promise<ISnowmakingForecast[]> {
    var dtos = await this.client.snowmakingForecastAll();

    var models: ISnowmakingForecast[] = [];

    dtos.forEach((r) => {
      models.push(this.toSnowmakingForecast(r));
    });

    return models;
  }

  async createSnowmakingForecast(userId: string, forecast: ISnowmakingForecast): Promise<void> {
    var dto = this.toSnowmakingForecastDto(userId, forecast);

    await this.client.snowmakingForecastPOST(dto);
  }

  async getSnowmakingForecast(id: string): Promise<ISnowmakingForecast> {
    var dto = await this.client.snowmakingForecastGET(id);

    var model = this.toSnowmakingForecast(dto);

    return model;
  }

  async updateSnowmakingForecast(userId: string, forecast: ISnowmakingForecast): Promise<void> {
    var dto = this.toSnowmakingForecastDto(userId, forecast);

    await this.client.snowmakingForecastPUT(dto.id, dto);
  }

  async deleteSnowmakingForecast(id: string): Promise<void> {
    await this.client.snowmakingForecastDELETE(id);
  }
}
