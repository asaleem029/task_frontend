import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from 'axios';

import axios from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

declare module 'axios' {
  type IAxiosResponse<T = any> = Promise<T>;
}

interface ErrorResponse {
  status: number | undefined;
  title: string | undefined;
}

interface ErrorData {
  status: number | undefined;
  message: string;
}

export abstract class HttpClient {
  private _isOpen = false;

  private _cbTimeout = 3000;

  protected readonly instance: AxiosInstance;

  private externalId: string;

  public constructor(
    baseURL: string,
    withCredentials: boolean,
    externalId: string,
  ) {
    withCredentials = false;
    this.externalId = externalId;
    this.instance = axios.create({
      withCredentials,
      timeout: 300000,
      baseURL,
    });
    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
    this._initializeRequestIdInterceptor();
    this._interceptSuccessResponse = this._interceptSuccessResponse.bind(this);
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._interceptSuccessResponse.bind(this),
      this._interceptErrorResponse.bind(this),
    );
  };

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._interceptRequest.bind(this),
    );
  };

  private _initializeRequestIdInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      if (config.headers && !config.headers['req-id']) {
        if (this.externalId) {
          config.headers['User-External-Id'] = this.externalId;
        }
      }
      return config;
    });
  };

  private _interceptRequest(config: any) {

    const cancelToken = new axios.CancelToken((cancel) =>
      cancel('Circuit breaker is open'),
    );
    return {
      ...config,
      ...(this._isOpen ? { cancelToken } : {}),
    };
  }

  private _interceptSuccessResponse = (data: AxiosResponse) => data;

  private _interceptErrorResponse(error: AxiosError) {
    const errorCode =
      error?.code || error?.response?.status || '';
    const shouldCircuitBreakerBeOpen = [
      'ECONNREFUSED',
      StatusCodes.TOO_MANY_REQUESTS,
      StatusCodes.REQUEST_TIMEOUT,
      StatusCodes.GATEWAY_TIMEOUT,
    ].includes(errorCode);

    if (shouldCircuitBreakerBeOpen && !this._isOpen) {
      this._openCircuitBreaker();
    }

    const errorResponse: ErrorResponse = {
      status: error?.response?.status,
      title: (error?.response?.data as ErrorData)?.message,
    };
    if (errorResponse.status === 401 && errorResponse.title === "Unauthorized") {
      localStorage.clear();
      const message = `${errorResponse.status} / ${errorResponse.title}`;
      toast.error(message);
    } else if (error?.code === "ERR_NETWORK" && error?.message === 'Network Error') {
      console.log('Network Error:', { error });
    } else {
      const message = `${errorResponse.title}`;
      toast.error(message);
    }

    return Promise.reject(error);
  }

  private _openCircuitBreaker() {
    this._isOpen = true;

    setTimeout(() => {
      this._isOpen = false;
    }, this._cbTimeout);
  }
}