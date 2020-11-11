import * as React from "react";
import cx from "classnames";

import Icon from "components/common/Icon";

import * as styles from "./Input.scss";
import { SvgType } from "../Icon/icons";

interface InputProps {
  /** Optional title over the input field. */
  title?: string;

  /** Input field value */
  value: string | number;

  /** Input field placeholder */
  placeholder: string;

  /** Input field name */
  name?: string;

  /** Input type */
  type?: string;

  /** Input step */
  step?: string;

  /** Min value */
  min?: string;

  /** Max value */
  max?: string;

  /** Max length */
  maxlength?: number;

  /** On change function */
  onChange?: (inputName: string, value: string) => any;

  /** Validate input field value */
  validate?: (value: string | number) => boolean;

  /** Use active validate state when you want show success, active and error states from validate() */
  activeValidateState?: boolean;

  /** Input field left icon */
  leftIcon?: string;

  /** Input field right icon */
  rightIcon?: string | SvgType;

  /** Input field class */
  className?: string;

  /** Error or success message that will be display below the input field */
  message?: string;

  /** Input field left icon style */
  leftIconStyle?: React.CSSProperties;

  /** Input field right icon style */
  rightIconStyle?: React.CSSProperties;

  /** If input field is disabled or not */
  disabled?: boolean;
}

function Input(props: InputProps) {
  let styleState: string = "";

  if (props.activeValidateState && props.validate) {
    styleState = props.validate(props.value) ? styles.success : styles.err;
  }

  return (
    <div className={cx(styles.input, props.className)}>
      <div className={styles.inputWrapper}>
        {props.leftIcon && (
          <Icon
            name={props.leftIcon}
            className={cx(styles.leftIconPos, styleState)}
            style={props.leftIconStyle}
          />
        )}

        {props.disabled ? (
          <p className={styles.disabledTextField}>{props.value}</p>
        ) : (
          <input
            className={cx(styles.textField, styleState, {
              [styles.leftIcon]: props.leftIcon,
              [styles.rightIcon]: props.rightIcon,
            })}
            id={props.name}
            name={props.name || props.title}
            type={props.type || "text"}
            min={props.min || undefined}
            max={props.max || undefined}
            step={props.step || undefined}
            maxLength={props.maxlength || undefined}
            value={props.value}
            placeholder={props.placeholder}
            onChange={(event) => {
              if (props.onChange) {
                props.onChange(event.target.name, event.target.value);
              }
            }}
          />
        )}

        {props.message && (
          <div className={styles.message}>
            <Icon name="user" className={styles.messageIcon} />

            <p>{props.message}</p>
          </div>
        )}

        {props.rightIcon && (
          <Icon
            name={props.rightIcon}
            style={props.rightIconStyle}
            className={cx(styles.rightIconPos, styleState)}
          />
        )}
      </div>
    </div>
  );
}

export default Input;
