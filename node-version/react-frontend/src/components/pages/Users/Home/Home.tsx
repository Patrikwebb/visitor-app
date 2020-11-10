import * as React from "react";

import HeroLanding from "assets/images/heroLanding.jpg";

import * as styles from "./Home.scss";

function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <img src={HeroLanding} alt="torchlight in the sky" />
      </div>
    </>
  );
}

export default Home;
