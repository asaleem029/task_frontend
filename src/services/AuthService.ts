import { BACKEND_SERVICES } from '../env/env';
import { HttpClient } from './httpClient/httpClient';
import { readFromLocalStorage } from '../helpers/ReadAndWriteLocalStorage';

const AuthHost: any = BACKEND_SERVICES.authService;
class AuthAPIs extends HttpClient {
  private static _classInstance?: AuthAPIs;

  public constructor(base: string) {
    super(base, false, externalId);
  }

  public static getInstance(base: string, externalId: string) {
    if (!this._classInstance) {
      this._classInstance = new AuthAPIs(base);
    }
    return this._classInstance;
  }

  public post = async (
    url: string,
    data: any = {},
    headers: any = {},
  ) => {
    try {
      const response = await this.instance.post(url, data, {
        headers,
      });
      return response;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  };

  public get = async (
    url: string,
    data: any = {},
    headers: any = {},
  ) => {
    try {
      return await this.instance.get(url, {
        params: data,
        headers,
      });
    } catch (error: any) {
      console.log(error);
      return error;
    }
  };

  public delete = async (
    url: string,
    headers: any = {},
  ) => {
    try {
      return await this.instance.delete(url, {
        headers,
      });
    } catch (error: any) {
      console.log(JSON.stringify(error));
      return error;
    }
  };

  public put = async (
    url: string,
    data: any = {},
    headers: any = {},
  ) => {
    try {
      return await this.instance.put(url, data, {
        headers,
      });
    } catch (error: any) {
      console.log(JSON.stringify(error));
      return error;
    }
  };
}

const externalId = readFromLocalStorage("userUUID");
const authApis = AuthAPIs.getInstance(
  AuthHost,
  externalId
);


export { authApis as AuthApis };
