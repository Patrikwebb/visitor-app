import * as React from "react";

import cx from "classnames";

import Api from "api";
import DropDown from "components/common/DropDown/DropDown";
import { CompaniesI } from "api/service/company/company";
import { VisitorsI } from "api/service/Visitor/visitor";
import { errorToast, infoToast } from "components/common/Toast";

import { SystemContext } from "context/SystemContext";
import { DesignLayout } from "context/SystemContext/SystemContext";

import VisitorsImage from "assets/images/visitors.jpg";

import Button from "components/common/Button";
import NavigationInfo from "components/common/NavigationInfo";

import * as styles from "./Visitors.scss";

interface CompaniesIDropDownI extends CompaniesI {
  value: string;
  label: string;
}

function Visitors() {
  const systemContext = React.useContext(SystemContext) as SystemContext;

  const [visitors, setVisitors] = React.useState([] as VisitorsI[]);
  const [companies, setCompanies] = React.useState([] as CompaniesIDropDownI[]);

  React.useEffect(() => {
    loadVisitors();
    loadCompanies();
  }, []);

  const loadVisitors = () => {
    Api.service.visitor.getVisitors().then((visitors) => {
      setVisitors(visitors.data);
    });
  };

  const loadCompanies = () => {
    Api.service.company.getCompanies().then((companies) => {
      let companiesDropDown: CompaniesIDropDownI[] = [];

      // Combines companies to fix Dropdown with value and label
      for (let i = 0; i < companies.data.length; i++) {
        const company = companies.data[i];
        companiesDropDown.push({
          ...company,
          value: company._id,
          label: company.companyName,
        });
      }
      setCompanies(companiesDropDown);

      Api.service.visitor.getVisitors().then((visitors) => {
        // Remove visitor if it's connected to any company
        let visitorsWithNoCompany: VisitorsI[] = [];

        for (let i = 0; i < visitors.data.length; i++) {
          const visitor = visitors.data[i];
          let found = false;

          for (let i = 0; i < companies.data.length; i++) {
            const company = companies.data[i];
            if (company.employees.includes(visitor._id)) {
              found = true;
            }
          }

          if (!found) {
            visitorsWithNoCompany.push({
              ...visitor,
            });
          }
        }
        setVisitors(visitorsWithNoCompany);
      });
    });
  };

  const addEmployee = (companyId: string, visitor: VisitorsI) => {
    // Get company
    let company = companies.find((company) => company._id === companyId);

    // Add visitor to employees list
    if (company && company.employees) {
      company.employees.push(visitor._id);
      addEmployeeToCompany(company, visitor);
    } else if (company) {
      company.employees = [visitor._id];
      addEmployeeToCompany(company, visitor);
    }
  };

  const addEmployeeToCompany = (company: CompaniesI, visitor: VisitorsI) => {
    Api.service.company
      .updateCompanyEmployees(company._id, company.employees)
      .then(() => {
        infoToast(`Besökare ${visitor.name} lades till ${company.companyName}`);
        loadVisitors();
        loadCompanies();
      })
      .catch(() => {
        errorToast(
          `Kunde inte lägga till ${visitor.name} till ${company?.companyName}`
        );
      });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div style={{ width: "100%" }}>
          <NavigationInfo link={"/Hem/Besökare"} currentPage={"Besökare"} />

          <div className={styles.imageBackground}>
            <img
              className={styles.image}
              src={VisitorsImage}
              alt="ingen bild"
            />
          </div>

          <div className={styles.aboutUsContent}>
            <h1 className={styles.aboutHeader}>Alla besökare</h1>

            <div className={styles.visitorsContent}>
              <div className={styles.visitorsHeader}></div>

              <div className={styles.companyList}>
                {visitors.map((visitor) => {
                  return (
                    <div key={visitor._id} className={styles.companyContent}>
                      <ul>
                        <li className={styles.visitorText}>Besökare</li>

                        <li className={styles.visitor}>
                          <span>{visitor.name}</span>

                          <DropDown
                            items={companies}
                            width={
                              systemContext.windowProps.designLayout &&
                              systemContext.windowProps.designLayout <=
                                DesignLayout.WebMedium
                                ? { width: "150px" }
                                : { width: "200px" }
                            }
                            onChange={(companyId: string) =>
                              addEmployee(companyId, visitor)
                            }
                            defaultInputValue={"Företag"}
                          />
                        </li>
                      </ul>
                    </div>
                  );
                })}

                {visitors.length === 0 && (
                  <li className={styles.visitor}>
                    <span>
                      Inga besökare som inte är kopplade till något företag
                    </span>
                  </li>
                )}
              </div>
            </div>

            <h1 className={cx(styles.aboutHeader, styles.marginTop56)}>
              Gå till översikt
            </h1>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className={styles.marginTop32}
                type={Button.types.PRIMARY}
                to="/oversikt"
              >
                Översikt
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

export default Visitors;
