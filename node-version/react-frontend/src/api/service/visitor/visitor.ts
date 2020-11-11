import { AxiosInstance } from "axios";

export interface VisitorsI {
    _id: string;
    name: string;
}

interface SignInI {
    name: string;
    company?: string;
}

class Visitor {
    private http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    async getVisitors() {
        const response = await this.http.get<VisitorsI[]>("http://localhost:3040/visitor/");
        return response;
    }

    async addVisitor(name: string, company?: string) {
        const body: SignInI = {
            name
        }
        if(company && company?.length > 3){
            body.company = company
        }

        const response = await this.http.post("http://localhost:3040/signin/", body );
        return response;
    }

}

export default Visitor;
