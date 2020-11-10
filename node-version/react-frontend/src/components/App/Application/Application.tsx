import React = require("react");
import { Switch, Route } from "react-router";

import useWindowSize from "hooks/useWindowSize";
import {
  DesignLayout,
  SystemContext,
} from "context/SystemContext/SystemContext";

import Container from "../Container";

import { BREAKPOINTS } from "variables";

function Application() {
  const systemContext = React.useContext(SystemContext) as SystemContext;

  // Set window size and design layout when the window get resized
  const size = useWindowSize();
  if (size.width && size.height) {
    let designLayout;

    switch (true) {
      case size.width < BREAKPOINTS.iphoneSmall:
        designLayout = DesignLayout.IphoneSmall;
        break;
      case size.width < BREAKPOINTS.iphoneSemiMedium:
        designLayout = DesignLayout.IphoneSemiMedium;
        break;
      case size.width < BREAKPOINTS.iphoneMedium:
        designLayout = DesignLayout.IphoneMedium;
        break;
      case size.width < BREAKPOINTS.iphoneLarge:
        designLayout = DesignLayout.IphoneLarge;
        break;
      case size.width < BREAKPOINTS.webSmall:
        designLayout = DesignLayout.WebSmall;
        break;
      case size.width < BREAKPOINTS.webMedium:
        designLayout = DesignLayout.WebMedium;
        break;
      case size.width < BREAKPOINTS.webLarge:
        designLayout = DesignLayout.WebLarge;
        break;
      case size.width < BREAKPOINTS.webXLarge:
        designLayout = DesignLayout.WebXLarge;
        break;
      case size.width < BREAKPOINTS.webXXLarge:
        designLayout = DesignLayout.WebXXLarge;
        break;
    }
    // Check so we dont update when we dont need to
    if (
      designLayout &&
      designLayout !== systemContext.windowProps.designLayout
    ) {
      systemContext.updateWindowProps(size.width, size.height, designLayout);
    }
  }

  return (
    <Switch>
      <Route path="/hem">
        <Container />
      </Route>
      <Route path="/">
        <Container />
      </Route>
    </Switch>
  );
}

export default Application;
