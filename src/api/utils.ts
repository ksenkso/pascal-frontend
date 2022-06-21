import type { AxiosResponse } from 'axios';
import { transport } from './transport';

export class CrudEndpoint<Document, CreateDto = any, UpdateDto = any> {
  protected transport = transport;

  constructor(protected baseUrl: string) {
  }

  protected extractData <T>(response: AxiosResponse<T>) {
    return response.data
  };

  getById(id: string | number) {
    return this.transport
      .get<Document>(`${this.baseUrl}/${id}`)
      .then(({ data }) => data)
  }

  getAll() {
    return this.transport
      .get<Document>(this.baseUrl)
      .then(this.extractData);
  }

  create(createDto: CreateDto) {
    return this.transport
      .post<Document>(this.baseUrl, createDto)
      .then(this.extractData)
  }

  update(id: string | number, updateDto: UpdateDto) {
    return this.transport
      .patch<Document>(`${this.baseUrl}/${id}`, updateDto)
      .then(this.extractData)
  }

  delete(id: string | number) {
    return this.transport
      .delete(`${this.baseUrl}/${id}`)
      .then(this.extractData)
  }
}
