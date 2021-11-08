/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.13.2.0 (NJsonSchema v10.5.2.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { ClientBase } from './ClientBase';
import ClientConfiguration from './ClientConfiguration';

export interface IApiClient {
  /**
   * @return Success
   */
  cablewayForecastAll(): Promise<CablewayForecast[]>;
  /**
   * @param body (optional)
   * @return Success
   */
  cablewayForecastPOST(body: CablewayForecast | undefined): Promise<void>;
  /**
   * @return Success
   */
  cablewayForecastGET(id: string): Promise<CablewayForecast>;
  /**
   * @param body (optional)
   * @return Success
   */
  cablewayForecastPUT(id: string, body: CablewayForecast | undefined): Promise<void>;
  /**
   * @return Success
   */
  cablewayForecastDELETE(id: string): Promise<void>;
  /**
   * @return Success
   */
  snowmakingForecastAll(): Promise<SnowmakingForecast[]>;
  /**
   * @param body (optional)
   * @return Success
   */
  snowmakingForecastPOST(body: SnowmakingForecast | undefined): Promise<void>;
  /**
   * @return Success
   */
  snowmakingForecastGET(id: string): Promise<SnowmakingForecast>;
  /**
   * @param body (optional)
   * @return Success
   */
  snowmakingForecastPUT(id: string, body: SnowmakingForecast | undefined): Promise<void>;
  /**
   * @return Success
   */
  snowmakingForecastDELETE(id: string): Promise<void>;
}

export class ApiClient extends ClientBase implements IApiClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    configuration: ClientConfiguration,
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super(configuration);
    this.http = http ? http : <any>window;
    this.baseUrl = this.getBaseUrl('', baseUrl);
  }

  /**
   * @return Success
   */
  cablewayForecastAll(): Promise<CablewayForecast[]> {
    let url_ = this.baseUrl + '/api/CablewayForecast';
    url_ = url_.replace(/[?&]$/, '');

    let options_ = <RequestInit>{
      method: 'GET',
      headers: {
        Accept: 'text/plain',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processCablewayForecastAll(_response);
      });
  }

  protected processCablewayForecastAll(response: Response): Promise<CablewayForecast[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200) result200!.push(CablewayForecast.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<CablewayForecast[]>(<any>null);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  cablewayForecastPOST(body: CablewayForecast | undefined): Promise<void> {
    let url_ = this.baseUrl + '/api/CablewayForecast';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_ = <RequestInit>{
      body: content_,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processCablewayForecastPOST(_response);
      });
  }

  protected processCablewayForecastPOST(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<void>(<any>null);
  }

  /**
   * @return Success
   */
  cablewayForecastGET(id: string): Promise<CablewayForecast> {
    let url_ = this.baseUrl + '/api/CablewayForecast/{id}';
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_ = <RequestInit>{
      method: 'GET',
      headers: {
        Accept: 'text/plain',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processCablewayForecastGET(_response);
      });
  }

  protected processCablewayForecastGET(response: Response): Promise<CablewayForecast> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CablewayForecast.fromJS(resultData200);
        return result200;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ProblemDetails.fromJS(resultData404);
        return throwException('Not Found', status, _responseText, _headers, result404);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<CablewayForecast>(<any>null);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  cablewayForecastPUT(id: string, body: CablewayForecast | undefined): Promise<void> {
    let url_ = this.baseUrl + '/api/CablewayForecast/{id}';
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_ = <RequestInit>{
      body: content_,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processCablewayForecastPUT(_response);
      });
  }

  protected processCablewayForecastPUT(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ProblemDetails.fromJS(resultData404);
        return throwException('Not Found', status, _responseText, _headers, result404);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<void>(<any>null);
  }

  /**
   * @return Success
   */
  cablewayForecastDELETE(id: string): Promise<void> {
    let url_ = this.baseUrl + '/api/CablewayForecast/{id}';
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_ = <RequestInit>{
      method: 'DELETE',
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processCablewayForecastDELETE(_response);
      });
  }

  protected processCablewayForecastDELETE(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ProblemDetails.fromJS(resultData404);
        return throwException('Not Found', status, _responseText, _headers, result404);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<void>(<any>null);
  }

  /**
   * @return Success
   */
  snowmakingForecastAll(): Promise<SnowmakingForecast[]> {
    let url_ = this.baseUrl + '/api/SnowmakingForecast';
    url_ = url_.replace(/[?&]$/, '');

    let options_ = <RequestInit>{
      method: 'GET',
      headers: {
        Accept: 'text/plain',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processSnowmakingForecastAll(_response);
      });
  }

  protected processSnowmakingForecastAll(response: Response): Promise<SnowmakingForecast[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200) result200!.push(SnowmakingForecast.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<SnowmakingForecast[]>(<any>null);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  snowmakingForecastPOST(body: SnowmakingForecast | undefined): Promise<void> {
    let url_ = this.baseUrl + '/api/SnowmakingForecast';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_ = <RequestInit>{
      body: content_,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processSnowmakingForecastPOST(_response);
      });
  }

  protected processSnowmakingForecastPOST(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<void>(<any>null);
  }

  /**
   * @return Success
   */
  snowmakingForecastGET(id: string): Promise<SnowmakingForecast> {
    let url_ = this.baseUrl + '/api/SnowmakingForecast/{id}';
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_ = <RequestInit>{
      method: 'GET',
      headers: {
        Accept: 'text/plain',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processSnowmakingForecastGET(_response);
      });
  }

  protected processSnowmakingForecastGET(response: Response): Promise<SnowmakingForecast> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = SnowmakingForecast.fromJS(resultData200);
        return result200;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ProblemDetails.fromJS(resultData404);
        return throwException('Not Found', status, _responseText, _headers, result404);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<SnowmakingForecast>(<any>null);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  snowmakingForecastPUT(id: string, body: SnowmakingForecast | undefined): Promise<void> {
    let url_ = this.baseUrl + '/api/SnowmakingForecast/{id}';
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_ = <RequestInit>{
      body: content_,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processSnowmakingForecastPUT(_response);
      });
  }

  protected processSnowmakingForecastPUT(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ProblemDetails.fromJS(resultData404);
        return throwException('Not Found', status, _responseText, _headers, result404);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<void>(<any>null);
  }

  /**
   * @return Success
   */
  snowmakingForecastDELETE(id: string): Promise<void> {
    let url_ = this.baseUrl + '/api/SnowmakingForecast/{id}';
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_ = <RequestInit>{
      method: 'DELETE',
      headers: {},
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processSnowmakingForecastDELETE(_response);
      });
  }

  protected processSnowmakingForecastDELETE(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        let resultData404 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result404 = ProblemDetails.fromJS(resultData404);
        return throwException('Not Found', status, _responseText, _headers, result404);
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        let resultData400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result400 = ProblemDetails.fromJS(resultData400);
        return throwException('Bad Request', status, _responseText, _headers, result400);
      });
    } else if (status === 500) {
      return response.text().then((_responseText) => {
        return throwException('Server Error', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Promise.resolve<void>(<any>null);
  }
}

export class CablewayForecast implements ICablewayForecast {
  id!: string;
  userId!: string;
  scenario!: string;
  powerInKW!: number;
  fromDate!: string;
  toDate!: string;
  fromTime!: string;
  toTime!: string;

  constructor(data?: ICablewayForecast) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.userId = _data['userId'];
      this.scenario = _data['scenario'];
      this.powerInKW = _data['powerInKW'];
      this.fromDate = _data['fromDate'];
      this.toDate = _data['toDate'];
      this.fromTime = _data['fromTime'];
      this.toTime = _data['toTime'];
    }
  }

  static fromJS(data: any): CablewayForecast {
    data = typeof data === 'object' ? data : {};
    let result = new CablewayForecast();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['userId'] = this.userId;
    data['scenario'] = this.scenario;
    data['powerInKW'] = this.powerInKW;
    data['fromDate'] = this.fromDate;
    data['toDate'] = this.toDate;
    data['fromTime'] = this.fromTime;
    data['toTime'] = this.toTime;
    return data;
  }
}

