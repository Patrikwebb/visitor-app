import * as React from "react";

import NavgationHeader from "components/common/NavgationHeader";
import UserRoutes from "components/pages/Users/UserRoutes";
import Footer from "components/App/Container/Footer";

import * as style from "./Container.scss";

function Container() {
  return (
    <div className={style.container}>
      <NavgationHeader />
      <div className={style.content}>
        <UserRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default Container;
