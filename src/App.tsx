import { useState } from "react";
import "./App.css";

import { Navbar } from "./components/molecules/Navbar";
import { NavbarContext } from "./components/molecules/Navbar/NavbarContext";
import { navbarState } from "./components/molecules/Navbar/types";

import { ProductSelection } from "./pages/ProductSelection";

function App() {
  const [navbarState, setNavbarState] = useState<navbarState>({});

  return (
    <div className="App">
      <NavbarContext.Provider value={[navbarState, setNavbarState]}>
        <Navbar />
        <ProductSelection />
      </NavbarContext.Provider>
    </div>
  );
}

export default App;
