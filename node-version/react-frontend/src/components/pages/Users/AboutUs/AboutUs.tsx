import * as React from "react";

import AboutUsImage from "assets/images/aboutUs.jpg";

import * as styles from "./AboutUs.scss";

function AboutUs() {
  return (
    <>
      <div className={styles.wrapper}>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%", margin: "0 10vw" }}>
            <p className={styles.urlLink}>/Hem/Om oss</p>
            <h1 className={styles.currentPage}>Om Oss</h1>
          </div>
          <img src={AboutUsImage} alt="torchlight in the sky" />
        </div>
      </div>
    </>
  );
}

export default AboutUs;
