import * as React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";

import * as styles from "./Button.scss";

interface ButtonProps {
  to?: string;
  type?: string;
  size?: string;
  submit?: boolean;
  disabled?: boolean;
  className?: string;
  children?: string | React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export enum Buttonsize {
  SMALL = "small",
  LARGE = "large",
}

function Button(props: ButtonProps) {
  let buttonTypeClassName;
  let buttonSizeClassName;

  switch (props.type) {
    case Button.types.PRIMARY:
      buttonTypeClassName = styles.primary;
      break;
    case Button.types.SECONDARY:
      buttonTypeClassName = styles.secondary;
      break;
    case Button.types.RED:
      buttonTypeClassName = styles.red;
      break;
    default:
      buttonTypeClassName = styles.primary;
  }

  switch (props.size) {
    case Buttonsize.SMALL:
      buttonSizeClassName = styles.small;
      break;
    case Buttonsize.LARGE:
      buttonSizeClassName = styles.large;
      break;
    default:
      buttonSizeClassName = styles.small;
  }

  const cssClasses = cx(
    styles.button,
    buttonTypeClassName,
    buttonSizeClassName,
    props.className,
    {
      [styles.disabled]: props.disabled,
    }
  );

  return props.to ? (
    <NavLink
      activeClassName={styles.activeLink}
      className={cssClasses}
      to={props.disabled ? "" : props.to}
    >
      {props.children}
    </NavLink>
  ) : (
    <button
      onClick={props.onClick}
      className={cssClasses}
      disabled={props.disabled}
      type={props.submit ? "submit" : "button"}
    >
      {props.children}
    </button>
  );
}

Button.types = {
  SECONDARY: "secondary",
  PRIMARY: "primary",
  RED: "red",
};

export default Button;
