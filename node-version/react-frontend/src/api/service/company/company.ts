import { AxiosInstance } from "axios";

export interface CompaniesI {
    _id: string;
    companyName: string;
    employees: Array<string>; 
}

class Company {
    private http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    async getCompanies() {
        const response = await this.http.get<CompaniesI[]>("http://localhost:3040/company/");
        return response;
    }

    async addCompany(companyName: string) {
        const response = await this.http.post("http://localhost:3040/company", {
            companyName
        });
        return response;
    }

    async updateCompanyEmployees(companyId: string, employees: Array<string>) {
        const response = await this.http.put("http://localhost:3040/company/employees", {
            id: companyId,
            employees: employees
        });
        return response;
    }

}

export default Company;
