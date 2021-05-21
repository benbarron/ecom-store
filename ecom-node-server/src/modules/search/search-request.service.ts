import { HttpException, Inject, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class AppSearchRequestService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async get(path, params) {
    return await this._jsonRequest('GET', path, params);
  }

  async post(path, params) {
    return await this._jsonRequest('POST', path, params);
  }

  async put(path, params) {
    return await this._jsonRequest('PUT', path, params);
  }

  async patch(path, params) {
    return await this._jsonRequest('PATCH', path, params);
  }

  async delete(path, params) {
    return await this._jsonRequest('DELETE', path, params);
  }

  async _jsonRequest(method, path, params) {
    try {
      const res = await axios.request({
        method,
        url: `${this.baseUrl}${path}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        data: params,
      });
      return res.data;
    } catch (err) {
      console.log(err.response.data.errors);
      const status = err.response ? err.response.status : 501;
      throw new HttpException(err.message, status);
    }
  }
}