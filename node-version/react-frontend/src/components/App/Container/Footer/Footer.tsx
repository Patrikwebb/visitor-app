import * as React from "react";

import { infoToast } from "components/common/Toast";

import * as styles from "./Footer.scss";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerInnerContent}>
            <div className={styles.item}>
              <p>Shortcuts</p>
              <ul className={styles.footersLists}>
                <li>
                  <a href="/hem">Home</a>
                </li>
              </ul>
            </div>
            <div className={styles.item}>
              <p>Legal</p>
              <ul className={styles.footersLists}>
                <li onClick={() => infoToast("Not implemented")}>
                  <a>Legal notice</a>
                </li>
                <li onClick={() => infoToast("Not implemented")}>
                  <a>Policy</a>
                </li>
                <li onClick={() => infoToast("Not implemented")}>
                  <a>Cookies</a>
                </li>
              </ul>
            </div>
            <div className={styles.item}>
              <p>Contact</p>
              <ul className={styles.footersLists}>
                <li onClick={() => infoToast("Not implemented")}>
                  <a href="/om-oss">About</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
