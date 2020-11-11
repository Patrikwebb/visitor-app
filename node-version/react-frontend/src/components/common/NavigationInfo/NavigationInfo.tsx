import * as React from "react";

import * as styles from "./NavigationInfo.scss";

interface NavigationInfoProps {
  link: string;
  currentPage: string;
}

function NavigationInfo(props: NavigationInfoProps) {
  return (
    <div className={styles.navigationInfo}>
      <p className={styles.urlLink}>{props.link}</p>
      <h1 className={styles.currentPage}>{props.currentPage}</h1>
    </div>
  );
}

export default NavigationInfo;
