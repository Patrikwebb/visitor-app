import * as React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import Icon, { ICONS } from "components/common/Icon";

import * as styles from "./NavgationHeader.scss";

import { useLocation } from "react-router";
import { SystemContext } from "context/SystemContext";
import { DesignLayout } from "context/SystemContext/SystemContext";

interface NavigationUrls {
  name: string;
  to: string;
}

const homeUrl = "/hem";
const urls: NavigationUrls[] = [
  {
    name: "Hem",
    to: "/hem",
  },
  {
    name: "Översikt",
    to: "/oversikt",
  },
  {
    name: "Besökare",
    to: "/besokare",
  },
  {
    name: "Om oss",
    to: "/om-oss",
  },
];

function NavgationHeader() {
  const systemContext = React.useContext(SystemContext) as SystemContext;

  const [showBurgerMeny, setshowBurgerMeny] = React.useState(false);
  const [scrollBelow90px, setScrollBelow90px] = React.useState(false);

  let location = useLocation();

  const toggleBurgerMeny = () => {
    setshowBurgerMeny(!showBurgerMeny);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const scrollBelow90 = currentScrollPos >= 30;

    if (currentScrollPos <= 30) {
      setScrollBelow90px(false);
    } else if (scrollBelow90) {
      setScrollBelow90px(true);
    } else {
      setScrollBelow90px(false);
    }
  };

  return (
    <div
      className={cx(
        styles.navgationHeader,
        { [styles.scrollAbove90Px]: scrollBelow90px === false },
        { [styles.scrollBelow90Px]: scrollBelow90px === true },
        { [styles.lightBackground]: location.pathname !== homeUrl },
        { [styles.lightBackground]: location.pathname === homeUrl }
      )}
    >
      <header className={cx(styles.header)}>
        {systemContext.windowProps.designLayout &&
        systemContext.windowProps.designLayout < DesignLayout.WebLarge ? (
          <div className={styles.innerContentBurger}>
            <Link
              className={cx(styles.zIndex, {
                [styles.zIndexClicked]: showBurgerMeny,
              })}
              to={homeUrl}
            >
              <Icon name={ICONS.logo} />
            </Link>

            <div className={styles.hamburger}>
              <div className={styles.burgerClickArea}>
                <div
                  className={cx(styles.burger, {
                    [styles.clicked]: showBurgerMeny,
                  })}
                  onClick={toggleBurgerMeny}
                >
                  <span></span>
                </div>
              </div>

              {/* BurgerMenu */}
              <div
                className={cx(styles.burgerMenuContainer, {
                  [styles.show]: showBurgerMeny,
                })}
              >
                <ul
                  className={cx(styles.ulMenu, {
                    [styles.show]: showBurgerMeny,
                  })}
                >
                  {urls.map((url, index) => {
                    return (
                      <li key={index}>
                        <Link
                          className={styles.menuLink}
                          to={url.to}
                          onClick={toggleBurgerMeny}
                        >
                          {url.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className={cx(styles.innerContent)}>
            <ul className={cx(styles.navigation)}>
              <Link to={homeUrl}>
                <Icon
                  name={
                    location.pathname !== homeUrl
                      ? ICONS.logo
                      : location.pathname === homeUrl && scrollBelow90px
                      ? ICONS.logo
                      : ICONS.logoWhite
                  }
                />
              </Link>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default NavgationHeader;
