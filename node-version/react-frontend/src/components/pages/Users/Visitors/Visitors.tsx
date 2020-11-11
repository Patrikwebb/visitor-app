import * as React from "react";

import cx from "classnames";

import Api from "api";

import VisitorsImage from "assets/images/visitors.jpg";

import Button from "components/common/Button";
// import Icon, { ICONS } from "components/common/Icon";
import NavigationInfo from "components/common/NavigationInfo";

// import { COLORS } from "variables";

import * as styles from "./Visitors.scss";
import { VisitorsI } from "api/service/Visitor/visitor";

// interface CompaniesWithEmployeesI {
//   id: string;
//   companyName: string;
//   employees: EmployeesI[];
// }

// interface EmployeesI {
//   id: string;
//   name: string;
// }

function Visitors() {
  const [visitors, setVisitors] = React.useState([] as VisitorsI[]);

  React.useEffect(() => {
    loadVisitors();
  }, []);

  const loadVisitors = () => {
    Api.service.visitor.getVisitors().then((visitors) => {
      setVisitors(visitors.data);
    });
  };

  // const updateVisitors = (companyId: string, visitor: EmployeesI) => {};

  return (
    <>
      <div className={styles.wrapper}>
        <div style={{ width: "100%" }}>
          <NavigationInfo link={"/Hem/Besökare"} currentPage={"Besökare"} />

          <div className={styles.imageBackground}>
            <img
              className={styles.image}
              src={VisitorsImage}
              alt="torchlight in the sky"
            />
          </div>

          <div className={styles.aboutUsContent}>
            <h1 className={styles.aboutHeader}>Alla besökare</h1>

            <div className={styles.visitorsContent}>
              <div className={styles.visitorsHeader}></div>

              <div className={styles.companyList}>
                {visitors.map((visitor) => {
                  return (
                    <div className={styles.companyContent}>
                      <ul>
                        <li className={styles.visitorText}>Besökare</li>

                        <li className={styles.visitor}>
                          <span>{visitor.name}</span>
                        </li>
                      </ul>
                    </div>
                  );
                })}
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
