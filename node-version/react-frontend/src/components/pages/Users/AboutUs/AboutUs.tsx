import * as React from "react";

import AboutUsImage from "assets/images/aboutUs.jpg";

import * as styles from "./AboutUs.scss";
import NavigationInfo from "components/common/NavigationInfo";

function AboutUs() {
  return (
    <>
      <div className={styles.wrapper}>
        <div style={{ width: "100%" }}>
          <NavigationInfo link={"/Hem/Om oss"} currentPage={"Om Oss"} />

          <div className={styles.imageBackground}>
            <img className={styles.image} src={AboutUsImage} alt="ingen bild" />
          </div>

          <div className={styles.aboutUsContent}>
            <h1 className={styles.aboutHeader}>
              AFRY är ett internationellt företag inom teknik, design och
              rådgivning.
            </h1>

            <p className={styles.aboutParagraf}>
              Vi hjälper våra kunder att utvecklas inom hållbarhet och
              digitalisering.
            </p>

            <p className={styles.aboutParagraf}>
              Vi är 17 000 hängivna experter inom områdena infrastruktur,
              industri och energi, som arbetar över hela världen för att skapa
              hållbara lösningar för kommande generationer.​
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
