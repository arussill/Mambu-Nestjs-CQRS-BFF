import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  //Obtiene
  async get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    // console.log("adapter:")
    // console.log(config)
    try {
      const { data } = await this.axios.get<T>(url, config);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  //Crea
  async post<T>(
    url: string,
    dto?: any,
    config?: AxiosRequestConfig<any>,
    ): Promise<T> {
      console.log("adapter url:")
      console.log(url)
      console.log("adapter dto:")
      console.log(dto)
      console.log("adapter config:")
      console.log(config)
      try {
        const { data } = await this.axios.post<T>(url, dto, config);
        return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
