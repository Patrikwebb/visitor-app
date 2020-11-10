import * as React from "react";

export enum DesignLayout {
  /** 320 px */
  IphoneSmall,
  /** 350 px */
  IphoneSemiMedium,
  /** 375 px */
  IphoneMedium,
  /** 414 px */
  IphoneLarge,
  /** 500 px */
  WebSmall,
  /** 800 px */
  WebMedium,
  /** 1080 px */
  WebLarge,
  /** 1280 px */
  WebXLarge,
  /** 1900 px */
  WebXXLarge,
}

interface WindowPropsI {
  width: number | null;
  height: number | null;
  designLayout: DesignLayout | null;
}

export type SystemContext = {
  windowProps: WindowPropsI;
  updateWindowProps: (
    width: number,
    height: number,
    layout: DesignLayout
  ) => void;
};

// Default context object.
export const SystemContext = React.createContext<Partial<SystemContext>>({});

export default function SystemProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windowProps, setWindowProps] = React.useState({} as WindowPropsI);

  const actions = {
    updateWindowProps(width: number, height: number, layout: DesignLayout) {
      setWindowProps({
        width: width,
        height: height,
        designLayout: layout,
      });
    },
  };

  return (
    <SystemContext.Provider
      value={{
        ...actions,
        windowProps: windowProps,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}
