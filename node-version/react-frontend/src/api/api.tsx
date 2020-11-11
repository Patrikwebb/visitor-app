import Axios, { AxiosError, AxiosInstance } from "axios";

import Company from "./service/company";
import Visitor from "./service/visitor";

export interface ResponseError extends AxiosError {}

class Api {
  public service: {
    visitor: Visitor;
    company: Company;
  };

  constructor(private http: AxiosInstance) {
    this.service = {
      visitor: new Visitor(this.http),
      company: new Company(this.http),
    };
  }
}

export default new Api(Axios.create());
