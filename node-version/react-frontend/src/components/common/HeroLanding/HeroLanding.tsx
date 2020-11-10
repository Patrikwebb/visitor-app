import * as React from "react";

import HeaderH3 from "../Typografy/HeaderH3";

import * as styles from "./HeroLanding.scss";

interface HeroLandingProps {
  title: string;
  subTitle: string;
}

function HeroLanding(props: HeroLandingProps) {
  return (
    <>
      <div className={styles.heroLanding}>
        <div className={styles.landingWrapper}>
          <div>
            <HeaderH3 title={props.title} />
            <div>Legal</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroLanding;
