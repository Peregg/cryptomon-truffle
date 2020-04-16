import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

import drizzleOptions from "./drizzleOptions";
import { StoreProvider } from 'store';

import CryptomonList from "components/CryptomonList";

import "./App.css";

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <StoreProvider>
              <CryptomonList />
            </StoreProvider>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
