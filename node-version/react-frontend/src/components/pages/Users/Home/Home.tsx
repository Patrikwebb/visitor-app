import * as React from "react";
import { useHistory } from "react-router";

import HeroLanding from "assets/images/heroLanding.jpg";

import Api from "api";

import Button from "components/common/Button";
import Input from "components/common/Input";

import { infoToast } from "components/common/Toast";

import * as styles from "./Home.scss";

function Home() {
  const [visitor, setVisitor] = React.useState("");
  const [company, setCompany] = React.useState("");

  const history = useHistory();

  const addVisitor = () => {
    if (visitor.length >= 3) {
      Api.service.visitor.addVisitor(visitor, company).then(() => {
        infoToast("Välkommen " + visitor);
        history.push("/oversikt");
      });
    } else {
      infoToast("Name must be 3 charathers");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.imageBackground}>
          <img
            className={styles.image}
            src={HeroLanding}
            alt="torchlight in the sky"
          />
          <h1 className={styles.welcomeText}>
            AFRY är ett internationellt företag inom teknik, design och
            rådgivning.
          </h1>
        </div>

        <div className={styles.homeContent}>
          <h1 className={styles.homeHeader}>Skriv in dig här</h1>

          <p className={styles.homeParagraf}>
            Vi hjälper våra kunder att utvecklas inom hållbarhet och
            digitalisering.
          </p>

          <Input
            title="Name"
            name="name"
            placeholder="Name"
            value={visitor}
            className={styles.marginTop10}
            type="text"
            onChange={(name, value) => {
              setVisitor(value);
            }}
            validate={(value: string) => value.length > 0}
          />

          <Input
            title="Company"
            name="företag"
            placeholder="företag (valfritt)"
            value={company}
            className={styles.marginTop20}
            type="text"
            onChange={(name, value) => {
              setCompany(value);
            }}
            validate={(value: string) => value.length > 0}
          />

          <Button
            className={styles.marginTop32}
            type={Button.types.PRIMARY}
            onClick={addVisitor}
          >
            Checka in
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
