import * as React from "react";

import * as styles from "./HeaderH3.scss";

interface HeaderH3Props {
  title: string;
}

function HeaderH3(props: HeaderH3Props) {
  return <div className={styles.title}>{props.title}</div>;
}

export default HeaderH3;
