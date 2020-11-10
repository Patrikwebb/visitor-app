import * as React from "react";
import { toast } from "react-toastify";
import cx from "classnames";

import * as styles from "./Toast.scss";

export function infoToast(message: string) {
  return toast(<div>{message}</div>, {
    className: cx(styles.helioToast, styles.info)
  });
}

export function errorToast(message: string) {
  return toast(<div>{message}</div>, {
    className: cx(styles.helioToast, styles.error)
  });
}

export function warningToast(message: string) {
  return toast(<div>{message}</div>, {
    className: cx(styles.helioToast, styles.warning)
  });
}
