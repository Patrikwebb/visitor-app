import * as React from "react";
import * as styles from "./DropDown.scss";
import Select from "react-select";

interface DropDownItemsI {
  items: DropDownItemI[];
  width?: any;
  setProfileStateColor?: (value: string) => void;
  onChange?: (value: string) => void;
  defaultInputValue?: string;
  removeIndicatorSeparator?: boolean;
}

interface DropDownItemI {
  value: string;
  label: string;
  style?: BackgroundColorI;
}

interface BackgroundColorI {
  color: string;
}

const DropDown = (props: DropDownItemsI) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [indicatorSeparator, setIndicatorSeparator] = React.useState({});

  React.useEffect(() => {
    if (props.removeIndicatorSeparator) {
      setIndicatorSeparator({
        IndicatorSeparator: null,
      });
    }
  }, []);

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);

    if (props.setProfileStateColor) {
      props.setProfileStateColor(selectedOption.style.color);
    }

    if (props.onChange) {
      props.onChange(selectedOption.value.toString());
    }
  };

  return (
    <div style={props.width}>
      <Select
        className={styles.dropDownBoxContainer}
        placeholder={props.defaultInputValue}
        value={selectedOption}
        onChange={handleChange}
        options={props.items}
        components={indicatorSeparator}
      />
    </div>
  );
};

export default DropDown;
