import androidIcon from "assets/svg/android-icon.svg";
import appleIcon from "assets/svg/apple-icon.svg";
import arrowRightSvg from "assets/svg/arrow_right.svg";
import arrowLeftSvg from "assets/svg/arrow_left.svg";
import checkboxChecked from "assets/svg/checkbox_checked.svg";
import checkboxUnchecked from "assets/svg/checkbox_unchecked.svg";
import logoSvg from "assets/svg/logo.svg";
import trashSvg from "assets/svg/trash.svg";

export type SvgType = React.ReactNode;

interface IconI {
  [key: string]: SvgType;
  appleIcon: SvgType;
  androidIcon: SvgType;

  arrowRight: SvgType;
  arrowLeft: SvgType;

  checkboxChecked: SvgType;
  checkboxUnchecked: SvgType;

  logo: SvgType;
  trash: SvgType;
}

const ICONS: IconI = {
  androidIcon: androidIcon,
  appleIcon: appleIcon,

  arrowRight: arrowRightSvg,
  arrowLeft: arrowLeftSvg,

  checkboxChecked: checkboxChecked,
  checkboxUnchecked: checkboxUnchecked,

  logo: logoSvg,
  trash: trashSvg,
};

export default ICONS;
