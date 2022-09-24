export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
  post<T>(url: string): Promise<T>;

  /**
   * GetloanById
   * GetDepositById
   */
  getById<T>(url: string): Promise<T>;
}
