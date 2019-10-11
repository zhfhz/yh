import {
  RequestOptionsInit,
  RequestOptionsWithoutResponse,
} from 'umi-request';

export interface RespData<T> {
  ok: boolean;
  code: number;
  msg: string;
  data?: T;
}

export interface RequestMethod<R = false> {
  <T = any>(url: string, options: RequestOptionsWithoutResponse): Promise<RespData<T>>;
  <T = any>(url: string, options?: RequestOptionsInit): Promise<RespData<T>>;
  get: RequestMethod<R>;
  post: RequestMethod<R>;
  delete: RequestMethod<R>;
  put: RequestMethod<R>;
  patch: RequestMethod<R>;
  rpc: RequestMethod<R>;
  interceptors: {
    request: {
      use: (handler: RequestInterceptor) => void;
    };
    response: {
      use: (handler: ResponseInterceptor) => void;
    };
  };
}

declare const request: RequestMethod;

export default request;