export interface ICablewayForecast {
  id: string;
  userId: string;
  scenario: string;
  powerInKW: number;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
}

export class ProblemDetails implements IProblemDetails {
  type?: string | undefined;
  title?: string | undefined;
  status?: number | undefined;
  detail?: string | undefined;
  instance?: string | undefined;

  constructor(data?: IProblemDetails) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.type = _data['type'];
      this.title = _data['title'];
      this.status = _data['status'];
      this.detail = _data['detail'];
      this.instance = _data['instance'];
    }
  }

  static fromJS(data: any): ProblemDetails {
    data = typeof data === 'object' ? data : {};
    let result = new ProblemDetails();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['type'] = this.type;
    data['title'] = this.title;
    data['status'] = this.status;
    data['detail'] = this.detail;
    data['instance'] = this.instance;
    return data;
  }
}

export interface IProblemDetails {
  type?: string | undefined;
  title?: string | undefined;
  status?: number | undefined;
  detail?: string | undefined;
  instance?: string | undefined;
}

export class SnowmakingForecast implements ISnowmakingForecast {
  id!: string;
  userId!: string;
  scenario!: string;
  powerInKW!: number;
  from!: string;
  to!: string;

  constructor(data?: ISnowmakingForecast) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.userId = _data['userId'];
      this.scenario = _data['scenario'];
      this.powerInKW = _data['powerInKW'];
      this.from = _data['from'];
      this.to = _data['to'];
    }
  }

  static fromJS(data: any): SnowmakingForecast {
    data = typeof data === 'object' ? data : {};
    let result = new SnowmakingForecast();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['userId'] = this.userId;
    data['scenario'] = this.scenario;
    data['powerInKW'] = this.powerInKW;
    data['from'] = this.from;
    data['to'] = this.to;
    return data;
  }
}

export interface ISnowmakingForecast {
  id: string;
  userId: string;
  scenario: string;
  powerInKW: number;
  from: string;
  to: string;
}

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any }, result: any) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  if (result !== null && result !== undefined) throw result;
  else throw new ApiException(message, status, response, headers, null);
}
