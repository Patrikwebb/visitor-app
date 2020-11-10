import { AxiosInstance } from "axios";

class Account {
    private http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    public async function(token: string) {
        const response = await this.http.post('url', {
            body: "string"
        });
        return response;
    }

}

export default Account;
