import * as React from "react";
import cx from "classnames";

import ICONS from "./icons";

import * as styles from "./Icon.scss";

export type IconReference = string | React.ReactNode;

export interface SvgStyle {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}

interface IconProps {
  name: IconReference;
  badge?: number | string;
  badgeStyle?: string;
  className?: string;
  svgStyle?: SvgStyle;
  style?: React.CSSProperties;
}

function Icon(props: IconProps) {
  let Component: any;

  if (typeof props.name === "string") {
    Component = ICONS[props.name];
  } else {
    Component = props.name;
  }

  if (!Component) {
    throw "<Icon />: Either name or icon must be set for an svg to render properly.";
  }

  return (
    <i className={cx(styles.icon, props.className)} style={props.style}>
      {props.badge && (
        <div className={cx(styles.badge, props.badgeStyle)}>{props.badge}</div>
      )}

      <Component {...props.svgStyle} />
    </i>
  );
}

export default Icon;
