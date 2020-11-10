import Axios, { AxiosError, AxiosInstance } from "axios";

import Account from "./service/account";

export interface ResponseError extends AxiosError {}

class Api {
  public service: {
    account: Account;
  };

  constructor(private http: AxiosInstance) {
    this.service = {
      account: new Account(this.http),
    };

    // this.http.defaults.headers.common["Authorization"] = localStorage.getItem(
    //   "token"
    // );
  }
}

export default new Api(Axios.create());
