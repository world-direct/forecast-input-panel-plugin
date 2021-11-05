import ClientConfiguration from './ClientConfiguration';

export class ClientBase {
  private configuration: ClientConfiguration;

  constructor(configuration: ClientConfiguration) {
    this.configuration = configuration;
  }

  public async transformOptions(options: RequestInit) {
    const headers = new Headers(options.headers);
    headers.set('Authorization', 'Basic ' + btoa(`${this.configuration.username}:${this.configuration.password}`));
    options.headers = headers;
    return Promise.resolve(options);
  }

  protected getBaseUrl(fallback: string, baseUrl?: string) {
    return baseUrl ?? fallback;
  }
}
