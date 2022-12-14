import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  //Obtiene
  async get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, config);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * GetloanById
   * Obtine por id la cuenta de prestamos o credito
   * GetDepositById
   * Obtine por id la cuenta de deposito
   */
  async getById<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, config);
      return data;
    } catch (error) {
      console.log(
        `Este error pertenece al getById, se esta lanzando desde axios.adapter ${error}`,
      );
      return null;
    }
  }

  //Crea Cliente
  async post<T>(
    url: string,
    dto?: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const { data } = await this.axios.post<T>(url, dto, config);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
