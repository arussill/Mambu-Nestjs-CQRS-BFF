export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
  post<T>(url: string): Promise<T>;

  //GetloanById
  getloanById<T>(url: string): Promise<T>;
}
