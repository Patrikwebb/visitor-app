import * as React from "react";

import cx from "classnames";

import Api from "api";

import VisitorsImage from "assets/images/visitors.jpg";

import Button from "components/common/Button";
import Icon, { ICONS } from "components/common/Icon";
import NavigationInfo from "components/common/NavigationInfo";

import { COLORS } from "variables";

import * as styles from "./Overview.scss";
import { errorToast, infoToast } from "components/common/Toast";

interface CompaniesWithEmployeesI {
  id: string;
  companyName: string;
  employees: EmployeesI[];
}

interface EmployeesI {
  id: string;
  name: string;
}

function Overview() {
  const [companies, setCompanies] = React.useState(
    [] as CompaniesWithEmployeesI[]
  );

  React.useEffect(() => {
    loadCompaniesAndVisitors();
  }, []);

  const loadCompaniesAndVisitors = () => {
    // Get all companies
    Api.service.company.getCompanies().then((companies) => {
      // Get all visitors
      Api.service.visitor.getVisitors().then((visitors) => {
        let newCompanies: CompaniesWithEmployeesI[] = [];
        let listOfCompanies = companies.data;
        let listOfVisitors = visitors.data;

        // Combine visitors name with company
        for (let i = 0; i < listOfCompanies.length; i++) {
          const company = listOfCompanies[i];
          let companyWithEmployees: CompaniesWithEmployeesI;
          let employees = [];

          for (let i = 0; i < company.employees.length; i++) {
            const employeeId = company.employees[i];

            const visitor = listOfVisitors.find(
              (visitor) => visitor._id === employeeId
            );

            if (visitor) {
              employees.push({
                id: visitor._id,
                name: visitor.name,
              });
            }
          }
          companyWithEmployees = {
            id: company._id,
            companyName: company.companyName,
            employees: employees,
          };
          newCompanies.push(companyWithEmployees);
        }
        setCompanies(newCompanies);
      });
    });
  };

  const updateVisitors = (companyId: string, visitor: EmployeesI) => {
    // Get company
    const company = companies.find((company) => company.id === companyId);

    // Filter out removed visitor id
    const employees = company?.employees.filter(
      (employee) => employee.id !== visitor.id
    );

    // Create a set of employees ids
    const employeesIds = [
      ...new Set(employees && employees.map((employee) => employee.id)),
    ];

    Api.service.company
      .updateCompanyEmployees(companyId, employeesIds)
      .then(() => {
        infoToast(`Besökare ${visitor.name} borttagen`);
        loadCompaniesAndVisitors();
      })
      .catch(() => {
        errorToast(`Kunde inte ta bort besökare ${visitor.name}`);
      });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div style={{ width: "100%" }}>
          <NavigationInfo link={"/Hem/Översikt"} currentPage={"Översikt"} />

          <div className={styles.imageBackground}>
            <img
              className={styles.image}
              src={VisitorsImage}
              alt="torchlight in the sky"
            />
          </div>

          <div className={styles.aboutUsContent}>
            <h1 className={styles.aboutHeader}>Skapa företag</h1>

            <h1 className={styles.aboutHeader}>Senaste företagen</h1>

            <div className={styles.visitorsContent}>
              <div className={styles.visitorsHeader}></div>

              <div className={styles.companyList}>
                {companies.map((company) => {
                  return (
                    <div className={styles.companyContent}>
                      <ul>
                        <li className={styles.company}>
                          {company.companyName}
                        </li>
                        <li className={styles.visitorText}>Besökare</li>

                        {company.employees.map((employee) => {
                          return (
                            <li className={styles.visitor}>
                              <span>{employee.name}</span>
                              <Button
                                type={Button.types.RED}
                                className={styles.deleteButton}
                                onClick={() =>
                                  updateVisitors(company.id, employee)
                                }
                              >
                                <Icon
                                  name={ICONS.trash}
                                  svgStyle={{
                                    className: styles.deleteIcon,
                                    fill: COLORS.white,
                                  }}
                                />
                              </Button>
                            </li>
                          );
                        })}

                        {company.employees.length === 0 && (
                          <li className={styles.visitor}>
                            <span>Inga besökare</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <h1 className={cx(styles.aboutHeader, styles.marginTop56)}>
              Se alla besökare
            </h1>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className={styles.marginTop32}
                type={Button.types.PRIMARY}
                to="/besokare"
              >
                Besökare
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className={styles.marginTop32}
                type={Button.types.PRIMARY}
                to="/hem"
              >
                Gå hem
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
